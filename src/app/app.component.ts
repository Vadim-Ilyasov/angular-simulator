import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import './training';
import { Color } from '../enums/Color';
import { IFeature } from '../interfaces/IFeature';
import { ISearchTours } from '../interfaces/ISearchTours';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [FormsModule, DatePipe, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {

  logoName: string = 'румтибет';

  searchTours: ISearchTours = {
    location: '',
    date: '',
    tourist: '',
  };

  currentDate: Date = new Date();

  count: number = 0;

  toggle: boolean = true;

  text: string = '';

  loading: boolean = true;

  features: IFeature[] = [
    {
      id: 1,
      image: 'guide-icon',
      iconColor: '#E5EEEB',
      title: 'Опытный гид',
      description:
        'Для современного мира базовый вектор развития предполагает независимые способы реализации соответствующих условий активизации.',
    },
    {
      id: 1,
      image: 'safety-icon',
      iconColor: '#E3E6EE',
      title: 'Безопасный поход',
      description:
        'Для современного мира базовый вектор развития предполагает независимые способы реализации соответствующих условий активизации.',
    },
    {
      id: 1,
      image: 'price-icon',
      iconColor: '#F3F1E1',
      title: 'Лояльные цены',
      description:
        'Для современного мира базовый вектор развития предполагает независимые способы реализации соответствующих условий активизации.',
    },
  ];

  constructor() {
    this.saveDateLastVisit();
    this.saveSumVisit();

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

}
