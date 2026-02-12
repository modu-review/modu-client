import {useSuspenseQuery} from '@tanstack/react-query';
import {AISearchOptions} from './query-service';
import {AISearchCategory} from './types';

export function useGetAIReviewSummary(keyword: string, category: AISearchCategory) {
  return useSuspenseQuery(AISearchOptions.summary(keyword, category));
}
