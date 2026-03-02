import { Injectable, inject } from '@angular/core';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { Observable, from, switchMap } from 'rxjs';
import Keycloak from 'keycloak-js';

@Injectable({
  providedIn: 'root',
})
export class TutorWebSocketHtml {
  private socket$: WebSocketSubject<any> | null = null;
  private readonly keycloak = inject(Keycloak);

  private async initSocket(): Promise<WebSocketSubject<any>> {
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
        deserializer: (e) => e.data,
      });
    }
    return this.socket$;
  }

  async sendMessage(message: string): Promise<void> {
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
