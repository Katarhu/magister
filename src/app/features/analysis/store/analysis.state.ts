import { AnalysisState } from 'src/app/features/analysis/store/analysis.store.models';

export const ANALYSIS_INITIAL_STATE: AnalysisState = {
  analyses: [],
  loading: false,
  error: null,
};
