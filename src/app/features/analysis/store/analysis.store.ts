import { patchState, signalStore, withHooks, withMethods, withState } from '@ngrx/signals';
import { ANALYSIS_INITIAL_STATE } from '@features/analysis/store/analysis.state';
import { setEntities, setEntity, withEntities } from '@ngrx/signals/entities';
import { IAnalysis } from '@features/analysis/analysis.models';
import { inject } from '@angular/core';
import { AnalysisHttpService } from '@features/analysis/services/analysis-http.service';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap, tap } from 'rxjs';
import { tapResponse } from '@ngrx/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { PredictRequestBody } from '@features/analysis/models/analysis-http.models';

export const AnalysisStore = signalStore(
  { providedIn: 'root' },
  withState(ANALYSIS_INITIAL_STATE),
  withEntities<IAnalysis>(),
  withMethods(store => {
    const analysisHttpService = inject(AnalysisHttpService);

    return {
      fetchPredictedAnalysis: rxMethod<void>(
        pipe(
          tap(() => patchState(store, { loading: true })),
          switchMap(() =>
            analysisHttpService.fetchPredictedAnalyses$().pipe(
              tapResponse({
                next: predictedAnalyses => patchState(store, setEntities(predictedAnalyses), { loading: false }),
                error: (error: HttpErrorResponse) => {
                  const errorMessage = error.error.message;

                  patchState(store, { error: errorMessage, loading: false });
                },
              }),
            ),
          ),
        ),
      ),
      predict: rxMethod<PredictRequestBody>(
        pipe(
          switchMap(body =>
            analysisHttpService.predict$(body).pipe(
              tapResponse({
                next: analysis => patchState(store, setEntity(analysis)),
                error: (error: HttpErrorResponse) => {
                  const errorMessage = error.error.message;

                  patchState(store, { error: errorMessage });
                },
              }),
            ),
          ),
        ),
      ),
    };
  }),
  withHooks({
    onInit(store) {
      store.fetchPredictedAnalysis();
    },
  }),
);
