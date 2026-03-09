import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Keycloak from 'keycloak-js';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-login-button',
  imports: [MatButtonModule],
  templateUrl: './login-button.html',
  styleUrl: './login-button.css',
})
export class LoginButton {
  private readonly keycloak = inject(Keycloak);
  private readonly route = inject(ActivatedRoute);

  login() {
    this.keycloak.login(this.route.snapshot.queryParams['returnUrl'] ? {
      redirectUri: window.location.origin + this.route.snapshot.queryParams['returnUrl']
    } : undefined);
  }
}
