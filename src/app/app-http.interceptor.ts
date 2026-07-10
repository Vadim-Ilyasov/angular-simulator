import { HttpEventType, HttpInterceptorFn } from '@angular/common/http';
import { tap } from 'rxjs';

export const appHttpInterceptor: HttpInterceptorFn = (req, next) => {
  console.log(`${ req.method }`);
  console.log(`URL: ${ req.urlWithParams }`);
  const startTime: number = performance.now();
  return next(req).pipe(
   tap((event) => {
    if(event.type === HttpEventType.Response) {
      console.log(`Статус ответа: ${ event.status }`);
      const durationTime: number = performance.now() - startTime; 
      console.log(`Время выполнения запроса: ${ durationTime.toFixed(0) } мс`)
    }
   })
  );
};
