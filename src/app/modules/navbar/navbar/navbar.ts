import { Component, inject } from '@angular/core';


import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';

import { RouterLink } from '@angular/router';

import { NavRoute } from '@interfaces';
import { UserInfo } from '@services';

import { LoginLogoutButton } from '../../login/components/login-logout-button/login-logout-button';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, LoginLogoutButton, MatIconModule, MatButtonModule, MatToolbarModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  private readonly userInfo = inject(UserInfo);

  routes: NavRoute[] = [
    { path: '', label: 'Front Page' },
    { path: 'chat/cv', label: 'CV Chat' },
    { path: 'chat/tutor', label: 'Tutor Chat' },
    { path: 'cv', label: 'Plain CV' }
  ];

  readonly user = this.userInfo.user;
}
