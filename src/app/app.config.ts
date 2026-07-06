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


function getPreset(): Preset {
  const savedTheme: string | null = localStorage.getItem('theme');
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
