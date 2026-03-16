import { Component, Output, EventEmitter, ElementRef, ViewChild, OnDestroy, AfterViewInit, inject } from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import { FormsModule } from '@angular/forms';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

import { ChatWebSocket } from '../../services/chat-web-socket';
import { DisplayMessage } from '../../models/classes/display-message';

@Component({
  selector: 'app-chat-input',
  imports: [ MatInputModule, MatButtonModule, MatIconModule, FormsModule, MatMenuModule],
  templateUrl: './chat-input.html',
  styleUrl: './chat-input.css',
})
export class ChatInput implements AfterViewInit, OnDestroy {
  @Output() messageSend = new EventEmitter<DisplayMessage>();
  @Output() newConversation = new EventEmitter<void>();
  @ViewChild('textarea', {static: true}) textarea!: ElementRef<HTMLTextAreaElement>;

  
  constructor(
     private wsService: ChatWebSocket
    ) {
  }

  private windowResizeHandler!: () => void;
  messageText: string = '';
  sanitizer: DomSanitizer=inject(DomSanitizer);

  ngAfterViewInit() {
    this.initializeWindowResizeListener();
  }

  ngOnDestroy() {
    window.removeEventListener('resize', this.windowResizeHandler);
  }

  initializeWindowResizeListener() {
    this.windowResizeHandler = () => {
      this.autoResizeTextarea(this.textarea.nativeElement);
    };
    window.addEventListener('resize', this.windowResizeHandler);
  }

  autoResizeTextarea(textarea: HTMLTextAreaElement){
    textarea.style.height = 'auto';
    textarea.style.height = textarea.scrollHeight + 'px';
  }

  sendMessage() {
    if (this.messageText.trim()) {
      const message = new DisplayMessage("user",this.sanitizer);
      message.update_content_from_string(this.messageText);
      this.messageSend.emit(message);
      this.wsService.sendUserMessage(this.messageText);
      this.messageText = '';
      setTimeout(() => this.autoResizeTextarea(this.textarea.nativeElement));
    }

  }

  startNewConversation() {
    console.log("Emiting event new conversation...");
    this.newConversation.emit();
  }

  onTextareaKeydown(event: KeyboardEvent) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault(); // Prevents new line for Enter alone
      this.sendMessage();
    }
    // Shift+Enter will insert a new line by default
  }
}
