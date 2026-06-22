import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { DatePipe, AsyncPipe } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faMountain, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { SelectButtonModule } from 'primeng/selectbutton';
import { ToggleSwitch } from 'primeng/toggleswitch';
import { ISearchTours } from '../../interfaces/ISearchTours';
import { ITransition } from '../../interfaces/ITransition';
import { ColorMode } from '../../enums/ColorMode';
import { Theme } from '../../enums/Theme';
import { ThemeService } from '../theme.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    FormsModule,
    DatePipe,
    AsyncPipe,
    RouterLink,
    RouterLinkActive,
    FontAwesomeModule,
    ButtonModule,
    ToggleSwitch,
    SelectButtonModule,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {

  themeService: ThemeService = inject(ThemeService);

  currentMode!: ColorMode;
  currentTheme!: Theme;
  logoName: string = 'румтибет';
  currentDate: Date = new Date();
  count: number = 0;
  toggle: boolean = true;
  faMountain: IconDefinition = faMountain;
  themeOptions: { label: string; value: Theme }[] = this.themeService.themeOptions;
  isDark$: Observable<boolean> = this.themeService.isDark$;

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

  toggleDarkMode(): void {
    this.themeService.selectColorMode();
  }

  onSelectTheme(selectedTheme: Theme): void {
    if (selectedTheme) {
      this.themeService.setTheme(selectedTheme);
    }
  }

}
