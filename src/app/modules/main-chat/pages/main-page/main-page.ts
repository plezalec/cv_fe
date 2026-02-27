import { Component } from '@angular/core';
import { Chat, Focus, Suggestions } from '../../components';

@Component({
  selector: 'app-main-page',
  imports: [Chat, Focus, Suggestions],
  templateUrl: './main-page.html',
  styleUrl: './main-page.css',
})
export class MainPage {

}
