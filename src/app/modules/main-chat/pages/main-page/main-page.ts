import { Component } from '@angular/core';
import { Focus, Suggestions, TutorChatHtml} from '../../components';

@Component({
  selector: 'app-main-page',
  imports: [ Focus, Suggestions, TutorChatHtml],
  templateUrl: './main-page.html',
  styleUrl: './main-page.css',
})
export class MainPage {

}
