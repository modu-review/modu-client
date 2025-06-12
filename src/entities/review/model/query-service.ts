import {getReviewBookmarks} from '../apis/api-service';

export const reviewQueryKeys = {
  bookmarks: (reviewId: number) => [`review-${reviewId}`, 'bookmarks'],
};

export const reviewQueryOptions = {
  bookmarks: (reviewId: number) => ({
    queryKey: reviewQueryKeys.bookmarks(reviewId),
    queryFn: () => getReviewBookmarks(reviewId),
  }),
};
