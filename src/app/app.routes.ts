import { Routes } from '@angular/router';
import { authGuard } from './features/auth/auth.guard';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => 
      import('./features/auth/login/login.component').then((m) => m.LoginComponent),
  },
  {
    path: '',
    loadComponent: () => 
      import('./home-page/home-page.component').then((m) => m.HomePageComponent),
    canActivate: [authGuard],
  },
  {
    path: 'users',
    loadComponent: () =>
      import('./users-page/users-page.component').then((m) => m.UsersPageComponent),
    canActivate: [authGuard],
  },
  {
    path: 'posts',
    loadChildren: () =>
      import('./features/posts/posts.routes').then((m) => m.postsRoutes),
    canActivate: [authGuard],
  },
  {
    path: '**',
    loadComponent: () =>
      import('./not-found-page/not-found-page.component').then((m) => m.NotFoundPageComponent),
  },
];
