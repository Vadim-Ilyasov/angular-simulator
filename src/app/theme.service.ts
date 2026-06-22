import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { usePreset } from '@primeng/themes';
import Aura from '@primeng/themes/aura';
import Lara from '@primeng/themes/lara';
import Nora from '@primeng/themes/nora';
import { Preset } from '@primeuix/themes/types';
import { LocalStorageService } from './local-storage.service';
import { Theme } from '../enums/Theme';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {

  localStorageService: LocalStorageService = inject(LocalStorageService);
  private themeSubject: BehaviorSubject<Theme> = new BehaviorSubject<Theme>(this.getInitTheme());
  theme$: Observable<Theme> = this.themeSubject.asObservable().pipe(
    tap((theme: Theme) => {
      const element: HTMLHtmlElement = document.querySelector('html')!;
      element.setAttribute('theme', theme.toLowerCase());
    })
  );
  private isDarkSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.getInitDarkMode());
  isDark$: Observable<boolean> = this.isDarkSubject.asObservable().pipe(
    tap((isDarkMode: boolean) => {
      const element: HTMLHtmlElement = document.querySelector('html')!;
      isDarkMode ? element.classList.add('p-dark') : element.classList.remove('p-dark');
    })
  );

  themeOptions: { label: string; value: Theme }[] = [
    { label: 'Aura', value: Theme.AURA },
    { label: 'Nora', value: Theme.NORA },
    { label: 'Lara', value: Theme.LARA },
  ];

  constructor() {
    this.applyTheme(this.themeSubject.getValue());
  }

  setTheme(newTheme: Theme): void {
    this.localStorageService.setItem('theme', newTheme);
    this.themeSubject.next(newTheme);
    this.applyTheme(newTheme);
  }

  selectColorMode(): void {
    const currentValue: boolean = this.isDarkSubject.getValue();
    const newValue: boolean = !currentValue;
    this.localStorageService.setItem('darkMode', newValue);
    this.isDarkSubject.next(newValue);
  }

  private getInitTheme(): Theme {
    const currentTheme: Theme = this.localStorageService.getItem('theme') as Theme;
    return currentTheme || Theme.AURA;
  }

  private getInitDarkMode(): boolean {
    return this.localStorageService.getItem('darkMode') ?? false;
  }

  applyTheme(theme: Theme): void {
    let selectedPreset: Preset;
    switch (theme) {
      case Theme.LARA:
        selectedPreset = Lara;
        break;
      case Theme.AURA:
        selectedPreset = Aura;
        break;
      case Theme.NORA:
        selectedPreset = Nora;
        break;
    }
    usePreset(selectedPreset);
    const element: HTMLHtmlElement = document.querySelector('html')!;
    if(element) {
      element.setAttribute('theme', theme.toLowerCase());
    }
  }

}


