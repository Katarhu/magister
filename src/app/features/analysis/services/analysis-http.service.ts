import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { IAnalysis } from 'src/app/features/analysis/analysis.models';
import { PredictRequestBody } from 'src/app/features/analysis/models/analysis-http.models';

@Injectable({
  providedIn: 'root',
})
export class AnalysisHttpService {
  private readonly http = inject(HttpClient);

  fetchPredictedAnalyses$() {
    return this.http.get<IAnalysis[]>(environment.endpoints.analysis.fetchPredictedAnalyses);
  }

  predict$(body: PredictRequestBody) {
    return this.http.post<IAnalysis>(environment.endpoints.analysis.predict, body);
  }
}
