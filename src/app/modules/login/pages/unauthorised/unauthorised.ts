import { Component } from '@angular/core';

import { LoginButton } from '../../components/login-button/login-button';

@Component({
  selector: 'app-unauthorised',
  imports: [LoginButton],
  templateUrl: './unauthorised.html',
  styleUrl: './unauthorised.css',
})
export class Unauthorised {
}
