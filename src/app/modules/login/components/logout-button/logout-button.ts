import { Component, inject } from '@angular/core';
import Keycloak from 'keycloak-js';
import { ActivatedRoute, Router } from '@angular/router';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-logout-button',
  imports: [MatButtonModule],
  templateUrl: './logout-button.html',
  styleUrl: './logout-button.css',
})
export class LogoutButton {
  private keycloak = inject(Keycloak);
  private router = inject(Router);

  logout() {
    // Traverse to the deepest activated route to get route data
    let route = this.router.routerState.root;
    while (route.firstChild) {
      route = route.firstChild;
    }

    const requiredRoles = route.snapshot.data['role'] ?? [];

    // If the current page requires roles, redirect to home after logout
    // Otherwise stay on the current page
    const redirectUri = requiredRoles.length > 0
      ? window.location.origin + '/'
      : window.location.href;

    this.keycloak.logout({ redirectUri });
  }
}
