export interface IAnalysis {
  id: number;
  user_id: number;
  image_url: string;
  result: string[];
  created_at: string;
}

export interface IExtendedAnalysis {
  analysis_id: number;
  user_id: number;
  result: string[];
  description: Record<string, Record<string, string | string[]>>;
  image_url: string;
  created_at: string;
}

export interface IAnalysisImage {
  mediaType: string;
  name: string;
  data: string;
}
