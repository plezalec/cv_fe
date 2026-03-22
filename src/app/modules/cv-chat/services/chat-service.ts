import { Injectable} from '@angular/core';
import { Observable } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { ChatConversationInterface, MessageInterface } from '../models/interfaces';
import { environment } from '@environments';
import { ConversationType } from '@enums';


@Injectable({
  providedIn: 'root',
})
export class ChatService {

  private readonly API_URL = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getLastChat(conversationType: ConversationType): Observable<ChatConversationInterface> {
    return this.http.get<ChatConversationInterface>(`${this.API_URL}last_conversation?conversation_type=${conversationType}`);
  }

  getNewChat(conversationType: ConversationType): Observable<ChatConversationInterface> {
    return this.http.get<ChatConversationInterface>(`${this.API_URL}new_conversation?conversation_type=${conversationType}`);
  }

  getSpecificChat(conversationID: number = 0,conversationType: ConversationType): Observable<ChatConversationInterface> {
    return this.http.get<ChatConversationInterface>(`${this.API_URL}specific_conversation?conversation_id=${conversationID}&conversation_type=${conversationType}`);
  }
}
