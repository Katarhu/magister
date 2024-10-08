import { patchState, signalStore, withHooks, withMethods, withState } from '@ngrx/signals';
import { ANALYSES_INITIAL_STATE } from '@features/analyses/store/analyses.state';
import { setEntities, setEntity, withEntities } from '@ngrx/signals/entities';
import { IAnalysis } from '@features/analyses/analyses.models';
import { inject } from '@angular/core';
import { AnalysesHttpService } from '@features/analyses/services/analyses-http.service';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap, tap } from 'rxjs';
import { tapResponse } from '@ngrx/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { PredictRequestBody } from '@features/analyses/models/analyses-http.models';
import { GlobalLoaderService } from '@services/global-loader.service';
import { Router } from '@angular/router';

export const AnalysesStore = signalStore(
  { providedIn: 'root' },
  withState(ANALYSES_INITIAL_STATE),
  withEntities<IAnalysis>(),
  withMethods(store => {
    const analysisHttpService = inject(AnalysesHttpService);
    const loaderService = inject(GlobalLoaderService);
    const router = inject(Router);

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
          switchMap(body => {
            const stream$ = analysisHttpService.predict$(body);

            return loaderService.showUntilRedirected$(stream$).pipe(
              tapResponse({
                next: analysis => {
                  patchState(store, setEntity(analysis));

                  router.navigate(['/analyses', analysis.id]);
                },
                error: (error: HttpErrorResponse) => {
                  const errorMessage = error.error.message;

                  patchState(store, { error: errorMessage });
                },
              }),
            );
          }),
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
