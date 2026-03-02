import { inject } from '@angular/core';

import { ChatConversationInterface } from '../interfaces';
import { LastChat } from '../../services/last-chat';
import { Message } from './message';

export class ChatConversation {
  readonly id!: number;
  messages: Message[] = [];

  constructor(data: ChatConversationInterface | null, chatService?: LastChat) {
    if (data) {
      Object.assign(this, data);
    } else if (chatService) {
      chatService.getNewChat().subscribe({
        next: (newChat) => {
          Object.assign(this, newChat);
        },
        error: (err) => {
          console.error('Error fetching new chat:', err);
        }
      });
    }
  }
}