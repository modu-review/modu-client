import {keepPreviousData} from '@tanstack/react-query';
import {getReviewBookmarks, getReviewComments} from '../apis/api-service';

export const reviewQueryKeys = {
  all: () => ['review'] as const,
  detail: (reviewId: number) => [...reviewQueryKeys.all(), reviewId] as const,

  bookmarks: (reviewId: number) => [...reviewQueryKeys.detail(reviewId), 'bookmarks'] as const,
  comments: {
    all: (reviewId: number) => [...reviewQueryKeys.detail(reviewId), 'comments'] as const,
    page: (reviewId: number, page: number) => [...reviewQueryKeys.comments.all(reviewId), page] as const,
  },
};

export const reviewQueryOptions = {
  bookmarks: (reviewId: number) => ({
    queryKey: reviewQueryKeys.bookmarks(reviewId),
    queryFn: () => getReviewBookmarks(reviewId),
  }),
  comments: (reviewId: number, page: number) => ({
    queryKey: reviewQueryKeys.comments.page(reviewId, page),
    queryFn: () => getReviewComments(reviewId, page),
    placeholderData: keepPreviousData,
  }),
};
