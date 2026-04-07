import { Component, inject } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { MessageService } from '../message.service';


@Component({
  selector: 'app-message',
  imports: [NgTemplateOutlet],
  templateUrl: './message.component.html',
  styleUrl: './message.component.scss',
})
export class MessageComponent {

  mgService: MessageService = inject(MessageService);

  deleteMessage(index: number): void {
     this.mgService.closeMessage(index);
  }

}
