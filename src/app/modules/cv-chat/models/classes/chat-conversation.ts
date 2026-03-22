import { inject } from '@angular/core';

import { ChatConversationInterface} from '../interfaces';
import { DisplayMessage } from './display-message';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

export class ChatConversation {
  id!: number;
  messages: DisplayMessage[] = [];

  constructor(data: ChatConversationInterface, sanitizer: DomSanitizer) {
    Object.assign(this, data);
    console.log('ChatConversation constructor called with data:', data);
    this.messages = data.messages
      .map(msg => {
        if (msg['content'] !== null && msg['content'] !== undefined) {
          const message = new DisplayMessage(msg['sender'], sanitizer);
          message.update_content_from_json(msg['content']);
          return message;
        }
        return undefined;
      })
      .filter((msg): msg is DisplayMessage => msg !== undefined);
  }
}