import { Component, OnInit, OnDestroy, AfterViewChecked, ChangeDetectorRef, ViewChild, ElementRef, ApplicationRef, createComponent, EnvironmentInjector, Inject, HostListener, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TutorWebSocketHtmlDelta } from '../../services/tutor-web-socket-html-delta';
import { Subscription, take } from 'rxjs';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { SpecialButton } from '../special-button/special-button';
import { ParseWebSocketJsonPipe } from '../../pipes/parse-web-socket-json-pipe';
import { BuildHtmlFromJsonPipe } from '../../pipes/build-html-from-json-pipe';
import { LastChat } from '../../services/last-chat';
import { ChatConversation } from '../../models/classes/chat-conversation';
import { MessageInterface } from '../../models/interfaces/message-interface';
import { ChatConversationInterface } from '../../models/interfaces/chat-conversation-interface';

export class Message {
  public safeContent?: SafeHtml;
  private jsonContent?: any;
  public createdAt: Date;
  constructor(
    public type: 'user' | 'tutor',
    public content: string,
    private sanitizer: DomSanitizer,
    private htmlBuilder: BuildHtmlFromJsonPipe,
    private componentMap: Map<string, any> = new Map(),
    createdAt?: Date | string,
  ) {
    this.createdAt = createdAt ? new Date(createdAt) : new Date();
  }

  private append_json_content(json: any): void {
    if (!this.jsonContent) {
      this.jsonContent = json;
    } else {
      this.jsonContent = this.apend_json_content_recursive(this.jsonContent, json);
    }
  }

  private apend_json_content_recursive(target: any, source: any): any {
    for (const key in source) {
      if (target.hasOwnProperty(key) && typeof target[key] === 'object' && typeof source[key] === 'object') {
        target[key] = this.apend_json_content_recursive(target[key], source[key]);
      } else {
        target[key] = source[key];
      }
    }
    return target;
  }

  update_content_from_json(json_message: object): void {
    this.append_json_content(json_message);

    // Build HTML from JSON in stages for easier debugging
    const transformedHtml = this.htmlBuilder.transform(this.jsonContent);
    const htmlString = transformedHtml as string;
    const processedHtml = this.replaceComponentTags(htmlString);
    this.content = processedHtml;

    this.safeContent = this.sanitizer.bypassSecurityTrustHtml(this.content);
  }

  private replaceComponentTags(html: string): string {
    this.componentMap.forEach((_: any, tag: string) => {
      const regex = new RegExp(`<${tag}[^>]*>(.*?)</${tag}>|<${tag}[^>]*/?>`, 'gs');
      html = html.replace(regex, `<div class="dynamic-component-placeholder" data-component="${tag}"></div>`);
    });
    return html;
  }

}

@Component({
  selector: 'app-tutor-chat-html',
  imports: [CommonModule, SpecialButton],
  templateUrl: './tutor-chat-html.html',
  styleUrl: './tutor-chat-html.css'
})
export class TutorChatHtml implements OnInit, OnDestroy, AfterViewChecked {
  input_placeholder = 'Provide a topic you want to learn about...'
  messages: Message[] = []
  currentMessage!: Message;
  isStreaming = false;
  private subscription!: Subscription;
  @ViewChild('chatContainer') chatContainer!: ElementRef;
  @ViewChild('button') button!: ElementRef;
  public chatContainerScrollTop = signal(0);
  lastConversation = signal<ChatConversation | null>(null);


  private componentMap: Map<string, any> = new Map([
    ['app-special-button', SpecialButton],
  ]);

  constructor(
    private wsService: TutorWebSocketHtmlDelta,
    private cdr: ChangeDetectorRef,
    private appRef: ApplicationRef,
    private injector: EnvironmentInjector,
    private sanitizer: DomSanitizer,
    private htmlBuilder: BuildHtmlFromJsonPipe,
    private lastChatService: LastChat
  ) {
    this.lastChatService.getLastChat().subscribe({
      next: (data) => {
        this.initializeConversation(data);
      },
      error: (error) => {
        console.error('Error fetching last chat:', error);
      }
    });
  }

  getSafeHtml(html: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }

  ngAfterViewInit(): void {
    this.chatContainerScrollTop.set(this.chatContainer.nativeElement?.scrollTop || 0);
  }

  ngAfterViewChecked(): void {
    this.loadDynamicComponents();
  }

  initializeNewConversation(): void {
    this.subscription.unsubscribe();
    this.wsService.close();
    this.subscribeToMessages();

    this.lastChatService.getLastChat(true).subscribe({
      next: (data) => {
        this.initializeConversation(data);
      },
      error: (error) => {
        console.error('Error fetching last chat:', error);
      }
    });
  }



  initializeConversation(data: ChatConversationInterface): void {
    this.messages = [];
    this.lastConversation.set(new ChatConversation(data));
    console.log('Last chat conversation:', data);
    this.wsService.sendMessage({ CONVERSATION_ID: data.id });
    this.wsService.getMessages().pipe(take(1)).subscribe((message: any) => {
      if (message['STATUS'] === "CONVERSATION_ID_RECEIVED" && message['conversation_id'] === data.id) {

        this.initializeMessagesFromConversation(this.lastConversation());

      } else {
        console.error('Unexpected message while waiting for conversation ID confirmation:', message);
      }
    });

  }

