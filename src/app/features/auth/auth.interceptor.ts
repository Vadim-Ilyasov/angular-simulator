import { HttpInterceptorFn, HttpErrorResponse, HttpRequest } from '@angular/common/http';
import { catchError, EMPTY, switchMap, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { MessageService } from '../../message.service';
import { inject } from '@angular/core';
import { AuthService } from './auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService: AuthService = inject(AuthService);
  const messageService: MessageService = inject(MessageService);
  const router: Router = inject(Router);
  const token: string | null = authService.getAccessToken();
  let authReq: HttpRequest<unknown> = req;
  if (token) {
    authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  return next(authReq).pipe(
    catchError((error: HttpErrorResponse) => {
      const isAuthRequest: boolean = req.url.includes('/auth/login') || req.url.includes('/auth/refresh');

      if (error.status === 401 && !isAuthRequest) {
        return authService.refreshToken().pipe(
          switchMap((response: { accessToken: string; refreshToken: string }) => {
            const newReq: HttpRequest<unknown> = req.clone({
              setHeaders: {
                Authorization: `Bearer ${response.accessToken}`,
              },
            });
            return next(newReq);
          }),
          catchError(() => {
            authService.logout();
            router.navigate(['/login']);
            messageService.showError('Не удалось обновить токен')
            return EMPTY;
          }),
        );
      }
      if (error.status === 401 && isAuthRequest) {
        authService.logout();
        router.navigate(['/login']);
      }
      return throwError(() => error);
    }),
  );
};
