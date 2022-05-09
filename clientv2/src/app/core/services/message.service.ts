import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Message } from '../interfaces/message';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(
    private http: HttpClient
  ) { }

  getMessagesByUserId(): Observable<Message[]> {
    return this.http.get<Message[]>('/api/messages');
  }

  deleteMessageById(messageId: number): Observable<Message> {
    return this.http.delete<Message>('/api/messages/' + messageId);
  }
}
