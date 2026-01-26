import {Category, ReviewCard} from '@/entities/review';
import {MyReviews, MyBookmarkedReviews} from '@/entities/reviews';

export const TEST_USER_NICKNAME = 'testUser';
export const TEST_OTHER_USER_NICKNAME = 'otherUser';
export const TEST_CATEGORY: Category = 'food';
export const TEST_PAGE = 1;

export const createMockReviewCard = (overrides: Partial<ReviewCard> = {}): ReviewCard => ({
  board_id: 1,
  title: '테스트 리뷰 제목',
  author_nickname: TEST_USER_NICKNAME,
  category: 'food',
  preview: '리뷰 미리보기 텍스트입니다.',
  comments_count: 5,
  bookmarks: 10,
  image_url: 'https://example.com/image.jpg',
  ...overrides,
});

export const otherUserReviewCard: ReviewCard = createMockReviewCard({
  board_id: 2,
  author_nickname: TEST_OTHER_USER_NICKNAME,
  title: '다른 사용자의 리뷰',
});

export const createMockReviewCards = (count: number = 3, startId: number = 1): ReviewCard[] =>
  Array.from({length: count}, (_, idx) =>
    createMockReviewCard({
      board_id: startId + idx,
      title: `리뷰 ${startId + idx}`,
    }),
  );

export const createMockMyReviews = (
  reviewCount: number = 3,
  currentPage: number = 1,
  totalPages: number = 1,
): MyReviews => ({
  results: createMockReviewCards(reviewCount),
  current_page: currentPage,
  total_pages: totalPages,
});

export const emptyMyReviews: MyReviews = {
  results: [],
  current_page: 1,
  total_pages: 0,
};

export const createMockMyBookmarkedReviews = (
  reviewCount: number = 3,
  currentPage: number = 1,
  totalPages: number = 1,
): MyBookmarkedReviews => ({
  results: createMockReviewCards(reviewCount),
  current_page: currentPage,
  total_pages: totalPages,
});

export const emptyMyBookmarkedReviews: MyBookmarkedReviews = {
  results: [],
  current_page: 1,
  total_pages: 0,
};

export const mixedAuthorReviews: ReviewCard[] = [
  createMockReviewCard({board_id: 1, author_nickname: TEST_USER_NICKNAME}),
  createMockReviewCard({board_id: 2, author_nickname: TEST_OTHER_USER_NICKNAME}),
  createMockReviewCard({board_id: 3, author_nickname: 'anotherUser'}),
];

export const multiPageMyReviews: MyReviews = {
  results: createMockReviewCards(9),
  current_page: 1,
  total_pages: 3,
};
