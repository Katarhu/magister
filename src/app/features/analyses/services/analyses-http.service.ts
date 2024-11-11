import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';
import { IAnalysis, IExtendedAnalysis } from '@features/analyses/analyses.models';
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

  fetchPredictedAnalysis$(id: string): Observable<IExtendedAnalysis> {
    return this.http.get<IExtendedAnalysis>(environment.endpoints.analyses.fetchAnalysis(id));
  }

  predict$(body: PredictRequestBody): Observable<IAnalysis> {
    const formData = new FormData();

    const byteCharacters = atob(body.image.data);

    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }

    const blob = new Blob([new Uint8Array(byteNumbers)]);

    formData.append('image', blob, body.image.name);

    return this.http.post<IAnalysis>(environment.endpoints.analyses.predict, formData);
  }
}
