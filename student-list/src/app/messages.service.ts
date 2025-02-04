import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {
  messages: string[] = [];

  add(messages: string) {
    this.messages.push(messages);
  }

  clear() {
    this.messages = [];
  }
}
