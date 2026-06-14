import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { usePreset } from '@primeng/themes';
import Aura from '@primeng/themes/aura';
import Lara from '@primeng/themes/lara';
import Nora from '@primeng/themes/nora';
import { LocalStorageService } from './local-storage.service';
import { Theme } from '../enums/Theme';
import { ColorMode } from '../enums/ColorMode';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {

  localStorageService: LocalStorageService = inject(LocalStorageService);
  private displaySubject: BehaviorSubject<{ colorMode: ColorMode; theme: Theme }> =
    new BehaviorSubject(this.getInitState());
  display$: Observable<{ colorMode: ColorMode; theme: Theme }> = this.displaySubject.asObservable();

  constructor() {
    const currentMode: {
    colorMode: ColorMode;
    theme: Theme;
    } = this.displaySubject.getValue();
    this.applyTheme(currentMode.theme);
  }

  setTheme(newTheme: Theme): void {
    const newDisplay: {
      colorMode: ColorMode;
      theme: Theme;
    } = { colorMode: this.displaySubject.getValue().colorMode, theme: newTheme };
    this.localStorageService.setItem('display', newDisplay);
    this.displaySubject.next(newDisplay);
    this.applyTheme(newTheme);
  }

  setColorMode(): void {
    const newColoMode: ColorMode =
      this.displaySubject.getValue().colorMode === ColorMode.LIGHT
        ? ColorMode.DARK
        : ColorMode.LIGHT;
    const newDisplay: {
      colorMode: ColorMode;
      theme: Theme;
    } = { colorMode: newColoMode, theme: this.displaySubject.getValue().theme };
    this.localStorageService.setItem('display', newDisplay);
    this.displaySubject.next(newDisplay);
  }

  getInitState(): { colorMode: ColorMode; theme: Theme } {
    const currentDisplay = this.localStorageService.getItem('display');
    if (currentDisplay) {
      return currentDisplay as { colorMode: ColorMode; theme: Theme };
    }
    return { colorMode: ColorMode.LIGHT, theme: Theme.AURA };
  }

  applyTheme(theme: Theme): void {
    let selectedPreset;
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
  }

}
