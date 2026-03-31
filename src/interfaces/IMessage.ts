import { Message } from '../enums/Message';

export interface IMessage {
  id: number;
  text: string;
  type: Message;
}
