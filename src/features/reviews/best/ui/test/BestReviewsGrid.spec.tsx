import {render, screen} from '@testing-library/react';
import BestReviewsGrid from '../BestReviewsGrid';
import {ReviewCard} from '@/entities/review';

jest.mock('../BestReviewCard', () => ({
  __esModule: true,
  default: ({card, priority}: {card: ReviewCard; priority: boolean}) => (
    <div data-testid={`review-card-${card.board_id}`} data-priority={priority}>
      {card.title}
    </div>
  ),
}));

const createMockReviewCard = (overrides: Partial<ReviewCard> = {}): ReviewCard => ({
  board_id: 1,
  title: '테스트 리뷰',
  author_nickname: 'testUser',
  category: 'food',
  preview: '테스트 미리보기',
  comments_count: 5,
  bookmarks: 10,
  image_url: 'https://example.com/image.jpg',
  ...overrides,
});

describe('src/features/reviews/best/ui/BestReviewsGrid.tsx', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Happy Path', () => {
    it('리뷰가 있을 때 모든 리뷰 카드가 렌더링된다', () => {
      const mockReviews = [
        createMockReviewCard({board_id: 1, title: '리뷰 1'}),
        createMockReviewCard({board_id: 2, title: '리뷰 2'}),
        createMockReviewCard({board_id: 3, title: '리뷰 3'}),
      ];

      render(
        <BestReviewsGrid
          filteredReview={{
            count: 3,
            reviews: mockReviews,
          }}
        />,
      );

      expect(screen.getByTestId('review-card-1')).toBeInTheDocument();
      expect(screen.getByTestId('review-card-2')).toBeInTheDocument();
      expect(screen.getByTestId('review-card-3')).toBeInTheDocument();
    });

    it('처음 3개 카드에는 priority=true가, 이후 카드에는 priority=false가 전달된다', () => {
      const mockReviews = [
        createMockReviewCard({board_id: 1}),
        createMockReviewCard({board_id: 2}),
        createMockReviewCard({board_id: 3}),
        createMockReviewCard({board_id: 4}),
        createMockReviewCard({board_id: 5}),
      ];

      render(
        <BestReviewsGrid
          filteredReview={{
            count: 5,
            reviews: mockReviews,
          }}
        />,
      );

      expect(screen.getByTestId('review-card-1')).toHaveAttribute('data-priority', 'true');
      expect(screen.getByTestId('review-card-2')).toHaveAttribute('data-priority', 'true');
      expect(screen.getByTestId('review-card-3')).toHaveAttribute('data-priority', 'true');
      expect(screen.getByTestId('review-card-4')).toHaveAttribute('data-priority', 'false');
      expect(screen.getByTestId('review-card-5')).toHaveAttribute('data-priority', 'false');
    });
  });

  describe('Edge Case', () => {
    it('count가 0일 때 빈 상태 메시지를 표시한다', () => {
      render(
        <BestReviewsGrid
          filteredReview={{
            count: 0,
            reviews: [],
          }}
        />,
      );

      expect(screen.getByText('해당 카테고리는 아직 베스트 후기가 없어요.')).toBeInTheDocument();
      expect(screen.queryByTestId(/review-card-/)).toBeNull();
    });

    it('리뷰가 3개 미만일 때도 정상 동작한다', () => {
      const mockReviews = [
        createMockReviewCard({board_id: 1}),
        createMockReviewCard({board_id: 2}),
      ];

      render(
        <BestReviewsGrid
          filteredReview={{
            count: 2,
            reviews: mockReviews,
          }}
        />,
      );

      expect(screen.getByTestId('review-card-1')).toHaveAttribute('data-priority', 'true');
      expect(screen.getByTestId('review-card-2')).toHaveAttribute('data-priority', 'true');
    });
  });
});
