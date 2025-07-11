import {useSuspenseInfiniteQuery} from '@tanstack/react-query';
import {reviewsQueryOptions} from './query-service';
import {Category} from '@/entities/review';

export default function useCategoryReviews(categoryId: Category, sort: string) {
  return useSuspenseInfiniteQuery({
    ...reviewsQueryOptions.category(categoryId, sort),
    getNextPageParam: lastPage => {
      if (lastPage.has_next) return lastPage.next_cursor;
    },
  });
}
