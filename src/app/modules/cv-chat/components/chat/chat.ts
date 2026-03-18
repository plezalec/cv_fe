import { Component, ViewChild, inject, Input, OnInit } from '@angular/core';
import { MessageWindow} from '../message-window/message-window';
import { ChatInput} from '../chat-input/chat-input';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

import { DisplayMessage } from '../../models/classes/display-message';
import { ChatConversation } from '../../models/classes/chat-conversation';
import { ChatService } from '../../services/chat-service';
import { ChatWebSocket } from '../../services/chat-web-socket';
import { ChatType } from '@enums';
import { ChatConversationInterface} from '../../models/interfaces';
  
@Component({
  selector: 'app-chat',
  imports: [MessageWindow, ChatInput],
  templateUrl: './chat.html',
  styleUrl: './chat.css',
})
export class Chat implements OnInit {
  @ViewChild('messageWindow', {static:true}) messageWindow!: MessageWindow;
  @Input('chatType') chatType!: ChatType;

  public conversation?: ChatConversation;
  sanitizer: DomSanitizer= inject(DomSanitizer);
  private firstTime:boolean=true;

  constructor(
    private chatService: ChatService,
     private wsService: ChatWebSocket
    ) {
  }

  ngOnInit() {
    this.wsService.setEndpoint(this.chatType);
    this.setLastConversation();
    this.firstTime=false;
  }

  onMessageSend(message: DisplayMessage) {
    this.messageWindow.addMessage(message);
  }

  setLastConversation(): void {
    this.chatService.getLastChat(this.chatType).subscribe((conversationData) => {
      this.setConversation(conversationData)
    });
  }

  setNewConversation(): void {
    this.chatService.getNewChat(this.chatType).subscribe((conversationData) => {
      this.setConversation(conversationData)
    });
  }

  setSpecificConversation(chatId: number): void {
    this.chatService.getSpecificChat(chatId,this.chatType).subscribe((conversationData) => {
      this.setConversation(conversationData)
    });
  }

  setConversation(conversationData: ChatConversationInterface){
      this.conversation = new ChatConversation(conversationData,this.sanitizer);
      if (!this.firstTime){
        this.wsService.close();
      }
      this.wsService.initializeConversation(this.conversation)
  }
}

