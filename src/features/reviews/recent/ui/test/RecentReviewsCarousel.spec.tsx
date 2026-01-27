import {ReviewCard} from '@/entities/review';
import {useGetRecentReviews} from '@/entities/reviews';
import {createMockRecentReviews, emptyRecentReviews} from './stub';
import {render, screen} from '@testing-library/react';
import RecentReviewsCarousel from '../RecentReviewsCarousel';

jest.mock('@/entities/reviews');

jest.mock('../MultiCarousel', () => ({
  __esModule: true,
  default: ({children}: {children: React.ReactNode}) => <ul>{children}</ul>,
}));

jest.mock('../RecentReviewCard', () => ({
  __esModule: true,
  default: ({post}: {key: string; post: ReviewCard}) => (
    <li>
      <p>{post.title}</p>
      <p>{post.preview}</p>
    </li>
  ),
}));

jest.mock('../MoreReviewsLink');

const mockUseGetRecentReviews = useGetRecentReviews as jest.MockedFunction<typeof useGetRecentReviews>;

describe('src/features/reviews/recent/ui/RecentReviewsCarousel.tsx', () => {
  describe('정상 케이스', () => {
    const defaultRecentReviews = createMockRecentReviews(6);
    beforeEach(() => {
      mockUseGetRecentReviews.mockReturnValue({data: defaultRecentReviews} as unknown as ReturnType<
        typeof useGetRecentReviews
      >);
    });

    it('최근 등록된 후기 목록 2줄이 정상적으로 렌더링된다.', () => {
      render(<RecentReviewsCarousel />);

      expect(screen.queryAllByRole('list')).toHaveLength(2);
      expect(screen.queryAllByRole('listitem')).toHaveLength(12);
    });

    it('리뷰 카드로 후기 정보가 정상적으로 전달된다.', () => {
      render(<RecentReviewsCarousel />);

      defaultRecentReviews.latest_reviews.forEach(post => {
        expect(screen.getAllByText(post.title)).toHaveLength(2);
        expect(screen.getAllByText(post.preview)).toHaveLength(2);
      });
    });
  });

  describe('엣지 케이스', () => {
    it('최근 등록된 후기가 없을 경우 안내 문구가 표시된다.', () => {
      mockUseGetRecentReviews.mockReturnValue({
        data: emptyRecentReviews,
      } as unknown as ReturnType<typeof useGetRecentReviews>);

      render(<RecentReviewsCarousel />);

      expect(screen.getByText('아직 등록된 후기가 없어요.')).toBeInTheDocument();
      expect(screen.queryAllByRole('list')).toHaveLength(0);
      expect(screen.queryAllByRole('listitem')).toHaveLength(0);
    });
  });
});
