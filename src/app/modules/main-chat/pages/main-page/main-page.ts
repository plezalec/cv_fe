import { Component } from '@angular/core';
import { Focus, TutorChatHtml, Chat} from '../../components';

@Component({
  selector: 'app-main-page',
  imports: [ Focus, TutorChatHtml, Chat],
  templateUrl: './main-page.html',
  styleUrl: './main-page.css',
})
export class MainPage {

}
