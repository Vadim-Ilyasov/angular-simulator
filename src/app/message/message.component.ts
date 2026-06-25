import { Component, inject } from '@angular/core';
import { AsyncPipe, NgTemplateOutlet } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'; 
import { faEnvelope, faCircleXmark } from '@fortawesome/free-regular-svg-icons';
import { IconDefinition } from '@fortawesome/free-regular-svg-icons';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-message',
  standalone: true,
  imports: [NgTemplateOutlet, AsyncPipe, FontAwesomeModule],
  templateUrl: './message.component.html',
  styleUrl: './message.component.scss',
})
export class MessageComponent {

  mgService: MessageService = inject(MessageService);
  faEnvelope: IconDefinition = faEnvelope;
  faCircleXmark: IconDefinition = faCircleXmark;

  deleteMessage(index: number): void {
    this.mgService.closeMessage(index);
  }
  
}
