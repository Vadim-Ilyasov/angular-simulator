import { HttpInterceptorFn, HttpErrorResponse, HttpRequest } from '@angular/common/http';
import { catchError, EMPTY, switchMap, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { MessageService } from '../../message.service';
import { inject } from '@angular/core';
import { AuthService } from './auth.service';
import { IToken } from './IToken';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService: AuthService = inject(AuthService);
  const messageService: MessageService = inject(MessageService);
  const router: Router = inject(Router);
  const addTokenHeader: (request: HttpRequest<unknown>, token: string) => HttpRequest<unknown> = (
    request: HttpRequest<unknown>,
    token: string,
  ): HttpRequest<unknown> => {
    return request.clone({
      setHeaders: { Authorization: `Bearer ${ token }` },
    });
  };
  const token: string | null = authService.getAccessToken();
  const authReq: HttpRequest<unknown> = token ? addTokenHeader(req, token) : req;
 
  return next(authReq).pipe(
    catchError((error: HttpErrorResponse) => {
      const isAuthRequest: boolean =
        req.url.includes('/auth/login') || req.url.includes('/auth/refresh');

      if (error.status === 401 && !isAuthRequest) {
        return authService.refreshToken().pipe(
          switchMap((response: IToken) => {
           return next(addTokenHeader(req, response.accessToken));
          }),
          catchError(() => {
            authService.logout();
            router.navigate(['/login']);
            messageService.showError('Не удалось обновить токен');
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
