import { inject } from '@angular/core';

import { ChatConversationInterface } from '../interfaces';
import { LastChat } from '../../services/last-chat';
import { Message } from './message';

export class ChatConversation {
  readonly id!: number;
  messages: Message[] = [];

  constructor(data: ChatConversationInterface) {
    Object.assign(this, data);
  }
}