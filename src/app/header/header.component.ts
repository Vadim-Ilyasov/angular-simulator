import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ISearchTours } from '../../interfaces/ISearchTours';
import { LocalStorageService } from '../local-storage.service';
import { ITransition } from '../../interfaces/ITransition';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [FormsModule, DatePipe, RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {

  private storage: LocalStorageService = inject(LocalStorageService);

  logoName: string = 'румтибет';
  currentDate: Date = new Date();
  count: number = 0;
  toggle: boolean = true;

  searchTours: ISearchTours = {
    location: '',
    date: '',
    tourist: '',
  };

  navTransitions: ITransition[] = [
    { path: '/', label: 'Главная' },
    { path: '/users', label: 'Пользователи' },
  ];

  constructor() {
    this.saveDateLastVisit();
    this.saveSumVisit();
    this.storage.setItem('user', 1);
    this.storage.getItem('user');
    this.storage.deleteItem('user');
    this.storage.clearAllItem();

    setInterval(() => {
      this.currentDate = new Date();
    }, 1000);
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
