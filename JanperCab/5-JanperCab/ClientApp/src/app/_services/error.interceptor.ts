import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpEvent,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((response) => {
        console.log(response);
        switch (response.status) {
          case 401:
            return throwError(response.statusText);
          case 500:
            if (response instanceof HttpErrorResponse) {
              return throwError(response.headers.get('Application-Error'));
            }

            return throwError(response.error);
          case 400:
            const { errors } = response.error;

            if (errors && typeof errors === 'object') {
              let message = '';

              for (const key in errors) {
                if (errors[key]) {
                  message += errors[key] + '\n';
                }
              }

              return throwError(message);
            }

            return throwError(response.error);
          default:
            return throwError('Unknown Server Error');
        }
      })
    );
  }
}

export const ErrorInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: ErrorInterceptor,
  multi: true,
};
