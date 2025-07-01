import {useSuspenseInfiniteQuery} from '@tanstack/react-query';
import {reviewsQueryOptions} from './query-service';

export default function useCategoryReviews(categoryId: string, sort: string) {
  return useSuspenseInfiniteQuery({
    ...reviewsQueryOptions.category(categoryId, sort),
    getNextPageParam: lastPage => {
      if (lastPage.has_next) return lastPage.next_cursor;
    },
  });
}
