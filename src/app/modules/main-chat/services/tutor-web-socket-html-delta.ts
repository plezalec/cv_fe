import { Injectable, inject } from '@angular/core';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { Observable, from, switchMap } from 'rxjs';
import Keycloak from 'keycloak-js';

import { ParseWebSocketJsonPipe } from '../pipes/parse-web-socket-json-pipe';

@Injectable({
  providedIn: 'root',
})
export class TutorWebSocketHtmlDelta {
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
          console.log('Received message:', e);
          return this.parseWebSocketJsonPipe.transform(e.data);
        },
      });
    }
    return this.socket$;
  }

  async sendMessage(message: string | object): Promise<void> {
    const socket = await this.initSocket();
    socket.next(message);
  }

  getMessages(): Observable<any> {
    return from(this.initSocket()).pipe(
      switchMap((socket) => socket.asObservable())
    );
  }

  close(): void {
    this.socket$?.complete();
    this.socket$ = null;
  }
}

// export function parseWebSocketJson(data: string): any {
//   try {
//     let parsed = JSON.parse(data);
//     // Handle double-stringified JSON
//     if (typeof parsed === 'string') {
//       parsed = JSON.parse(parsed);
//     }
//     return parsed;
//   } catch (e) {
//     console.error('Failed to parse JSON:', e, data);
//     return null;
//   }
// }

// export function buildHtmlFromJson(node: any): string {
//   console.log('buildHtmlFromJson received:', node, typeof node);
  
//   if (!node || typeof node !== 'object' || !node.tag) {
//     console.log('Exiting early - node:', node, 'typeof:', typeof node, 'tag:', node?.tag);
//     return '';
//   }

//   // Find the actual tag name from children (if it's a string)
//   let tagName = node.tag;
//   let childNodes: any[] = [];

//   if (Array.isArray(node.children)) {
//     for (const child of node.children) {
//       if (typeof child === 'string') {
//         tagName = child; // Use string child as the tag name
//       } else {
//         childNodes.push(child);
//       }
//     }
//   }

//   const attrs = node.attributes
//     ? Object.entries(node.attributes).map(([k, v]) => `${k}="${v}"`).join(' ')
//     : '';

//   const children = childNodes.map(buildHtmlFromJson).join('');
//   const text = node.text || '';

//   return `<${tagName}${attrs ? ' ' + attrs : ''}>${text}${children}</${tagName}>`;
// }
