import { Component } from '@angular/core';
import { Chat } from '../../components/chat/chat';
import { ConversationType } from '@enums';

@Component({
  selector: 'app-cv-page',
  imports: [Chat],
  templateUrl: './cv-page.html',
  styleUrl: './cv-page.css',
})
export class CvPage {
  conversationType: ConversationType = ConversationType.CV;
}
