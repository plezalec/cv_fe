import { Component, Input, inject,ChangeDetectorRef } from '@angular/core';
import { DisplayMessage } from '../../models/classes/display-message';
import { CommonModule } from '@angular/common';
import { Subscription} from 'rxjs';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

import { ChatConversation } from '../../models/classes/chat-conversation';
import { ChatWebSocket } from '../../services/chat-web-socket';
import { MessageType, MessageStatusOptions } from '@enums';
import { MessageStatusMessage } from '@interfaces';

@Component({
  selector: 'app-message-window',
  imports: [CommonModule],
  templateUrl: './message-window.html',
  styleUrl: './message-window.css',
})
export class MessageWindow {
  @Input() conversation?: ChatConversation;

  sanitizer: DomSanitizer=inject(DomSanitizer);

  messages: DisplayMessage[] = [];
  private subscription!: Subscription;
  private subscriptions: { [key: string]: DisplayMessage } = {};

  constructor(
     private wsService: ChatWebSocket,
     private cdr: ChangeDetectorRef,
    ) {
  }

  ngOnChanges() {
    if (this.conversation) {
      this.messages = this.conversation.messages;
      this.subscribeToMessages();
    }
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


        } else if (statusMessage.content === MessageStatusOptions.End) {
          this.subscriptions[statusMessage.messageId]?.unsubscribe();
          delete this.subscriptions[statusMessage.messageId];
        }
      }
    });
  }

  addMessage(message: DisplayMessage) {
    this.messages.push(message);
    this.cdr.detectChanges();
  }

  removeAllMessages() {
    this.messages = [];
    this.cdr.detectChanges();
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
}
