import { Injectable} from '@angular/core';
import { Observable } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { ChatConversationInterface, MessageInterface } from '../models/interfaces';
import { environment } from '@environments';
import { ChatType } from '@enums';


@Injectable({
  providedIn: 'root',
})
export class ChatService {

  private readonly API_URL = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getLastChat(chatType: ChatType): Observable<ChatConversationInterface> {
    return this.http.get<ChatConversationInterface>(`${this.API_URL}last_chat?chat_type=${chatType}`);
  }

  getNewChat(chatType: ChatType): Observable<ChatConversationInterface> {
    return this.http.get<ChatConversationInterface>(`${this.API_URL}new_chat?chat_type=${chatType}`);
  }

  getSpecificChat(chatID: number = 0,chatType: ChatType): Observable<ChatConversationInterface> {
    return this.http.get<ChatConversationInterface>(`${this.API_URL}specific_chat?chat_id=${chatID}&chat_type=${chatType}`);
  }
}
