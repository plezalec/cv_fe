import { Component, Input } from '@angular/core';
import { DisplayMessage } from '../../models/classes/display-message';
import { CommonModule } from '@angular/common';

import { ChatConversation } from '../../models/classes/chat-conversation';

@Component({
  selector: 'app-message-window',
  imports: [CommonModule],
  templateUrl: './message-window.html',
  styleUrl: './message-window.css',
})
export class MessageWindow {
  @Input() conversation?: ChatConversation;

  messages: DisplayMessage[] = [];


  ngOnChanges() {
    if (this.conversation) {
      console.log('MessageWindow received new conversation:', this.conversation);
      this.messages = this.conversation.messages;
    }
  }

  addMessage(message: DisplayMessage) {
    this.messages.push(message);
  }

  removeAllMessages() {
    this.messages = [];
  }
}
