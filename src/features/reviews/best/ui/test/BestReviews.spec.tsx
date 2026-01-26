import {render, screen} from '@testing-library/react';
import BestReviews from '../BestReviews';
import {useSelectCategory} from '@/features/reviews/filtering';
import {BestReviewsResult} from '@/entities/reviews';
import {ReviewCard} from '@/entities/review';

jest.mock('@/features/reviews/filtering');
jest.mock('@/entities/reviews', () => ({
  ...jest.requireActual('@/entities/reviews'),
}));
jest.mock('../BestReviewsGrid', () => ({
  __esModule: true,
  default: ({filteredReview}: {filteredReview: {count: number; reviews: ReviewCard[]}}) => (
    <div data-testid="best-reviews-grid" data-count={filteredReview.count}>
      {filteredReview.reviews.map(review => (
        <div key={review.board_id} data-testid={`grid-review-${review.board_id}`}>
          {review.title}
        </div>
      ))}
    </div>
  ),
}));

const mockUseSelectCategory = useSelectCategory as jest.MockedFunction<typeof useSelectCategory>;

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

const createMockBestReviewsResult = (): BestReviewsResult => ({
  all: {
    count: 2,
    reviews: [
      createMockReviewCard({board_id: 1, title: '전체 리뷰 1'}),
      createMockReviewCard({board_id: 2, title: '전체 리뷰 2'}),
    ],
  },
  food: {
    count: 1,
    reviews: [createMockReviewCard({board_id: 3, title: '음식 리뷰 1', category: 'food'})],
  },
  car: {count: 0, reviews: []},
  cosmetic: {count: 0, reviews: []},
  clothes: {count: 0, reviews: []},
  device: {count: 0, reviews: []},
  book: {count: 0, reviews: []},
  sports: {count: 0, reviews: []},
});

describe('src/features/reviews/best/ui/BestReviews.tsx', () => {
  const mockHandleSelectCategory = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseSelectCategory.mockReturnValue({
      selectedCategory: 'all',
      handleSelectCategory: mockHandleSelectCategory,
    });
  });

  describe('Happy Path', () => {
    it('초기 렌더링 시 선택된 카테고리의 리뷰가 BestReviewsGrid에 전달된다', () => {
      const mockReviews = createMockBestReviewsResult();

      render(<BestReviews reviews={mockReviews} />);

      const grid = screen.getByTestId('best-reviews-grid');
      expect(grid).toHaveAttribute('data-count', '2');
      expect(screen.getByTestId('grid-review-1')).toBeInTheDocument();
      expect(screen.getByTestId('grid-review-2')).toBeInTheDocument();
    });

    it('카테고리 변경 시 해당 카테고리의 리뷰가 전달된다', () => {
      mockUseSelectCategory.mockReturnValue({
        selectedCategory: 'food' as const,
        handleSelectCategory: mockHandleSelectCategory,
      });

      const mockReviews = createMockBestReviewsResult();

      render(<BestReviews reviews={mockReviews} />);

      const grid = screen.getByTestId('best-reviews-grid');
      expect(grid).toHaveAttribute('data-count', '1');
      expect(screen.getByTestId('grid-review-3')).toBeInTheDocument();
      expect(screen.getByText('음식 리뷰 1')).toBeInTheDocument();
    });
  });

  describe('Edge Case', () => {
    it('빈 카테고리가 선택되어도 에러 없이 렌더링된다', () => {
      mockUseSelectCategory.mockReturnValue({
        selectedCategory: 'car' as const,
        handleSelectCategory: mockHandleSelectCategory,
      });

      const mockReviews = createMockBestReviewsResult();

      render(<BestReviews reviews={mockReviews} />);

      const grid = screen.getByTestId('best-reviews-grid');
      expect(grid).toHaveAttribute('data-count', '0');
    });
  });

  describe('UI Elements', () => {
    it('제목이 올바르게 렌더링된다', () => {
      const mockReviews = createMockBestReviewsResult();

      render(<BestReviews reviews={mockReviews} />);

      expect(screen.getByText('실시간 베스트 후기')).toBeInTheDocument();
    });
  });
});
