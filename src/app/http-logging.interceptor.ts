import {
  HttpEventType,
  HttpEvent,
  HttpInterceptorFn,
  HttpRequest,
  HttpHandlerFn,
  HttpErrorResponse,
} from '@angular/common/http';
import { catchError, tap, throwError } from 'rxjs';

export const httpLoggingInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
) => {
  console.log(`${ req.method }`);
  console.log(`URL: ${ req.urlWithParams }`);
  const startTime: number = performance.now();
  return next(req).pipe(
    tap((event: HttpEvent<unknown>) => {
      if (event.type === HttpEventType.Response) {
        console.log(`Статус ответа: ${ event.status }`);
        const durationTime: number = performance.now() - startTime;
        console.log(`Время выполнения запроса: ${ durationTime.toFixed(0) } мс`);
      }
    }),
    catchError((error: HttpErrorResponse) => {
      console.log(`Ошибка запроса! Статус ответа: ${ error.status }`);
      const durationTime: number = performance.now() - startTime;
      console.log(`Время обработки ошибки: ${ durationTime.toFixed(0) } мс`);
      return throwError(() => error);
    }),
  );
};
