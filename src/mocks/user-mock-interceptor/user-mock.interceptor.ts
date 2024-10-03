import { MockInterceptorRegistryService } from 'src/mocks/mock-interceptor-registry/mock-interceptor-registry.service';
import { environment } from 'src/environments/environment';
import { Observable, of } from 'rxjs';
import { HttpHandlerFn, HttpRequest, HttpResponse } from '@angular/common/http';

export const userMockInterceptor = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
  const registry = new MockInterceptorRegistryService();

  registry.get(environment.endpoints.users.me, () => {
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
