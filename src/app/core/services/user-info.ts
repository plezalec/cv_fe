import { effect, inject, Injectable, signal } from '@angular/core';
import { KEYCLOAK_EVENT_SIGNAL, KeycloakEventType } from 'keycloak-angular';
import Keycloak from 'keycloak-js';

import { User } from '@interfaces';

@Injectable({
  providedIn: 'root',
})
export class UserInfo {
  private readonly keycloak = inject(Keycloak);
  private readonly keycloakSignal = inject(KEYCLOAK_EVENT_SIGNAL);

  readonly user = signal<User | null>(null);

  constructor() {
    effect(() => {
      const event = this.keycloakSignal();

      if (event.type === KeycloakEventType.Ready) {
        const authenticated = event.args as boolean | undefined;
        if (authenticated) {
          const tokenParsed = this.keycloak.tokenParsed;
          this.user.set({
            id: Number(tokenParsed?.['id'] ?? 0),
            name: String(tokenParsed?.['name'] ?? 'Unknown User'),
          });
        }
      }

      if (event.type === KeycloakEventType.TokenExpired) {
        this.user.set(null);
      }
    });
  }
}