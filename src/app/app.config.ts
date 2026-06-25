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
import { Preset } from '@primeuix/themes/types';
import { routes } from './app.routes';
import { Theme } from '../enums/Theme';
import { IThemeState } from '../interfaces/IThemeState';


function getPreset(): Preset {
  const savedState: string | null = localStorage.getItem('theme');
  const parsedState: IThemeState = JSON.parse(savedState || '{}');
  const savedTheme: Theme = parsedState.theme;
  switch (savedTheme) {
    case Theme.LARA:
      return Lara;
    case Theme.AURA:
      return Aura;
    case Theme.NORA:
      return Nora;
    default:
      return Aura;
  }
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideZoneChangeDetection(),
    providePrimeNG({ 
      theme: { 
        preset: getPreset(), 
        options: { 
          darkModeSelector: '.p-dark' 
        } 
      } 
    }),
  ],
};
