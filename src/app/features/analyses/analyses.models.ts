export interface IAnalysis {
  id: number;
  user_id: number;
  image_url: string;
  result: string[];
  created_at: Date;
}

export interface IAnalysisImage {
  mediaType: string;
  name: string;
  data: string;
}
