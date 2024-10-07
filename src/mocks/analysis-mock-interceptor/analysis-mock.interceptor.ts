import { HttpHandlerFn, HttpRequest, HttpResponse } from '@angular/common/http';
import { MockInterceptorRegistryService } from '@/mocks/mock-interceptor-registry/mock-interceptor-registry.service';
import { environment } from '@environments/environment';
import { of } from 'rxjs';
import { IAnalysis } from '@features/analysis/analysis.models';

export const analysisMockInterceptor = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
  const registry = new MockInterceptorRegistryService();

  registry.get(environment.endpoints.analysis.fetchPredictedAnalyses, () => {
    return of(
      new HttpResponse<IAnalysis[]>({
        body: [
          {
            id: 1,
            user_id: 2,
            image_url:
              'https://domf5oio6qrcr.cloudfront.net/medialibrary/6839/ddca3f92-4b8e-4672-bb6b-f3594ad4e304.jpg',
            result: 'Analysis',
            created_at: new Date(),
          },
          {
            id: 2,
            user_id: 2,
            image_url:
              'https://domf5oio6qrcr.cloudfront.net/medialibrary/6839/ddca3f92-4b8e-4672-bb6b-f3594ad4e304.jpg',
            result: 'Bad Analysis',
            created_at: new Date('03/10/2024'),
          },
          {
            id: 3,
            user_id: 2,
            image_url: 'https://medlineplus.gov/images/Xray.jpg',
            result: 'Bad Analysis',
            created_at: new Date('03/10/2024'),
          },
        ],
      }),
    );
  });

  registry.post(environment.endpoints.analysis.predict, () => {
    return of(
      new HttpResponse<IAnalysis>({
        body: {
          id: 4,
          user_id: 2,
          image_url: 'https://domf5oio6qrcr.cloudfront.net/medialibrary/6839/ddca3f92-4b8e-4672-bb6b-f3594ad4e304.jpg',
          result: 'Analysis',
          created_at: new Date('02/10/2024'),
        },
      }),
    );
  });

  return registry.processRequest$(req, next);
};
