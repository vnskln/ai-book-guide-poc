export interface Book {
  title: string;
  author: string;
  language: string;
  rating?: 'up' | 'down';
}

export interface BookRecommendation {
  title: string;
  author: string;
  language: string;
  plotSummary: string;
  justification: string;
  additionalInfo?: string;
}