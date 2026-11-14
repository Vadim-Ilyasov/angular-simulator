import { Routes } from '@angular/router';
import { authGuard } from './features/auth/auth.guard';
import { adminGuard } from './features/auth/admin.guard';

export const routes: Routes = [
  {
    path: 'parent',
    loadComponent: () =>
      import('./homework-28/parent/parent.component').then((m) => m.ParentComponent),
  },
  {
    path: 'counter-default',
    loadComponent: () =>
      import('./homework-28/counter-default/counter-default.component').then((m) => m.CounterDefaultComponent),
  },
   {
    path: 'counter-on-push',
    loadComponent: () =>
      import('./homework-28/counter-on-push/counter-on-push.component').then((m) => m.CounterOnPushComponent),
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./features/auth/login/login.component').then((m) => m.LoginComponent),
  },
  {
    path: '',
    loadComponent: () => import('./home-page/home-page.component').then((m) => m.HomePageComponent),
    canActivate: [authGuard],
  },
  {
    path: 'users',
    loadComponent: () =>
      import('./users-page/users-page.component').then((m) => m.UsersPageComponent),
    canActivate: [authGuard, adminGuard],
  },
  {
    path: 'posts',
    loadChildren: () => import('./features/posts/posts.routes').then((m) => m.postsRoutes),
    canActivate: [authGuard, adminGuard],
  },
  {
    path: '**',
    loadComponent: () =>
      import('./not-found-page/not-found-page.component').then((m) => m.NotFoundPageComponent),
  },
];
