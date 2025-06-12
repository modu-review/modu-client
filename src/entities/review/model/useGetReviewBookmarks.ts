import {useSuspenseQuery} from '@tanstack/react-query';
import {reviewQueryOptions} from './query-service';

export default function useGetReviewBookmarks(reviewId: number) {
  return useSuspenseQuery(reviewQueryOptions.bookmarks(reviewId));
}
