import {Category, ReviewCard, SearchReviewCard} from '@/entities/review';

export type BestReviewsResult = {
  [key in Category]: {
    count: number;
    reviews: ReviewCard[];
  };
};

export type KeywordReviewsResult = {
  results: SearchReviewCard[];
  current_page: number;
  total_pages: number;
};

export type CategoryReviewsResult = {
  results: SearchReviewCard[];
  next_cursor: number | null;
  has_next: boolean;
};

export type MyReviews = {
  results: ReviewCard[];
  current_page: number;
  total_pages: number;
};

export type MyBookmarkedReviews = {
  results: ReviewCard[];
  current_page: number;
  total_pages: number;
};

export type RecentReviews = {
  latest_reviews: ReviewCard[];
};
