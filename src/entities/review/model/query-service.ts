import {keepPreviousData} from '@tanstack/react-query';
import {getReviewBookmarks, getReviewComments} from '../apis/api-service';

export const reviewQueryKeys = {
  bookmarks: (reviewId: number) => [`review-${reviewId}`, 'bookmarks'],
  comments: (reviewId: number, page: number) => [`review-${reviewId}`, 'comments', page],
};

export const reviewQueryOptions = {
  bookmarks: (reviewId: number) => ({
    queryKey: reviewQueryKeys.bookmarks(reviewId),
    queryFn: () => getReviewBookmarks(reviewId),
  }),
  comments: (reviewId: number, page: number) => ({
    queryKey: reviewQueryKeys.comments(reviewId, page),
    queryFn: () => getReviewComments(reviewId, page),
    placeholderData: keepPreviousData,
  }),
};
