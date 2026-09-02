import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { take, map } from 'rxjs';

export const authGuard: CanActivateFn = () => {
  const authService: AuthService = inject(AuthService);
  const router: Router = inject(Router);

  return authService.isAuthenticated$.pipe(
    take(1),
    map((isAuthenticated: boolean) => {
      if(isAuthenticated) {
        return true;
      }
      return router.createUrlTree(['/login']);
    })
  )
};
