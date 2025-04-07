import {useSuspenseInfiniteQuery} from '@tanstack/react-query';
import {reviewQueryOptions} from './query-service';

export default function useSearchReviews(categoryId: string) {
  return useSuspenseInfiniteQuery({
    ...reviewQueryOptions.search(categoryId),
    getNextPageParam: lastPage => {
      if (lastPage.has_next) return lastPage.next_cursor;
    },
  });
}
