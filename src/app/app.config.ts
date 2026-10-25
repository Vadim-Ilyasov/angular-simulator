import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
  provideAppInitializer,
  inject,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeng/themes/aura';
import Lara from '@primeng/themes/lara';
import Nora from '@primeng/themes/nora';
import { Preset } from '@primeuix/themes/types';
import { routes } from './app.routes';
import { Theme } from '../enums/Theme';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { httpLoggingInterceptor } from './http-logging.interceptor';
import { errorInterceptor } from './error.interceptor';
import { authInterceptor } from './features/auth/auth.interceptor';
import { AuthService } from './features/auth/auth.service';
import { DATE_PIPE_DEFAULT_OPTIONS } from '@angular/common';
import { APP_CONFIG } from './app.config.token';
import { IAppConfig } from '../interfaces/IAppConfig';

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

const defaultConfig: IAppConfig = {
  companyName: 'румтибет',
  enableLogs: true,
  enableNotifications: false,
  enableTheming: true,
  sessionTimeout: 3600000
};


export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideZoneChangeDetection(),
    provideHttpClient(
      withInterceptors([httpLoggingInterceptor, errorInterceptor, authInterceptor]),
    ),
    provideAppInitializer(() => {
      const authService: AuthService = inject(AuthService);
      return authService.initAuth();
    }),
    providePrimeNG({
      theme: {
        preset: getPreset(),
        options: {
          darkModeSelector: '.p-dark',
        },
      },
    }),
    { provide: DATE_PIPE_DEFAULT_OPTIONS, useValue: { dateFormat: 'dd.MM.yyyy HH:mm' } },
    { provide: APP_CONFIG, useValue: defaultConfig },
  ],
};
