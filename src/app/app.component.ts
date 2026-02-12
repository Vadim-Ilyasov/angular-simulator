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
  private ["DATE-KEY"]: string = 'last_visit';
  private ["SUM-KEY"]: string = 'visits_count';
  
  constructor() {
    this.saveDateLastVisit();
    this.saveSumVisit();
  }

  public isBasicColor(color: string): boolean {
    const colors: string[] = Object.values(Color);
    return colors.includes(color);
  }

  public saveDateLastVisit(): void {
    const date: string = new Date().toISOString();
    localStorage.setItem(this["DATE-KEY"], date);
    console.log(`Дата последнего посещения сайта ${date}`);
  }

  public saveSumVisit(): void {
    const visit: string = localStorage.getItem(this["SUM-KEY"]) || '0';
    let visitNumber: number = parseInt(visit, 10);
    visitNumber++;
    localStorage.setItem(this["SUM-KEY"], visitNumber.toString());
    console.log(`Количесто посещений сайта ${visitNumber}`);
  }
  
}