  initializeMessagesFromConversation(conversation: ChatConversation | null): void {

    // Use ParseWebSocketJsonPipe to parse content for each message
    const parseWebSocketJsonPipe = new ParseWebSocketJsonPipe();
    for (const lastMessage of this.lastConversation()?.messages || []) {
      const message = new Message(
        lastMessage.sender as 'user' | 'tutor',
        '',
        this.sanitizer,
        this.htmlBuilder,
        this.componentMap,
        lastMessage.timestamp
      );
      const parsedContent = parseWebSocketJsonPipe.transform(lastMessage.content);
      message.update_content_from_json(parsedContent as object);
      this.messages.push(message);
    }
    this.currentMessage = new Message('tutor', '', this.sanitizer, this.htmlBuilder, this.componentMap);
    // Successfully received confirmation, do nothing (auto-unsubscribed)
  }


  private loadDynamicComponents(): void {
    if (!this.chatContainer?.nativeElement) return;
    const placeholders = this.chatContainer.nativeElement.querySelectorAll('.dynamic-component-placeholder');
    placeholders.forEach((placeholder: HTMLElement) => {
      if (placeholder.children.length > 0) return; // already loaded
      const tag = placeholder.getAttribute('data-component');
      if (!tag) return;
      const componentClass = this.componentMap.get(tag);
      if (!componentClass) return;
      const componentRef = createComponent(componentClass, {
        environmentInjector: this.injector,
        hostElement: placeholder,
      });


      this.appRef.attachView(componentRef.hostView);
    });
  }

  chatContainerScrolled(): void {
    console.log('Chat container scrolled. Current scrollTop:', this.chatContainer.nativeElement.scrollTop);
    this.chatContainerScrollTop.set(this.chatContainer.nativeElement.scrollTop);
  }

  ngOnInit(): void {
    this.subscribeToMessages();
  }

  private subscribeToMessages(): void {
    this.subscription = this.wsService.getMessages().subscribe(
      (message: any) => {
        console.log('Received message:', message);
        this.cdr.detectChanges();
        if (message['STATUS']) {
          if (message['STATUS'] === "START") {
            if (this.currentMessage.content) {
              this.messages.push(this.currentMessage);
            }
            this.currentMessage = new Message('tutor', '', this.sanitizer, this.htmlBuilder, this.componentMap);
            this.currentMessage.safeContent = undefined;
            this.isStreaming = true;
          } else if (message['STATUS'] === "END") {
            this.button.nativeElement.disabled = false;
            this.isStreaming = false;
          }
        } else {
          this.currentMessage.update_content_from_json(message);
        }
        this.cdr.detectChanges();
        setTimeout(() => { this.autoscroll(); }, 100);
      },
      (error: any) => console.error('WebSocket error:', error),
      () => console.log('WebSocket closed')
    );
  }

  sendMessage(message: string): void {
    if (message.trim()) {
      this.input_placeholder = 'Answer the questions, ask for a hint, or request a new topic...'
      if (this.currentMessage.content) {
        this.messages.push(this.currentMessage);
      }
      this.currentMessage = new Message('tutor', '', this.sanitizer, this.htmlBuilder, this.componentMap);
      this.messages.push(new Message('user', message, this.sanitizer, this.htmlBuilder));
      this.wsService.sendMessage({"text": message});
      this.button.nativeElement.disabled = true;
      // Scroll to bottom after sending message
      setTimeout(() => this.scrollToBottom(), 100);
    }
  }

  private autoscroll(): void {
    if (this.chatContainer?.nativeElement) {
      const element = this.chatContainer.nativeElement;
      const children_1OffsetTop = element.children[element.children.length - 2]?.offsetTop || 0;
      console.log('element.scrollHeight-element.offsetHeight:', element.scrollHeight - element.offsetHeight, 'Children[-1].offsetTop:', children_1OffsetTop);
      if (element.scrollHeight - element.offsetHeight < children_1OffsetTop) {
        this.scrollToBottom();
      }
      else {         // element.scrollTop = element.children[element.children.length-2].offsetTop+element.paddingTop/2;

        //  console.log('Scrolled to children[-2]:', element.children[element.children.length-2].innerHTML, element.scrollTop);
        element.scrollTop = children_1OffsetTop - parseInt(window.getComputedStyle(element).paddingTop || '0') / 2;
        console.log('Scrolled to children[-1] from else:', element.children[element.children.length - 1].innerHTML, element.scrollTop);
        //this.scrollToCurrentUserMessage();
      }
      console.log('Scrolled to:', element.scrollTop);
    }
  }

  scrollToBottom(): void {
    const element = this.chatContainer.nativeElement;
    element.scrollTop = element.scrollHeight - element.offsetHeight;
    console.log('Scrolled to bottom:', element.scrollTop);
  }

  scrollToCurrentUserMessage(): void {
    const messageElement = this.chatContainer.nativeElement.children[this.chatContainer.nativeElement.children.length - 2];
    if (messageElement.className !== 'message user') {
      throw new Error('Expected the second to last message to be from the user');
    }
    messageElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
    console.log('Scrolled to current user message:', messageElement.innerHTML);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.wsService.close()
  }

}
