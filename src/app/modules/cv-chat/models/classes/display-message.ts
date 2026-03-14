import { BuildHtmlFromJsonPipe } from '../../pipes/build-html-from-json-pipe';
import { signal } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Observable, Subscription } from 'rxjs';

import { ChatWebSocket } from '../../services/chat-web-socket';
import { MessageContentMessage } from '@interfaces';

export class DisplayMessage {
    type: 'user' | 'bot';
    jsonContent?: object;
    safeContent = signal('' as SafeHtml);
    htmlBuilder: BuildHtmlFromJsonPipe;
    private subscription!: Subscription;

    constructor(type: 'user' | 'bot', sanitizer: DomSanitizer) {
        this.htmlBuilder = new BuildHtmlFromJsonPipe(sanitizer);
        this.type = type;
    }

    update_content_from_string(content: string): void {
        this.safeContent.set(`<div class="message ${this.type}">${content}</div>` as SafeHtml);
    }
    
  private append_json_content(json: object): void {
    if (!this.jsonContent) {
      this.jsonContent = json;
    } else {
      this.jsonContent = this.apend_json_content_recursive(this.jsonContent, json);
    }
  }

  private apend_json_content_recursive(target: any, source: any): object {
    for (const key in source) {
      if (target.hasOwnProperty(key) && typeof target[key] === 'object' && typeof source[key] === 'object') {
        target[key] = this.apend_json_content_recursive(target[key], source[key]);
      } else {
        target[key] = source[key];
      }
    }
    return target;
  }

  update_content_from_json(json_message: object): void {
    this.append_json_content(json_message);
    this.safeContent.set(this.htmlBuilder.transform(this.jsonContent));
  }

  subscribe(subscription: Observable<any>): void {
    this.subscription=subscription.subscribe((message: MessageContentMessage) => {
      this.update_content_from_json(message.content);
    });

  }

  unsubscribe(){
    if (this.subscription) {
      this.subscription.unsubscribe();
    }

  }

}
