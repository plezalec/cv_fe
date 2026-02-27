import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Keycloak from 'keycloak-js';

@Component({
  selector: 'app-unauthorised',
  imports: [],
  templateUrl: './unauthorised.html',
  styleUrl: './unauthorised.css',
})
export class Unauthorised {
  private readonly keycloak = inject(Keycloak);
  private readonly route = inject(ActivatedRoute);

  login() {
    const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') ?? '/';
    this.keycloak.login({
      redirectUri: window.location.origin + returnUrl
    });
  }
}
