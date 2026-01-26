import {render, screen} from '@testing-library/react';
import MyReviews from '../MyReviews';
import {useMyReviews} from '@/entities/reviews';
import {createMockMyReviews, emptyMyReviews, multiPageMyReviews} from './stub';

jest.mock('@/entities/reviews');
jest.mock('../Empty', () => ({
  __esModule: true,
  default: ({title, linkText, linkHref}: any) => (
    <div data-testid="empty">
      <div data-testid="empty-title">{title}</div>
      <div data-testid="empty-link-text">{linkText}</div>
      <div data-testid="empty-link-href">{linkHref}</div>
    </div>
  ),
}));
jest.mock('../MyReviewsGrid', () => ({
  __esModule: true,
  default: ({reviews, context}: any) => (
    <div data-testid="my-reviews-grid" data-context={context}>
      {reviews.map((review: any) => (
        <div key={review.board_id} data-testid={`review-${review.board_id}`}>
          {review.title}
        </div>
      ))}
    </div>
  ),
}));
jest.mock('@/widgets/pagination', () => ({
  __esModule: true,
  default: ({currentPage, totalPages, generateUrl}: any) => (
    <div data-testid="pagination" data-current-page={currentPage} data-total-pages={totalPages}>
      <div data-testid="generated-url-1">{generateUrl(1)}</div>
      <div data-testid="generated-url-2">{generateUrl(2)}</div>
    </div>
  ),
}));

const mockUseMyReviews = useMyReviews as jest.MockedFunction<typeof useMyReviews>;

