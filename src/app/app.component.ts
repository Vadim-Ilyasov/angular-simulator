import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule, NgTemplateOutlet } from '@angular/common';
import { DatePipe } from '@angular/common';
import './training';
import { Color } from '../enums/Color';
import { Message } from '../enums/Message';
import { IAdvantage } from '../interfaces/IAdvantage';
import { ISearchTours } from '../interfaces/ISearchTours';
import { IDestination } from '../interfaces/IDestination';
import { ITravelCard } from '../interfaces/ITravelCard';
import { MessageService } from './message.service';
import { LocalStorageService  } from './local-storage.service';

@Component({
  selector: 'app-root',
  imports: [FormsModule, DatePipe, CommonModule, NgTemplateOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {

  mgService: MessageService = inject(MessageService);
  private storage: LocalStorageService = inject(LocalStorageService);

  logoName: string = 'румтибет';
  currentDate: Date = new Date();
  count: number = 0;
  toggle: boolean = true;
  text: string = '';
  loading: boolean = true;
  randomId: number = Math.random();

  types: Message[] = [Message.SUCCESS, Message.ERROR, Message.WARN, Message.INFO];

  searchTours: ISearchTours = {
    location: '',
    date: '',
    tourist: '',
  };

  advantages: IAdvantage[] = [
    {
      id: 1,
      image: 'guide-icon',
      iconColor: '#E5EEEB',
      title: 'Опытный гид',
      description:
        'Для современного мира базовый вектор развития предполагает независимые способы реализации соответствующих условий активизации.',
    },
    {
      id: 2,
      image: 'safety-icon',
      iconColor: '#E3E6EE',
      title: 'Безопасный поход',
      description:
        'Для современного мира базовый вектор развития предполагает независимые способы реализации соответствующих условий активизации.',
    },
    {
      id: 3,
      image: 'price-icon',
      iconColor: '#F3F1E1',
      title: 'Лояльные цены',
      description:
        'Для современного мира базовый вектор развития предполагает независимые способы реализации соответствующих условий активизации.',
    },
  ];

  destinations: IDestination[] = [
    {
      id: 1,
      image: 'mountain-lake-image',
      rating: '4.9',
      title: 'Озеро возле гор',
      description: 'романтическое приключение',
      price: 480,
      currency: '$',
    },
    {
      id: 2,
      image: 'night-mountains-image',
      rating: '4.5',
      title: 'Ночь в горах',
      description: 'в компании друзей',
      price: 500,
      currency: '$',
    },
    {
      id: 3,
      image: 'stretching-on-mountain-image',
      rating: '5.0',
      title: 'Растяжка в горах',
      description: 'для тех, кто забоится о себе',
      price: 230,
      currency: '$',
    },
  ];

  travelCards: ITravelCard[] = [
    {
      id: 1,
      image: 'italian-city-image',
      title: 'Красивая Италия, какая она в реальности?',
      description: 'Для современного мира базовый вектор развития предполагает независимые способы реализации соответствующих условий активизации.',
      date: '01/04/2023',
      link: 'читать статью',
    },
     {
      id: 2,
      image: 'endless-expanses-image',
      title: 'Долой сомнения! Весь мир открыт для вас!',
      description: 'Для современного мира базовый вектор развития предполагает независимые способы реализации соответствующих условий активизации ... независимые способы реализации соответствующих...',
      date: '01/04/2023',
      link: 'читать статью',
    },
     {
      id: 3,
      image: 'solo-adventure-image',
      title: 'Как подготовиться к путешествию в одиночку? ',
      description: 'Для современного мира базовый вектор развития предполагает.',
      date: '01/04/2023',
      link: 'читать статью',
    },
     {
      id: 4,
      image: 'indian-pride-image',
      title: 'Индия ... летим?',
      description: 'Для современного мира базовый.',
      date: '01/04/2023',
      link: 'читать статью',
    },
  ];

  constructor() {
    this.saveDateLastVisit();
    this.saveSumVisit();
    this.storage.setItem('user', 1);
    this.storage.getItem('user');
    this.storage.deleteItem('user');
    this.storage.clearAllItem();

    setTimeout(() => {
      this.loading = false;
    }, 2000);

    setInterval(() => {
      this.currentDate = new Date();
    }, 1000);
  }

  isTourReady(): boolean {
    return !!(this.searchTours.location && this.searchTours.date && this.searchTours.tourist);
  }

  isBasicColor(color: string): boolean {
    const colors: string[] = [Color.GREEN, Color.BLUE, Color.RED];
    return colors.includes(color);
  }

  saveDateLastVisit(): void {
    const DATE_KEY: string = 'last-visit';
    const date: string = new Date().toISOString();
    localStorage.setItem(DATE_KEY, date);
  }

  saveSumVisit(): void {
    const SUM_KEY: string = 'visits-count';
    const visit: string = localStorage.getItem(SUM_KEY) || '0';
    let visitNumber: number = parseInt(visit, 10);
    visitNumber++;
    localStorage.setItem(SUM_KEY, visitNumber.toString());
  }

  deleteMessage(index: number): void {
     this.mgService.closeMessage(index);
  }

}
