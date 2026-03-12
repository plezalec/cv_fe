import { Component} from '@angular/core';
import { MessageWindow} from '../message-window/message-window';
import { ChatInput} from '../chat-input/chat-input';

@Component({
  selector: 'app-chat',
  imports: [MessageWindow, ChatInput],
  templateUrl: './chat.html',
  styleUrl: './chat.css',
})
export class Chat {

}

