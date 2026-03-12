import { Component, Output, EventEmitter } from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-chat-input',
  imports: [ MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule],
  templateUrl: './chat-input.html',
  styleUrl: './chat-input.css',
})
export class ChatInput {
  @Output() heightChange = new EventEmitter<number>();

  autoResizeTextarea(textarea: HTMLTextAreaElement){
    textarea.style.height = 'auto';
    textarea.style.height = textarea.scrollHeight + 'px';
    console.log('Emmiting signal heightChange:', textarea.offsetHeight);
    this.heightChange.emit(textarea.offsetHeight);
  }

}
