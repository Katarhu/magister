import { IAnalysis } from 'src/app/features/analysis/analysis.models';

export interface AnalysisState {
  analyses: IAnalysis[];
  loading: boolean;
  error: string | null;
}
