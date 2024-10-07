import { AnalysisState } from '@features/analysis/store/analysis.store.models';

export const ANALYSIS_INITIAL_STATE: AnalysisState = {
  analyses: [],
  loading: false,
  error: null,
};
