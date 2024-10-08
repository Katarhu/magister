import { AnalysesState } from '@features/analyses/store/analyses.store.models';

export const ANALYSES_INITIAL_STATE: AnalysesState = {
  analyses: [],
  loading: false,
  error: null,
};
