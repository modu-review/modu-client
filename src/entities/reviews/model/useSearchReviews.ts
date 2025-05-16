import {useSuspenseInfiniteQuery} from '@tanstack/react-query';
import {reviewQueryOptions} from './query-service';

export default function useSearchReviews(categoryId: string, sort: string) {
  return useSuspenseInfiniteQuery({
    ...reviewQueryOptions.search(categoryId, sort),
    getNextPageParam: lastPage => {
      if (lastPage.has_next) return lastPage.next_cursor;
    },
  });
}
