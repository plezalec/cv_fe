import { Component, ViewChild, inject} from '@angular/core';
import { MessageWindow} from '../message-window/message-window';
import { ChatInput} from '../chat-input/chat-input';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

import { DisplayMessage } from '../../models/classes/display-message';
import { ChatConversation } from '../../models/classes/chat-conversation';
import { ChatService } from '../../services/chat-service';

@Component({
  selector: 'app-chat',
  imports: [MessageWindow, ChatInput],
  templateUrl: './chat.html',
  styleUrl: './chat.css',
})
export class Chat {
  @ViewChild('messageWindow', {static:true}) messageWindow!: MessageWindow;

  public conversation?: ChatConversation;
  sanitizer: DomSanitizer= inject(DomSanitizer);

  constructor(private chatService: ChatService) {
    this.setLastConversation();
  }

  onMessageSend(message: DisplayMessage) {
    this.messageWindow.addMessage(message);
  }

  setLastConversation(): void {
    this.chatService.getLastChat().subscribe((conversationData) => {
      this.conversation = new ChatConversation(conversationData,this.sanitizer);
      console.log('Last conversation loaded:', this.conversation);
    });

  }

  setNewConversation(): void {
    this.chatService.getNewChat().subscribe((conversationData) => {
      this.conversation = new ChatConversation(conversationData,this.sanitizer);
      console.log('New conversation loaded:', this.conversation);
    });
  }

  setSpecificConversation(chatId: number): void {
    this.chatService.getSpecificChat(chatId).subscribe((conversationData) => {
      this.conversation = new ChatConversation(conversationData,this.sanitizer);
      console.log(`Conversation with ID ${chatId} loaded:`, this.conversation);
    });
  }
}

