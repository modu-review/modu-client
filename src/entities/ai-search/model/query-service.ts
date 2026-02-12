import {getAIReviewSummary} from '../apis/api-service';
import {AISearchCategory} from './types';

export const AISearchKeys = {
  all: ['AISearch'] as const,

  summary: (keyword: string, category: AISearchCategory) => [...AISearchKeys.all, keyword, category] as const,
};

export const AISearchOptions = {
  summary: (keyword: string, category: AISearchCategory) => ({
    queryKey: AISearchKeys.summary(keyword, category),
    queryFn: () => getAIReviewSummary(keyword, category),
  }),
};
