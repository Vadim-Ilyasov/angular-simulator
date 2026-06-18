import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { usePreset } from '@primeng/themes';
import Aura from '@primeng/themes/aura';
import Lara from '@primeng/themes/lara';
import Nora from '@primeng/themes/nora';
import { LocalStorageService } from './local-storage.service';
import { Theme } from '../enums/Theme';
import { ColorMode } from '../enums/ColorMode';
import { IThemeState } from '../interfaces/IThemeState';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {

  localStorageService: LocalStorageService = inject(LocalStorageService);
  private themeStateSubject: BehaviorSubject<IThemeState> =
    new BehaviorSubject(this.getInitState());
  themeState$: Observable<IThemeState> = this.themeStateSubject.asObservable();

  constructor() {
    const currentMode: IThemeState = this.themeStateSubject.getValue();
    this.applyTheme(currentMode.theme);
  }

  setTheme(newTheme: Theme): void {
    const newDisplay: IThemeState = { colorMode: this.themeStateSubject.getValue().colorMode, theme: newTheme };
    this.localStorageService.setItem('theme', newDisplay);
    this.themeStateSubject.next(newDisplay);
    this.applyTheme(newTheme);
  }

  setColorMode(): void {
    const newColoMode: ColorMode =
      this.themeStateSubject.getValue().colorMode === ColorMode.LIGHT
        ? ColorMode.DARK
        : ColorMode.LIGHT;
    const newDisplay: IThemeState = { colorMode: newColoMode, theme: this.themeStateSubject.getValue().theme };
    this.localStorageService.setItem('theme', newDisplay);
    this.themeStateSubject.next(newDisplay);
  }

  getInitState(): IThemeState {
    const currentThemeState: IThemeState | null = this.localStorageService.getItem('theme');
    if (currentThemeState) {
      return currentThemeState as IThemeState;
    }
    return { colorMode: ColorMode.LIGHT, theme: Theme.AURA };
  }

  applyTheme(theme: Theme): void {
    let selectedPreset: any = undefined;
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
