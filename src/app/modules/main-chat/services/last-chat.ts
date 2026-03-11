import { Injectable} from '@angular/core';
import { Observable } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { ChatConversationInterface, MessageInterface } from '../models/interfaces';
import { environment } from '@environments';


@Injectable({
  providedIn: 'root',
})
export class LastChat {
  private readonly API_URL = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getLastChat(newChat: boolean = false): Observable<ChatConversationInterface> {
    return this.http.get<ChatConversationInterface>(`${this.API_URL}last_chat?new_chat=${newChat}`);
  }
}
