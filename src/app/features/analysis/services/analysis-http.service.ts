import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';
import { IAnalysis } from '@features/analysis/analysis.models';
import { PredictRequestBody } from '@features/analysis/models/analysis-http.models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AnalysisHttpService {
  private readonly http = inject(HttpClient);

  fetchPredictedAnalyses$(): Observable<IAnalysis[]> {
    return this.http.get<IAnalysis[]>(environment.endpoints.analysis.fetchPredictedAnalyses);
  }

  predict$(body: PredictRequestBody): Observable<IAnalysis> {
    return this.http.post<IAnalysis>(environment.endpoints.analysis.predict, body);
  }
}
