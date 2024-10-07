import { IAnalysis } from '@features/analysis/analysis.models';

export interface AnalysisState {
  analyses: IAnalysis[];
  loading: boolean;
  error: string | null;
}
