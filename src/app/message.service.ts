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

    this.messages = [...this.messages, newMessage as IMessage];
    setTimeout(() => {
      this.closeMessage(randomId);
    }, 5000);
  }

  success(text: string): void {
    this.addMessage(text, Message.SUCCESS);
  }

  info(text: string): void {
    this.addMessage(text, Message.INFO);
  }

  warning(text: string): void {
    this.addMessage(text, Message.WARN);
  }

  error(text: string): void {
    this.addMessage(text, Message.ERROR);
  }

  closeMessage(id: number): void {
    this.messages = this.messages.filter((message: IMessage) => message.id !== id);
  }

}
