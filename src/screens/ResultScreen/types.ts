export interface ResultScreenParams {
  outputPath: string;
  duration: number;
  size: number;
  created: string;
}

export interface RootStackParamList {
  Upload: undefined;
  Result: ResultScreenParams;
  [key: string]: any;
} 