import { Injectable } from '@angular/core';
import { IMessage } from '../interfaces/IMessage';
import { Message } from '../enums/Message';

@Injectable({
  providedIn: 'root',
})
export class MessageService {

  messages: IMessage[] = [];

  addMessage(text: string, type: Message): void {
    const newMessage = { type, text };
    this.messages.push(newMessage);
    setTimeout(() => {
      const currentIndex = this.messages.lastIndexOf(newMessage);
      if (currentIndex !== -1) {
        this.closeMessage(currentIndex);
      }
    }, 5000);
  }

  closeMessage(index: number): void {
    this.messages.splice(index, 1);
  }
  
}
