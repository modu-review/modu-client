import {useSuspenseQuery} from '@tanstack/react-query';
import {reviewsQueryOptions} from './query-service';

export function useGetRecentReviews() {
  return useSuspenseQuery(reviewsQueryOptions.recent());
}
