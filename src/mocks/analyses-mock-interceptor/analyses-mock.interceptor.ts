import { HttpHandlerFn, HttpRequest, HttpResponse } from '@angular/common/http';
import { MockInterceptorRegistryService } from '@/mocks/mock-interceptor-registry/mock-interceptor-registry.service';
import { environment } from '@environments/environment';
import { of } from 'rxjs';
import { IAnalysis, IExtendedAnalysis } from '@features/analyses/analyses.models';

export const analysesMockInterceptor = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
  const registry = new MockInterceptorRegistryService();

  registry.get(environment.endpoints.analyses.fetchPredictedAnalyses, () => {
    return of(
      new HttpResponse<IAnalysis[]>({
        body: [
          {
            id: 1,
            user_id: 2,
            image_url:
              'https://domf5oio6qrcr.cloudfront.net/medialibrary/6839/ddca3f92-4b8e-4672-bb6b-f3594ad4e304.jpg',
            result: ['Analysis'],
            created_at: '03/10/2024',
          },
          {
            id: 2,
            user_id: 2,
            image_url:
              'https://domf5oio6qrcr.cloudfront.net/medialibrary/6839/ddca3f92-4b8e-4672-bb6b-f3594ad4e304.jpg',
            result: ['Bad Analysis', 'Another Bad'],
            created_at: '03/10/2024',
          },
          {
            id: 3,
            user_id: 2,
            image_url: 'https://medlineplus.gov/images/Xray.jpg',
            result: ['Bad Analysis'],
            created_at: '05/10/2024',
          },
        ],
      }),
    );
  });

  registry.post(environment.endpoints.analyses.predict, () => {
    return of(
      new HttpResponse<IAnalysis>({
        body: {
          id: 4,
          user_id: 2,
          image_url: 'https://domf5oio6qrcr.cloudfront.net/medialibrary/6839/ddca3f92-4b8e-4672-bb6b-f3594ad4e304.jpg',
          result: ['Analysis'],
          created_at: '02/10/2024',
        },
      }),
    );
  });

  registry.get(environment.endpoints.analyses.fetchAnalysis('1'), () => {
    return of(
      new HttpResponse<IExtendedAnalysis>({
        body: {
          analysis_id: 1,
          user_id: 1,
          result: ['Cardiomegaly', 'Nodule'],
          description: {
            Cardiomegaly: {
              description:
                'Cardiomegaly refers to an enlarged heart, which can indicate various underlying health conditions. It may lead to complications such as heart failure and arrhythmias.',
              causes: [
                'Hypertension (high blood pressure)',
                'Heart valve disease',
                'Cardiomyopathy',
                'Coronary artery disease',
                'Thyroid disease, anemia, or excessive alcohol consumption',
              ],
              diagnosis:
                'Diagnosed through imaging techniques like chest X-rays, echocardiograms, and MRI scans, alongside blood tests.',
              treatment: [
                'Medications for high blood pressure and heart failure',
                'Lifestyle changes, including diet and exercise',
                'Surgical procedures to repair heart valves or bypass blocked arteries',
              ],
            },
            Nodule: {
              description:
                'A nodule is a small, rounded mass of tissue that can be found in various organs and may be benign or malignant.',
              causes: [
                'Infections (e.g., tuberculosis, fungal infections)',
                'Inflammatory conditions (e.g., rheumatoid arthritis, sarcoidosis)',
                'Benign tumors (e.g., lipomas, fibromas)',
                'Malignant tumors (e.g., lung cancer, thyroid cancer)',
              ],
              diagnosis: "Diagnosis often involves imaging techniques and biopsies to determine the nodule's nature.",
              symptoms: [
                'Palpable lump or swelling',
                'Pain or discomfort',
                'Coughing or difficulty breathing (if in the lungs)',
                'Changes in thyroid function (if in the thyroid)',
              ],
              treatment: [
                'Observation for benign nodules',
                'Surgery for suspicious or symptomatic nodules',
                'Medication for infections or inflammatory conditions',
              ],
            },
          },
          image_url: 'https://domf5oio6qrcr.cloudfront.net/medialibrary/6839/ddca3f92-4b8e-4672-bb6b-f3594ad4e304.jpg',
          created_at: '2024-11-04T10:32:20.390112',
        },
      }),
    );
  });

  return registry.processRequest$(req, next);
};
