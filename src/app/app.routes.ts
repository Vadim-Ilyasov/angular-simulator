import { Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { UsersPageComponent } from './users-page/users-page.component';
import { NotFoundPageComponent } from './not-found-page/not-found-page.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';

export const routes: Routes = [
  { path: '', 
    loadComponent: () => import('./home-page/home-page.component').then((m) => m.HomePageComponent) 
  },
  { path: 'users', 
    loadComponent: () => import('./users-page/users-page.component').then((m) => m.UsersPageComponent) 
  },
  { path: 'header', 
    loadComponent: () => import('./header/header.component').then((m) => m.HeaderComponent) 
  },
  { path: 'footer', 
    loadComponent: () => import('./footer/footer.component').then((m) => m.FooterComponent)
   },
  { path: '**', 
    loadComponent: () => import('./not-found-page/not-found-page.component').then((m) => m.NotFoundPageComponent)
   },
];
