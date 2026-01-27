import {SearchReviewCard} from '@/entities/review';
import {PostsByUserResult} from '@/entities/users/model/types';

export const createMockSearchReviewCard = (overrides: Partial<SearchReviewCard> = {}): SearchReviewCard => ({
  board_id: 1,
  title: '테스트 게시글',
  author_nickname: 'testUser',
  category: 'food',
  preview: '테스트 미리보기',
  comments_count: 5,
  bookmarks: 10,
  image_url: 'https://example.com/image.jpg',
  created_at: '2026-01-25',
  ...overrides,
});

export const createMockPostsByUserPage = (
  reviewCount: number = 3,
  hasNext: boolean = false,
  startId: number = 1,
  totalResults: number = 10,
): PostsByUserResult => ({
  results: Array.from({length: reviewCount}, (_, idx) =>
    createMockSearchReviewCard({
      board_id: startId + idx,
      title: `게시글 ${startId + idx}`,
    }),
  ),
  next_cursor: hasNext ? startId + reviewCount : null,
  has_next: hasNext,
  total_results: totalResults,
});

export const createMockInfiniteQueryData = (
  pageCount: number = 2,
  reviewsPerPage: number = 3,
  totalResults: number = 10,
) => ({
  pages: Array.from({length: pageCount}, (_, pageIdx) =>
    createMockPostsByUserPage(reviewsPerPage, pageIdx < pageCount - 1, pageIdx * reviewsPerPage + 1, totalResults),
  ),
  pageParams: Array.from({length: pageCount}, (_, idx) => idx),
});

export const emptyInfiniteQueryData = {
  pages: [
    {
      results: [],
      next_cursor: null,
      has_next: false,
      total_results: 0,
    },
  ],
  pageParams: [0],
};
