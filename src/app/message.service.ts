import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IMessage } from '../interfaces/IMessage';
import { Message } from '../enums/Message';

@Injectable({
  providedIn: 'root',
})
export class MessageService {

  private messageSubject: BehaviorSubject<IMessage[]> = new BehaviorSubject<IMessage[]>([]);
  messages$: Observable<IMessage[]> = this.messageSubject.asObservable();

  showSuccess(text: string): void {
    this.addMessage(text, Message.SUCCESS);
  }

  showInfo(text: string): void {
    this.addMessage(text, Message.INFO);
  }

  showWarn(text: string): void {
    this.addMessage(text, Message.WARN);
  }

  showError(text: string): void {
    this.addMessage(text, Message.ERROR);
  }

  closeMessage(id: number): void {
    const updatedMessages: IMessage[] = this.messageSubject.getValue()
      .filter((message: IMessage) => message.id !== id);
    this.messageSubject.next(updatedMessages);
  }

  private addMessage(text: string, type: Message): void {
    const randomId: number = Math.random();
    const newMessage: IMessage = {
      id: randomId,
      text: text,
      type: type,
    };
    this.messageSubject.next([newMessage, ...this.messageSubject.getValue()]);
    setTimeout(() => {
      this.closeMessage(randomId);
    }, 5000);
  }

}
