import { inject } from '@angular/core';

import { ChatConversationInterface} from '../interfaces';
import { DisplayMessage } from './display-message';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

export class ChatConversation {
  readonly id!: number;
  messages: DisplayMessage[] = [];

  constructor(data: ChatConversationInterface, sanitizer: DomSanitizer) {
    Object.assign(this, data);
    this.messages = data.messages.map(msg => {
      const message=new DisplayMessage(msg['sender'],sanitizer);
      message.update_content_from_json(msg['content']);
      return message;
    });
  }
}