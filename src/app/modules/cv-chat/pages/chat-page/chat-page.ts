import { Component } from '@angular/core';
import { Chat } from '../../components/chat/chat';
import { ChatType } from '@enums';

@Component({
  selector: 'app-chat-page',
  imports: [Chat],
  templateUrl: './chat-page.html',
  styleUrl: './chat-page.css',
})
export class ChatPage {
  chatType: ChatType = ChatType.Tutor;
}
