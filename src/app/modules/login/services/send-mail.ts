import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '@environments';


import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class SendMail {
  

  private readonly API_URL = environment.apiUrl;

  constructor(private http: HttpClient) {}
  
  askForAccess(email: string, message: string): Observable<boolean> {
    return this.http.post<boolean>(
      `${this.API_URL}ask_for_access`,
      { email, message }
    );
  }
}
