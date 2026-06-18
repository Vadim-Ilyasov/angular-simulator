import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeng/themes/aura';
import Lara from '@primeng/themes/lara';
import Nora from '@primeng/themes/nora';
import { routes } from './app.routes';
import { Theme } from '../enums/Theme';
import { IThemeState } from '../interfaces/IThemeState';

function getPreset() {
  const savedState: string | null = localStorage.getItem('theme');
  const parsedState: IThemeState = JSON.parse(savedState || '{}');
  const savedTheme: Theme = parsedState.theme;
  let selectedPreset: any = undefined;
  switch (savedTheme) {
    case Theme.LARA:
      selectedPreset = Lara;
      break;
    case Theme.AURA:
      selectedPreset = Aura;
      break;
    case Theme.NORA:
      selectedPreset = Nora;
      break;
    default:
      selectedPreset = Aura;
  }
return selectedPreset;
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideZoneChangeDetection(),
    providePrimeNG({ theme: { preset: getPreset(), options: { darkModeSelector: '.p-dark' } } }),
  ],
};
