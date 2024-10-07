import { AlertService } from '@services/alert.service';
import { inject } from '@angular/core';
import { HttpErrorResponse, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { catchError, switchMap, throwError } from 'rxjs';

export const httpErrorInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
  const alertService = inject(AlertService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 403) {
        return throwError(() => error);
      }

      return alertService.open(error.error.message).pipe(switchMap(() => throwError(() => error)));
    }),
  );
};
