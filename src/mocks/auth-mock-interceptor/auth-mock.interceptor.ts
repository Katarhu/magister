import { HttpErrorResponse, HttpHandlerFn, HttpRequest, HttpResponse } from '@angular/common/http';
import { MockInterceptorRegistryService } from '@/mocks/mock-interceptor-registry/mock-interceptor-registry.service';
import { environment } from '@environments/environment';
import { LoginRequestBody, RegisterRequestBody } from '@features/auth/models/auth-http.models';
import { of, throwError } from 'rxjs';

export const authMockInterceptor = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
  const registry = new MockInterceptorRegistryService();

  registry.post(environment.endpoints.auth.register, req => {
    const username = (<HttpRequest<RegisterRequestBody>>req).body?.username;

    if (username === 'error@g') {
      return throwError(
        () =>
          new HttpErrorResponse({
            status: 400,
            error: {
              message: 'Username already registered',
            },
          }),
      );
    }

    return of(
      new HttpResponse({
        status: 303,
      }),
    );
  });

  registry.post(environment.endpoints.auth.login, req => {
    const username = (<HttpRequest<LoginRequestBody>>req).body?.username;

    if (username === 'error') {
      return throwError(
        () =>
          new HttpErrorResponse({
            status: 400,
            error: {
              message: 'Incorrect username or password',
            },
          }),
      );
    }

    return of(
      new HttpResponse({
        status: 200,
      }),
    );
  });

  registry.delete(environment.endpoints.auth.logout, () => {
    return of(
      new HttpResponse({
        status: 200,
      }),
    );
  });

  return registry.processRequest$(req, next);
};
