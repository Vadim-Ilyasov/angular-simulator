import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import './training';
import { Color } from '../enums/Color';
import { IService } from '../interfaces/IService';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [FormsModule, DatePipe, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit, OnDestroy {

  logoName: string = 'румтибет';

  searchTours = {
    location: '',
    date: '',
    tourist: '',
  };

  currentDate: Date = new Date();
  private timerId: any;

  count: number = 0;

  toggle: boolean = true;

  text: string = '';

  loading: boolean = true;

  services: IService[] = [
    {
      id: 1,
      image: '/images/guide-icon.svg',
      iconColor: '#E5EEEB',
      title: 'Опытный гид',
      description:
        'Для современного мира базовый вектор развития предполагает независимые способы реализации соответствующих условий активизации.',
    },
    {
      id: 1,
      image: '/images/safety-icon.svg',
      iconColor: '#E3E6EE',
      title: 'Безопасный поход',
      description:
        'Для современного мира базовый вектор развития предполагает независимые способы реализации соответствующих условий активизации.',
    },
    {
      id: 1,
      image: '/images/price-icon.svg',
      iconColor: '#F3F1E1',
      title: 'Лояльные цены',
      description:
        'Для современного мира базовый вектор развития предполагает независимые способы реализации соответствующих условий активизации.',
    },
  ];

  constructor() {
    this.saveDateLastVisit();
    this.saveSumVisit();

    setInterval(() => {
      this.loading = false;
    }, 2000);
  }

  isTourReady(): boolean {
    return !!(this.searchTours.location && this.searchTours.date && this.searchTours.tourist);
  }

  ngOnInit(): void {
    this.timerId = setInterval(() => {
      this.currentDate = new Date();
    }, 1000);
  }

  ngOnDestroy(): void {
    if (this.timerId) {
      clearInterval(this.timerId);
    }
  }

  incrementNumber() {
    this.count++;
  }

  decrementNumber() {
    if (this.count > 0) {
      this.count--;
    }
  }

  toggleTask() {
    this.toggle = !this.toggle;
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
