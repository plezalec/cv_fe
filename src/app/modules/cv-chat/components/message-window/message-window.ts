import { Component, Input, inject, ChangeDetectorRef, signal, Signal, ViewChild, OnInit, ElementRef } from '@angular/core';
import { DisplayMessage } from '../../models/classes/display-message';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

import { ChatConversation } from '../../models/classes/chat-conversation';
import { ChatWebSocket } from '../../services/chat-web-socket';
import { MessageType, MessageStatusOptions } from '@enums';
import { MessageStatusMessage } from '@interfaces';
import { AgentAvatar } from '../agent-avatar/agent-avatar';

@Component({
  selector: 'app-message-window',
  imports: [CommonModule, AgentAvatar],
  templateUrl: './message-window.html',
  styleUrl: './message-window.css',
})
export class MessageWindow{
  @Input() conversation?: ChatConversation;
  @ViewChild('agentAvatar') agentAvatar!: AgentAvatar;
  @ViewChild('messageWindowContainer') messageWindowContainer!: ElementRef;

  sanitizer: DomSanitizer=inject(DomSanitizer);

  messages: DisplayMessage[] = [];
  private subscription!: Subscription;
  private subscriptions: { [key: string]: DisplayMessage } = {};
  scrolled = false;
  private lastScrollHeight = 0;

  constructor(
     private wsService: ChatWebSocket,
     private cdr: ChangeDetectorRef,
    ) {
  }

  ngAfterViewChecked() {
    if (this.messageWindowContainer && this.messageWindowContainer.nativeElement) {
      this.autoscroll();
    }
  }

  // ngOnInit() {
  //   this.agentAvatar.subscribeToStreamingStatus(this.isStreaming);
  // }

  ngOnChanges() {
    if (this.conversation) {
      this.messages = this.conversation.messages;
      this.subscribeToMessages();
      
    this.cdr.detectChanges();
    }
  }

  ngOnDestroy() {
    // Unsubscribe from main subscription
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    // Unsubscribe from all DisplayMessage subscriptions
    Object.values(this.subscriptions).forEach((msg) => {
      msg.unsubscribe();
    });
    this.subscriptions = {};
  }

  subscribeToMessages() {
    this.subscription = this.wsService.getMessages(MessageType.MessageStatus).subscribe((message: any) => {
      if (message.type === MessageType.MessageStatus) {
        const statusMessage = message as MessageStatusMessage;


        if (statusMessage.content === MessageStatusOptions.Start) {
          message=new DisplayMessage("bot", this.sanitizer);
          this.addMessage(message);
          this.subscriptions[statusMessage.messageId] = message;
          message.subscribe(this.wsService.getContentMessages(statusMessage.messageId));
          this.agentAvatar.setIsStreaming(true);


        } else if (statusMessage.content === MessageStatusOptions.End) {
          this.subscriptions[statusMessage.messageId]?.unsubscribe();
          delete this.subscriptions[statusMessage.messageId];
          console.log("Unsubscribed from message ID:", statusMessage.messageId);
          console.log("Current subscriptions:", Object.keys(this.subscriptions));
          if (Object.keys(this.subscriptions).length === 0) {
            console.log("No active message subscriptions. Setting isStreaming to false.");
            this.agentAvatar.setIsStreaming(false);
          }
        }
      }
    });
  }

  addMessage(message: DisplayMessage) {
    this.messages.push(message);
    this.scrolled = false;
  }

  removeAllMessages() {
    this.messages = [];
    this.cdr.detectChanges();
  }

  
  scrollToCurrentUserMessage(): void {

    //not in use
    const messageElement = this.messageWindowContainer.nativeElement.children[this.messageWindowContainer.nativeElement.children.length - 1];
    if (messageElement.className !== 'message user') {
      throw new Error('Expected the last message to be from the user');
    }
    messageElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
    console.log('Scrolled to current user message:', messageElement.innerHTML);
  }

  
  onScroll(): void {
    const el = this.messageWindowContainer.nativeElement;
    const atBottom = el.scrollHeight - el.scrollTop - el.clientHeight < 50;
    this.scrolled = !atBottom;
  }

  private autoscroll(): void {
    const el = this.messageWindowContainer?.nativeElement;
    if (!el || this.scrolled) return;
    if (el.scrollHeight !== this.lastScrollHeight) {
      this.lastScrollHeight = el.scrollHeight;
      el.scrollTop = el.scrollHeight - el.clientHeight;
    }
  }

  
  scrollToBottom(): void {
    const element = this.messageWindowContainer.nativeElement;
    element.scrollTop = element.scrollHeight - element.offsetHeight;
  }
  
}