describe('features/reviews/my/ui/MyReviews', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('정상 케이스', () => {
    it('리뷰가 있을 때 리뷰 그리드가 렌더링된다', () => {
      const mockData = createMockMyReviews(3);
      mockUseMyReviews.mockReturnValue(mockData);

      render(<MyReviews currentPage={1} />);

      expect(screen.getByTestId('my-reviews-grid')).toBeInTheDocument();
    });

    it('내 리뷰 조회 훅이 올바른 페이지 번호로 호출된다', () => {
      const mockData = createMockMyReviews(3);
      mockUseMyReviews.mockReturnValue(mockData);

      render(<MyReviews currentPage={2} />);

      expect(mockUseMyReviews).toHaveBeenCalledWith(2);
    });

    it('리뷰 데이터가 그리드에 전달된다', () => {
      const mockData = createMockMyReviews(3);
      mockUseMyReviews.mockReturnValue(mockData);

      render(<MyReviews currentPage={1} />);

      expect(screen.getByTestId('review-1')).toBeInTheDocument();
      expect(screen.getByTestId('review-2')).toBeInTheDocument();
      expect(screen.getByTestId('review-3')).toBeInTheDocument();
    });

    it('사용 위치가 마이 페이지임을 그리드에 전달한다', () => {
      const mockData = createMockMyReviews(3);
      mockUseMyReviews.mockReturnValue(mockData);

      render(<MyReviews currentPage={1} />);

      const grid = screen.getByTestId('my-reviews-grid');
      expect(grid).toHaveAttribute('data-context', 'my');
    });

    it('페이지네이션 컴포넌트가 렌더링된다', () => {
      const mockData = createMockMyReviews(3);
      mockUseMyReviews.mockReturnValue(mockData);

      render(<MyReviews currentPage={1} />);

      expect(screen.getByTestId('pagination')).toBeInTheDocument();
    });

    it('페이지네이션에 올바른 현재 페이지가 전달된다', () => {
      const mockData = createMockMyReviews(3, 2);
      mockUseMyReviews.mockReturnValue(mockData);

      render(<MyReviews currentPage={2} />);

      const pagination = screen.getByTestId('pagination');
      expect(pagination).toHaveAttribute('data-current-page', '2');
    });

    it('페이지네이션에 올바른 전체 페이지 수가 전달된다', () => {
      const mockData = createMockMyReviews(3, 1, 5);
      mockUseMyReviews.mockReturnValue(mockData);

      render(<MyReviews currentPage={1} />);

      const pagination = screen.getByTestId('pagination');
      expect(pagination).toHaveAttribute('data-total-pages', '5');
    });

    it('페이지네이션의 주소 생성 함수가 올바른 쿼리스트링을 생성한다', () => {
      const mockData = createMockMyReviews(3);
      mockUseMyReviews.mockReturnValue(mockData);

      render(<MyReviews currentPage={1} />);

      expect(screen.getByTestId('generated-url-1')).toHaveTextContent('?tabs=my&page=1');
      expect(screen.getByTestId('generated-url-2')).toHaveTextContent('?tabs=my&page=2');
    });
  });

  describe('빈 상태 테스트', () => {
    it('리뷰가 없을 때 빈 상태 컴포넌트가 렌더링된다', () => {
      mockUseMyReviews.mockReturnValue(emptyMyReviews);

      render(<MyReviews currentPage={1} />);

      expect(screen.getByTestId('empty')).toBeInTheDocument();
    });

    it('리뷰가 없을 때 리뷰 그리드가 렌더링되지 않는다', () => {
      mockUseMyReviews.mockReturnValue(emptyMyReviews);

      render(<MyReviews currentPage={1} />);

      expect(screen.queryByTestId('my-reviews-grid')).not.toBeInTheDocument();
    });

    it('리뷰가 없을 때 페이지네이션이 렌더링되지 않는다', () => {
      mockUseMyReviews.mockReturnValue(emptyMyReviews);

      render(<MyReviews currentPage={1} />);

      expect(screen.queryByTestId('pagination')).not.toBeInTheDocument();
    });

    it('빈 상태에 올바른 제목이 전달된다', () => {
      mockUseMyReviews.mockReturnValue(emptyMyReviews);

      render(<MyReviews currentPage={1} />);

      expect(screen.getByTestId('empty-title')).toHaveTextContent('아직 작성한 후기가 없어요.');
    });

    it('빈 상태에 올바른 링크 텍스트가 전달된다', () => {
      mockUseMyReviews.mockReturnValue(emptyMyReviews);

      render(<MyReviews currentPage={1} />);

      expect(screen.getByTestId('empty-link-text')).toHaveTextContent('후기 작성하기');
    });

    it('빈 상태에 올바른 링크 주소가 전달된다', () => {
      mockUseMyReviews.mockReturnValue(emptyMyReviews);

      render(<MyReviews currentPage={1} />);

      expect(screen.getByTestId('empty-link-href')).toHaveTextContent('/reviews/new');
    });
  });

  describe('다중 페이지 테스트', () => {
    it('2페이지로 이동 시 내 리뷰 조회 훅이 2로 호출된다', () => {
      const mockData = createMockMyReviews(3, 2, 3);
      mockUseMyReviews.mockReturnValue(mockData);

      render(<MyReviews currentPage={2} />);

      expect(mockUseMyReviews).toHaveBeenCalledWith(2);
    });

    it('전체 페이지 수가 여러 개일 때 페이지네이션이 표시된다', () => {
      mockUseMyReviews.mockReturnValue(multiPageMyReviews);

      render(<MyReviews currentPage={1} />);

      const pagination = screen.getByTestId('pagination');
      expect(pagination).toHaveAttribute('data-total-pages', '3');
    });
  });

  describe('엣지/예외 케이스', () => {
    it('페이지 번호가 1일 때도 정상 렌더링된다', () => {
      const mockData = createMockMyReviews(3, 1);
      mockUseMyReviews.mockReturnValue(mockData);

      render(<MyReviews currentPage={1} />);

      expect(screen.getByTestId('my-reviews-grid')).toBeInTheDocument();
    });

    it('전체 페이지 수가 1일 때도 페이지네이션이 표시된다', () => {
      const mockData = createMockMyReviews(3, 1, 1);
      mockUseMyReviews.mockReturnValue(mockData);

      render(<MyReviews currentPage={1} />);

      expect(screen.getByTestId('pagination')).toBeInTheDocument();
    });
  });
});
