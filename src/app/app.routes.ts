import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => 
      import('./home-page/home-page.component').then((m) => m.HomePageComponent),
  },
  {
    path: 'users',
    loadComponent: () =>
      import('./users-page/users-page.component').then((m) => m.UsersPageComponent),
  },
  {
    path: 'posts',
    loadChildren: () =>
      import('./features/posts/posts.routes').then((m) => m.postsRoutes),
  },
  {
    path: '**',
    loadComponent: () =>
      import('./not-found-page/not-found-page.component').then((m) => m.NotFoundPageComponent),
  },
];
