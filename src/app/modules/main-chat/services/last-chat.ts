import { Injectable} from '@angular/core';
import { Observable } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { ChatConversation } from '@interfaces';
import { environment } from '@environments';

@Injectable({
  providedIn: 'root',
})
export class LastChat {
  private readonly API_URL = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getLastChat(): Observable<ChatConversation> {
    return this.http.get<ChatConversation>(`${this.API_URL}last_chat`);
  }
}
