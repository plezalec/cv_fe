import { Injectable, inject } from '@angular/core';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { Observable, from, switchMap, filter } from 'rxjs';
import { take } from 'rxjs/operators';
import Keycloak from 'keycloak-js';

import { ParseWebSocketJsonPipe } from '../pipes/parse-web-socket-json-pipe';
import { ChatSocketMessage, ConversationInitMessage, UserMessage, createConversationInitMessage, createUserMessage } from '../../../core/models/interfaces/chat-socket-message';
import { MessageType } from '@enums';
import { ChatConversation } from '../models/classes/chat-conversation';

@Injectable({
  providedIn: 'root',
})
export class ChatWebSocket {
  private socket$: WebSocketSubject<any> | null = null;
  private readonly keycloak = inject(Keycloak);
  private readonly parseWebSocketJsonPipe = inject(ParseWebSocketJsonPipe);

  async initSocket(): Promise<WebSocketSubject<any>> {
    if (!this.socket$) {
      // Check if user is authenticated
      if (!this.keycloak.authenticated) {
        throw new Error('User is not authenticated');
      }

      // Refresh token if needed (returns true if token was refreshed)
      //await this.keycloak.updateToken(30);

      const token = this.keycloak.token;
      if (!token) {
        throw new Error('Failed to get token');
      }

      this.socket$ = webSocket({
        url: `ws://localhost:8000/ws/agent_html?token=${token}`,
        deserializer: (e) => {
          return this.parseWebSocketJsonPipe.transform(e.data);
        },
      });
    }
    return this.socket$;
  }

  async sendMessage(message: ChatSocketMessage): Promise<void> {
    const socket = await this.initSocket();
    socket.next(message);
    this.confirmMessageDelivery(message).pipe(take(1)).subscribe({
      next: () => console.log('Message delivery confirmed:', message),
      error: (err: any) => console.error('Error confirming message delivery:', err)
    });
  }

  confirmMessageDelivery(message: ChatSocketMessage): Observable<any> {
    return from(this.initSocket()).pipe(
      switchMap((socket) => socket.asObservable()),
      filter((msg: any) => msg.type === MessageType.MessageConfirmation && msg.content.messageId === message.messageId)
    );
  }

  initializeConversation(data: ChatConversation):void {
    this.sendMessage(createConversationInitMessage(data.id));
  }

  sendUserMessage(content: string): void {
    this.sendMessage(createUserMessage(content));
  }

  getContentMessages(messageId: number): Observable<any> {
    return from(this.initSocket()).pipe(
      switchMap((socket) => socket.asObservable()),
      filter((message: any) => message.type === MessageType.MessageContent && message.messageId === messageId)
    );
  }

  getMessages(messageType: MessageType): Observable<any> {
    return from(this.initSocket()).pipe(
      switchMap((socket) => socket.asObservable()),
      filter((message: any) => message.type === messageType)
    );
  }

  close(): void {
    this.socket$?.complete();
    this.socket$ = null;
  }
}