export type AISearchSource = {
  title: string;
  url: string;
  snippet: string;
};

export type AISearchResult = {
  status: 'success' | 'fail';
  summary: string;
  sources: AISearchSource[];
};
