import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { NavRoute } from '@interfaces';
import { UserInfo } from '@services';

import { LoginLogoutButton } from '../../login/components/login-logout-button/login-logout-button';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, LoginLogoutButton],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  private readonly userInfo = inject(UserInfo);

  routes: NavRoute[] = [
    { path: '', label: 'Front Page' },
    { path: 'main-chat', label: 'Main Chat' }
  ];

  readonly user = this.userInfo.user;
}
