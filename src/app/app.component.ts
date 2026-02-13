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
    const dateKey: string = 'last_visit';
    const date: string = new Date().toISOString();
    localStorage.setItem(dateKey, date);
    console.log(`Дата последнего посещения сайта ${date}`);
  }

  public saveSumVisit(): void {
    const sumKey: string = 'visits_count';
    const visit: string = localStorage.getItem(sumKey) || '0';
    let visitNumber: number = parseInt(visit, 10);
    visitNumber++;
    localStorage.setItem(sumKey, visitNumber.toString());
    console.log(`Количесто посещений сайта ${visitNumber}`);
  }
  
}
