import {ReviewCard} from '@/entities/review';

export const TEST_USER_NICKNAME = 'testUser';
export const TEST_OTHER_USER_NICKNAME = 'otherUser';

export const createMockRecentReviewCard = (overrides: Partial<ReviewCard> = {}): ReviewCard => ({
  board_id: 1,
  title: '테스트 리뷰 제목',
  author_nickname: TEST_USER_NICKNAME,
  category: 'food' as const,
  preview: '리뷰 미리보기 텍스트입니다.',
  comments_count: 5,
  bookmarks: 10,
  image_url: 'https://example.com/image.jpg',
  ...overrides,
});
