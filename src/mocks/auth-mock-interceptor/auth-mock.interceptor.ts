import { HttpErrorResponse, HttpHandlerFn, HttpRequest, HttpResponse } from '@angular/common/http';
import { MockInterceptorRegistryService } from 'src/mocks/mock-interceptor-registry/mock-interceptor-registry.service';
import { environment } from 'src/environments/environment';
import { ILoginRequest } from 'src/app/features/auth/models/auth-http.models';
import { of, throwError } from 'rxjs';

export const authMockInterceptor = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
  const registry = new MockInterceptorRegistryService();

  registry.post(environment.endpoints.auth.register, req => {
    const username = (<HttpRequest<ILoginRequest>>req).body?.username;

    if (username === 'username_exists') {
      return throwError(
        () =>
          new HttpErrorResponse({
            status: 400,
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
    const username = (<HttpRequest<ILoginRequest>>req).body?.username;

    if (username === 'username_error') {
      return throwError(
        () =>
          new HttpErrorResponse({
            status: 400,
          }),
      );
    }

    return of(
      new HttpResponse({
        status: 200,
      }),
    );
  });

  registry.post(environment.endpoints.auth.logout, () => {
    return of(
      new HttpResponse({
        status: 200,
      }),
    );
  });

  return registry.processRequest$(req, next);
};
