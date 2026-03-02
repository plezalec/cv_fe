import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';


import { provideKeycloak } from 'keycloak-angular';
import { KeycloakOnLoad } from 'keycloak-js';

import { environment } from '@environments';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideKeycloak({
      config: {
        url: environment.keycloak.config.url,
        realm: environment.keycloak.config.realm,
        clientId: environment.keycloak.config.clientId
      },
      initOptions: {
        onLoad: environment.keycloak.initOptions.onLoad as KeycloakOnLoad,
        checkLoginIframe: environment.keycloak.initOptions.checkLoginIframe,
      }
    }),
    provideZoneChangeDetection({ eventCoalescing: true }),
  ]
};
