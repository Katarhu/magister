import { HttpHandlerFn, HttpRequest, HttpResponse } from '@angular/common/http';
import { MockInterceptorRegistryService } from 'src/mocks/mock-interceptor-registry/mock-interceptor-registry.service';
import { environment } from 'src/environments/environment';
import { of } from 'rxjs';
import { IAnalysis } from 'src/app/features/analysis/analysis.models';

export const analysisMockInterceptor = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
  const registry = new MockInterceptorRegistryService();

  registry.post(environment.endpoints.analysis.predict, () => {
    return of(
      new HttpResponse<IAnalysis>({
        body: {
          id: 1,
          user_id: 2,
          image_url: '',
          result: 'Analysis',
          created_at: new Date('02/10/2024'),
        },
      }),
    );
  });

  return registry.processRequest$(req, next);
};
