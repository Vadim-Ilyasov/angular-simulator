import { Component } from '@angular/core';
import './training';
import { Color } from '../enums/Color';

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {

  logoName: string = 'румтибет';

  constructor() {
    this.saveDateLastVisit();
    this.saveSumVisit();
  }

  public isBasicColor(color: string): boolean {
    const colors: string[] = [Color.GREEN, Color.BLUE, Color.RED];
    return colors.includes(color);
  }

  public saveDateLastVisit(): void {
    const DATE_KEY: string = 'last-visit';
    const date: string = new Date().toISOString();
    localStorage.setItem(DATE_KEY, date);
    console.log(`Дата последнего посещения сайта ${date}`);
  }

  public saveSumVisit(): void {
    const SUM_KEY: string = 'visits-count';
    const visit: string = localStorage.getItem(SUM_KEY) || '0';
    let visitNumber: number = parseInt(visit, 10);
    visitNumber++;
    localStorage.setItem(SUM_KEY, visitNumber.toString());
    console.log(`Количесто посещений сайта ${visitNumber}`);
  }
  
}
