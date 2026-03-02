import { Component, signal } from '@angular/core';

import { LastChat } from '../../services/last-chat';
import { ChatConversation } from '../../models/classes/chat-conversation';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [],
  templateUrl: './chat.html',
  styleUrl: './chat.css',
})
export class Chat {
  conversation = signal<ChatConversation | null>(null);

  constructor(private last_chat_service: LastChat) {
    this.last_chat_service.getLastChat().subscribe({
      next: (data) => {
        this.conversation.set(new ChatConversation(data));
        console.log('Last chat conversation:', data);
      },
      error: (error) => {
        console.error('Error fetching last chat:', error);
      }
    });
  }
}
