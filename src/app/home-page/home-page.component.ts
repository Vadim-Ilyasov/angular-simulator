import { FormsModule } from '@angular/forms';
import { Component, inject } from '@angular/core';
import { MessageService } from '../message.service';
import { IAdvantage } from '../../interfaces/IAdvantage';
import { IDestination } from '../../interfaces/IDestination';
import { ITravelCard } from '../../interfaces/ITravelCard';
import { ISearchTours } from '../../interfaces/ISearchTours';


@Component({
  selector: 'app-home-page',
  imports: [FormsModule],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
})
export class HomePageComponent {

  mgService: MessageService = inject(MessageService);

  text: string = '';

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
      image: 'mountain-lake',
      rating: '4.9',
      title: 'Озеро возле гор',
      description: 'романтическое приключение',
      price: 480,
      currency: '$',
    },
    {
      id: 2,
      image: 'night-mountains',
      rating: '4.5',
      title: 'Ночь в горах',
      description: 'в компании друзей',
      price: 500,
      currency: '$',
    },
    {
      id: 3,
      image: 'stretching-on-mountain',
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
      image: 'italian-city',
      title: 'Красивая Италия, какая она в реальности?',
      description:
        'Для современного мира базовый вектор развития предполагает независимые способы реализации соответствующих условий активизации.',
      date: '01/04/2023',
      link: 'читать статью',
    },
    {
      id: 2,
      image: 'endless-expanses',
      title: 'Долой сомнения! Весь мир открыт для вас!',
      description:
        'Для современного мира базовый вектор развития предполагает независимые способы реализации соответствующих условий активизации ... независимые способы реализации соответствующих...',
      date: '01/04/2023',
      link: 'читать статью',
    },
    {
      id: 3,
      image: 'solo-adventure',
      title: 'Как подготовиться к путешествию в одиночку? ',
      description: 'Для современного мира базовый вектор развития предполагает.',
      date: '01/04/2023',
      link: 'читать статью',
    },
    {
      id: 4,
      image: 'indian-pride',
      title: 'Индия ... летим?',
      description: 'Для современного мира базовый.',
      date: '01/04/2023',
      link: 'читать статью',
    },
  ];

   isTourReady(): boolean {
    return !!(this.searchTours.location && this.searchTours.date && this.searchTours.tourist);
  }

}
