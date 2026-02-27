import { Component, inject } from '@angular/core';

import Keycloak from 'keycloak-js';
import { signal } from '@angular/core';

import { LoginButton } from '../login-button/login-button';
import { LogoutButton } from '../logout-button/logout-button';

@Component({
  selector: 'app-login-logout-button',
  imports: [LoginButton, LogoutButton],
  templateUrl: './login-logout-button.html',
  styleUrl: './login-logout-button.css',
})
export class LoginLogoutButton {

  private readonly keycloak = inject(Keycloak);
  isLoggedIn = signal(this.keycloak.authenticated);

}
