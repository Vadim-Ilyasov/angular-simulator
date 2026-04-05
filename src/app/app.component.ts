import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import './training';
import { Color } from '../enums/Color';
import { Message } from '../enums/Message';
import { MessageService } from './message.service';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from "./header/header.component";
import { MessageComponent } from "./message/message.component";


@Component({
  selector: 'app-root',
  imports: [FormsModule, CommonModule, RouterOutlet, FooterComponent, HeaderComponent, MessageComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {

  mgService: MessageService = inject(MessageService);

  loading: boolean = true;

  types: Message[] = [Message.SUCCESS, Message.ERROR, Message.WARN, Message.INFO];

  constructor() {
    setTimeout(() => {
      this.loading = false;
    }, 2000);
  }

  isBasicColor(color: string): boolean {
    const colors: string[] = [Color.GREEN, Color.BLUE, Color.RED];
    return colors.includes(color);
  }

}
