import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';
import { IAnalysis } from '@features/analyses/analyses.models';
import { PredictRequestBody } from '@features/analyses/models/analyses-http.models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AnalysesHttpService {
  private readonly http = inject(HttpClient);

  fetchPredictedAnalyses$(): Observable<IAnalysis[]> {
    return this.http.get<IAnalysis[]>(environment.endpoints.analyses.fetchPredictedAnalyses);
  }

  predict$(body: PredictRequestBody): Observable<IAnalysis> {
    return this.http.post<IAnalysis>(environment.endpoints.analyses.predict, body);
  }
}
