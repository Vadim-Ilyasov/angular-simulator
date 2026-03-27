import { Injectable } from '@angular/core';
import { IMessage } from '../interfaces/IMessage';
import { Message } from '../enums/Message';

@Injectable({
  providedIn: 'root',
})
export class MessageService {

  messages: IMessage[] = [];

  addMessage(text: string, type: Message): void {
    const randomId: number = Math.random();
    const newMessage: IMessage = {
      id: randomId,
      text: text,
      type: type,
    };

    this.messages = [...this.messages, newMessage];
    setTimeout(() => {
      this.closeMessage(randomId);
    }, 5000);
  }

  closeMessage(id: number): void {
    this.messages = this.messages.filter((m) => m.id !== id);
  }

}
