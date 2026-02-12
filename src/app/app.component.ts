import { Component } from '@angular/core';
import './training';
import { BasicColor } from '../enums/Color';

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {

  private DATE_KEY = 'last_visit';
  private SUM_KEY = 'visits_count';

  constructor() {
    this.saveDateLastVisit();
    this.saveSumVisit();
  }

  public isBasicColor(color: string): boolean {
    return Object.values(BasicColor).includes(color as BasicColor);
  }

  public saveDateLastVisit(): void {
    const date = new Date().toISOString();
    localStorage.setItem(this.DATE_KEY, date);
    console.log(`Дата последнего посещения сайта ${date}`);
  }

  public saveSumVisit(): void {
    const visit = localStorage.getItem(this.SUM_KEY) || '0';
    const visitNumber = parseInt(visit, 10);
    const nextVisit = (visitNumber + 1).toString();
    localStorage.setItem(this.SUM_KEY, nextVisit.toString());
    console.log(`Количесто посещений сайта ${nextVisit}`);
  }
  
}
