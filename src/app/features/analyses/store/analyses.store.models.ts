import { IAnalysis } from '@features/analyses/analyses.models';

export interface AnalysesState {
  analyses: IAnalysis[];
  loading: boolean;
  error: string | null;
}
