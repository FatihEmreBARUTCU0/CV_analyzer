export interface AnalysisResult {
  ats_score: number;
  grade: "A" | "B" | "C" | "D" | "F";
  summary: string;
  strengths: string[];
  improvements: string[];
  keywords_missing: string[];
  rewritten_summary: string;
}

export interface AnalyzeResponse {
  success: true;
  result: AnalysisResult;
}

export interface AnalyzeError {
  success: false;
  error: string;
}

export type AnalyzeApiResponse = AnalyzeResponse | AnalyzeError;
