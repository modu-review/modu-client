import {render, screen} from '@testing-library/react';
import MyBookmarkedReviews from '../MyBookmarkedReviews';
import {useMyBookmarkedReviews} from '@/entities/reviews';
import {useUserNickname} from '@/entities/auth';
import {createMockMyBookmarkedReviews, emptyMyBookmarkedReviews, TEST_USER_NICKNAME} from './stub';

jest.mock('@/entities/reviews');
jest.mock('@/entities/auth');
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
  default: ({reviews, context, userNickname}: any) => (
    <div data-testid="my-reviews-grid" data-context={context} data-user-nickname={userNickname}>
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

const mockUseMyBookmarkedReviews = useMyBookmarkedReviews as jest.MockedFunction<typeof useMyBookmarkedReviews>;
const mockUseUserNickname = useUserNickname as jest.MockedFunction<typeof useUserNickname>;

describe('features/reviews/my/ui/MyBookmarkedReviews', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockUseUserNickname.mockReturnValue(TEST_USER_NICKNAME);
  });

  describe('정상 케이스', () => {
    it('북마크 리뷰가 있을 때 리뷰 그리드가 렌더링된다', () => {
      const mockData = createMockMyBookmarkedReviews(3);
      mockUseMyBookmarkedReviews.mockReturnValue(mockData);

      render(<MyBookmarkedReviews currentPage={1} />);

      expect(screen.getByTestId('my-reviews-grid')).toBeInTheDocument();
    });

    it('북마크 리뷰 조회 훅이 올바른 페이지 번호로 호출된다', () => {
      const mockData = createMockMyBookmarkedReviews(3);
      mockUseMyBookmarkedReviews.mockReturnValue(mockData);

      render(<MyBookmarkedReviews currentPage={2} />);

      expect(mockUseMyBookmarkedReviews).toHaveBeenCalledWith(2);
    });

    it('사용자 닉네임 조회 훅이 호출된다', () => {
      const mockData = createMockMyBookmarkedReviews(3);
      mockUseMyBookmarkedReviews.mockReturnValue(mockData);

      render(<MyBookmarkedReviews currentPage={1} />);

      expect(mockUseUserNickname).toHaveBeenCalled();
    });

    it('리뷰 데이터가 그리드에 전달된다', () => {
      const mockData = createMockMyBookmarkedReviews(3);
      mockUseMyBookmarkedReviews.mockReturnValue(mockData);

      render(<MyBookmarkedReviews currentPage={1} />);

      expect(screen.getByTestId('review-1')).toBeInTheDocument();
      expect(screen.getByTestId('review-2')).toBeInTheDocument();
      expect(screen.getByTestId('review-3')).toBeInTheDocument();
    });

    it('사용 위치가 북마크 페이지임을 그리드에 전달한다', () => {
      const mockData = createMockMyBookmarkedReviews(3);
      mockUseMyBookmarkedReviews.mockReturnValue(mockData);

      render(<MyBookmarkedReviews currentPage={1} />);

      const grid = screen.getByTestId('my-reviews-grid');
      expect(grid).toHaveAttribute('data-context', 'myBookmarks');
    });

    it('사용자 닉네임이 그리드에 전달된다', () => {
      const mockData = createMockMyBookmarkedReviews(3);
      mockUseMyBookmarkedReviews.mockReturnValue(mockData);

      render(<MyBookmarkedReviews currentPage={1} />);

      const grid = screen.getByTestId('my-reviews-grid');
      expect(grid).toHaveAttribute('data-user-nickname', TEST_USER_NICKNAME);
    });

    it('페이지네이션 컴포넌트가 렌더링된다', () => {
      const mockData = createMockMyBookmarkedReviews(3);
      mockUseMyBookmarkedReviews.mockReturnValue(mockData);

      render(<MyBookmarkedReviews currentPage={1} />);

      expect(screen.getByTestId('pagination')).toBeInTheDocument();
    });

    it('페이지네이션의 주소 생성 함수가 올바른 쿼리스트링을 생성한다', () => {
      const mockData = createMockMyBookmarkedReviews(3);
      mockUseMyBookmarkedReviews.mockReturnValue(mockData);

      render(<MyBookmarkedReviews currentPage={1} />);

      expect(screen.getByTestId('generated-url-1')).toHaveTextContent('?tabs=myBookmarks&page=1');
      expect(screen.getByTestId('generated-url-2')).toHaveTextContent('?tabs=myBookmarks&page=2');
    });
  });

  describe('빈 상태 테스트', () => {
    it('북마크 리뷰가 없을 때 빈 상태 컴포넌트가 렌더링된다', () => {
      mockUseMyBookmarkedReviews.mockReturnValue(emptyMyBookmarkedReviews);

      render(<MyBookmarkedReviews currentPage={1} />);

      expect(screen.getByTestId('empty')).toBeInTheDocument();
    });

    it('북마크 리뷰가 없을 때 리뷰 그리드가 렌더링되지 않는다', () => {
      mockUseMyBookmarkedReviews.mockReturnValue(emptyMyBookmarkedReviews);

      render(<MyBookmarkedReviews currentPage={1} />);

      expect(screen.queryByTestId('my-reviews-grid')).not.toBeInTheDocument();
    });

    it('북마크 리뷰가 없을 때 페이지네이션이 렌더링되지 않는다', () => {
      mockUseMyBookmarkedReviews.mockReturnValue(emptyMyBookmarkedReviews);

      render(<MyBookmarkedReviews currentPage={1} />);

      expect(screen.queryByTestId('pagination')).not.toBeInTheDocument();
    });

    it('빈 상태에 올바른 제목이 전달된다', () => {
      mockUseMyBookmarkedReviews.mockReturnValue(emptyMyBookmarkedReviews);

      render(<MyBookmarkedReviews currentPage={1} />);

      expect(screen.getByTestId('empty-title')).toHaveTextContent('아직 저장한 후기가 없어요.');
    });

    it('빈 상태에 올바른 링크 텍스트가 전달된다', () => {
      mockUseMyBookmarkedReviews.mockReturnValue(emptyMyBookmarkedReviews);

      render(<MyBookmarkedReviews currentPage={1} />);

      expect(screen.getByTestId('empty-link-text')).toHaveTextContent('후기 보러가기');
    });

    it('빈 상태에 올바른 링크 주소가 전달된다', () => {
      mockUseMyBookmarkedReviews.mockReturnValue(emptyMyBookmarkedReviews);

      render(<MyBookmarkedReviews currentPage={1} />);

      expect(screen.getByTestId('empty-link-href')).toHaveTextContent('/search');
    });
  });

  describe('사용자 닉네임 테스트', () => {
    it('사용자 닉네임이 null일 때도 렌더링된다', () => {
      const mockData = createMockMyBookmarkedReviews(3);
      mockUseMyBookmarkedReviews.mockReturnValue(mockData);
      mockUseUserNickname.mockReturnValue(null);

      render(<MyBookmarkedReviews currentPage={1} />);

      const grid = screen.getByTestId('my-reviews-grid');
      expect(grid).toBeInTheDocument();
    });

    it('사용자 닉네임이 변경되면 그리드에 새 값이 전달된다', () => {
      const mockData = createMockMyBookmarkedReviews(3);
      mockUseMyBookmarkedReviews.mockReturnValue(mockData);
      mockUseUserNickname.mockReturnValue('newUser');

      render(<MyBookmarkedReviews currentPage={1} />);

      const grid = screen.getByTestId('my-reviews-grid');
      expect(grid).toHaveAttribute('data-user-nickname', 'newUser');
    });
  });

  describe('다중 페이지 테스트', () => {
    it('2페이지로 이동 시 북마크 리뷰 조회 훅이 2로 호출된다', () => {
      const mockData = createMockMyBookmarkedReviews(3, 2, 3);
      mockUseMyBookmarkedReviews.mockReturnValue(mockData);

      render(<MyBookmarkedReviews currentPage={2} />);

      expect(mockUseMyBookmarkedReviews).toHaveBeenCalledWith(2);
    });

    it('전체 페이지 수가 여러 개일 때 페이지네이션이 표시된다', () => {
      const mockData = createMockMyBookmarkedReviews(9, 1, 3);
      mockUseMyBookmarkedReviews.mockReturnValue(mockData);

      render(<MyBookmarkedReviews currentPage={1} />);

      const pagination = screen.getByTestId('pagination');
      expect(pagination).toHaveAttribute('data-total-pages', '3');
    });
  });

  describe('엣지/예외 케이스', () => {
    it('페이지 번호가 1일 때도 정상 렌더링된다', () => {
      const mockData = createMockMyBookmarkedReviews(3, 1);
      mockUseMyBookmarkedReviews.mockReturnValue(mockData);

      render(<MyBookmarkedReviews currentPage={1} />);

      expect(screen.getByTestId('my-reviews-grid')).toBeInTheDocument();
    });

    it('전체 페이지 수가 1일 때도 페이지네이션이 표시된다', () => {
      const mockData = createMockMyBookmarkedReviews(3, 1, 1);
      mockUseMyBookmarkedReviews.mockReturnValue(mockData);

      render(<MyBookmarkedReviews currentPage={1} />);

      expect(screen.getByTestId('pagination')).toBeInTheDocument();
    });
  });
});
