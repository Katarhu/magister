import { MockInterceptorRegistryService } from 'src/mocks/mock-interceptor-registry/mock-interceptor-registry.service';
import { environment } from 'src/environments/environment';
import { of, throwError } from 'rxjs';
import { HttpErrorResponse, HttpHandlerFn, HttpRequest, HttpResponse } from '@angular/common/http';

let shouldProduceLoginError = true;

export const userMockInterceptor = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
  const registry = new MockInterceptorRegistryService();

  registry.get(environment.endpoints.users.me, () => {
    setTimeout(() => (shouldProduceLoginError = false), 500);

    if (shouldProduceLoginError) {
      return throwError(
        () =>
          new HttpErrorResponse({
            status: 403,
            error: {
              message: 'Not authorized',
            },
          }),
      );
    }

    return of(
      new HttpResponse({
        body: {
          id: 1,
          email: 'mock.email@gmail.com',
          username: 'mockusername',
        },
      }),
    );
  });

  return registry.processRequest$(req, next);
};
