import {render, screen} from '@testing-library/react';
import ReviewWithPagination from '../ReviewWithPagination';
import {useKeywordReviews} from '@/entities/reviews';
import {createMockKeywordReviewsResult, emptyKeywordReviewsResult, TEST_KEYWORD} from './stub';

const mockParams = {keyword: TEST_KEYWORD};
const mockSearchParams = new URLSearchParams();

jest.mock('next/navigation', () => ({
  useParams: () => mockParams,
  useSearchParams: () => mockSearchParams,
}));

jest.mock('@/entities/reviews', () => ({
  useKeywordReviews: jest.fn(),
  ReviewArticle: ({searchReview, priority}: any) => (
    <article data-testid={`review-article-${searchReview.board_id}`} data-priority={priority}>
      {searchReview.title}
    </article>
  ),
  NoSearchResults: ({title, description, description2}: any) => (
    <div data-testid="no-search-results">
      <h2>{title}</h2>
      <p>{description}</p>
      {description2 && <p>{description2}</p>}
    </div>
  ),
}));

jest.mock('@/widgets/pagination', () => ({
  __esModule: true,
  default: ({currentPage, totalPages, generateUrl}: any) => (
    <nav
      data-testid="pagination"
      data-current-page={currentPage}
      data-total-pages={totalPages}
      data-test-url={generateUrl && generateUrl(2)}
    >
      Pagination
    </nav>
  ),
}));

const mockUseKeywordReviews = useKeywordReviews as jest.MockedFunction<typeof useKeywordReviews>;

describe('src/features/reviews/keyword/ui/ReviewWithPagination.tsx', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockSearchParams.delete('page');
    mockSearchParams.delete('sort');
    mockParams.keyword = TEST_KEYWORD;
  });

  describe('Happy Path', () => {
    it('리뷰 데이터가 있을 때 리스트 형태로 렌더링된다', () => {
      mockUseKeywordReviews.mockReturnValue(createMockKeywordReviewsResult(5, 1, 2));

      render(<ReviewWithPagination sort="recent" />);

      for (let i = 1; i <= 5; i++) {
        expect(screen.getByTestId(`review-article-${i}`)).toBeInTheDocument();
      }
    });

    it('첫 3개 리뷰에는 이미지 우선 로딩이 적용되고 나머지는 지연 로딩된다', () => {
      mockUseKeywordReviews.mockReturnValue(createMockKeywordReviewsResult(5, 1, 2));

      render(<ReviewWithPagination sort="recent" />);

      expect(screen.getByTestId('review-article-1')).toHaveAttribute('data-priority', 'true');
      expect(screen.getByTestId('review-article-2')).toHaveAttribute('data-priority', 'true');
      expect(screen.getByTestId('review-article-3')).toHaveAttribute('data-priority', 'true');
      expect(screen.getByTestId('review-article-4')).toHaveAttribute('data-priority', 'false');
      expect(screen.getByTestId('review-article-5')).toHaveAttribute('data-priority', 'false');
    });

    it('페이지네이션 컴포넌트에 현재 페이지와 전체 페이지가 전달된다', () => {
      mockSearchParams.set('page', '2');
      mockUseKeywordReviews.mockReturnValue(createMockKeywordReviewsResult(3, 2, 5));

      render(<ReviewWithPagination sort="recent" />);

      const pagination = screen.getByTestId('pagination');
      expect(pagination).toHaveAttribute('data-current-page', '2');
      expect(pagination).toHaveAttribute('data-total-pages', '5');
    });

    it('페이지네이션 URL 생성 함수가 키워드, 페이지, 정렬 옵션을 포함한다', () => {
      mockUseKeywordReviews.mockReturnValue(createMockKeywordReviewsResult(3, 1, 3));

      render(<ReviewWithPagination sort="hotbookmarks" />);

      const pagination = screen.getByTestId('pagination');
      expect(pagination).toHaveAttribute('data-test-url', `/search/${TEST_KEYWORD}?page=2&sort=hotbookmarks`);
    });

    it('useKeywordReviews 훅이 키워드, 페이지, 정렬 옵션과 함께 호출된다', () => {
      mockSearchParams.set('page', '2');
      mockUseKeywordReviews.mockReturnValue(createMockKeywordReviewsResult(3, 2, 3));

      render(<ReviewWithPagination sort="hotbookmarks" />);

      expect(mockUseKeywordReviews).toHaveBeenCalledWith(TEST_KEYWORD, 2, 'hotbookmarks');
    });
  });

  describe('검색 결과 없음', () => {
    it('검색 결과가 없으면 검색 결과 없음 컴포넌트가 렌더링된다', () => {
      mockUseKeywordReviews.mockReturnValue(emptyKeywordReviewsResult);

      render(<ReviewWithPagination sort="recent" />);

      expect(screen.getByTestId('no-search-results')).toBeInTheDocument();
      expect(screen.getByText(/테스트에 대한 검색 결과가 없어요/)).toBeInTheDocument();
    });

    it('검색 결과 없음 컴포넌트에 디코딩된 키워드가 표시된다', () => {
      mockParams.keyword = '%ED%85%8C%EC%8A%A4%ED%8A%B8';
      mockUseKeywordReviews.mockReturnValue(emptyKeywordReviewsResult);

      render(<ReviewWithPagination sort="recent" />);

      expect(screen.getByText(/테스트에 대한 검색 결과가 없어요/)).toBeInTheDocument();
    });

    it('검색 결과가 없을 때 페이지네이션이 렌더링되지 않는다', () => {
      mockUseKeywordReviews.mockReturnValue(emptyKeywordReviewsResult);

      render(<ReviewWithPagination sort="recent" />);

      expect(screen.queryByTestId('pagination')).not.toBeInTheDocument();
    });
  });

  describe('Edge Case', () => {
    it('리뷰가 3개 미만일 때 모두 이미지 우선 로딩이 적용된다', () => {
      mockUseKeywordReviews.mockReturnValue(createMockKeywordReviewsResult(2, 1, 1));

      render(<ReviewWithPagination sort="recent" />);

      expect(screen.getByTestId('review-article-1')).toHaveAttribute('data-priority', 'true');
      expect(screen.getByTestId('review-article-2')).toHaveAttribute('data-priority', 'true');
    });

    it('리뷰가 1개일 때도 이미지 우선 로딩이 적용된다', () => {
      mockUseKeywordReviews.mockReturnValue(createMockKeywordReviewsResult(1, 1, 1));

      render(<ReviewWithPagination sort="recent" />);

      expect(screen.getByTestId('review-article-1')).toHaveAttribute('data-priority', 'true');
    });

    it('page 파라미터가 없으면 기본값 1을 사용한다', () => {
      mockUseKeywordReviews.mockReturnValue(createMockKeywordReviewsResult(3, 1, 3));

      render(<ReviewWithPagination sort="recent" />);

      expect(mockUseKeywordReviews).toHaveBeenCalledWith(TEST_KEYWORD, 1, 'recent');
    });

    it('page 파라미터가 유효하지 않은 값이면 기본값 1을 사용한다', () => {
      mockSearchParams.set('page', 'invalid');
      mockUseKeywordReviews.mockReturnValue(createMockKeywordReviewsResult(3, 1, 3));

      render(<ReviewWithPagination sort="recent" />);

      expect(mockUseKeywordReviews).toHaveBeenCalledWith(TEST_KEYWORD, 1, 'recent');
    });

    it('page 파라미터가 0이면 기본값 1을 사용한다', () => {
      mockSearchParams.set('page', '0');
      mockUseKeywordReviews.mockReturnValue(createMockKeywordReviewsResult(3, 1, 3));

      render(<ReviewWithPagination sort="recent" />);

      expect(mockUseKeywordReviews).toHaveBeenCalledWith(TEST_KEYWORD, 1, 'recent');
    });

    it('page 파라미터가 음수이면 음수 값이 그대로 전달된다', () => {
      mockSearchParams.set('page', '-1');
      mockUseKeywordReviews.mockReturnValue(createMockKeywordReviewsResult(3, 1, 3));

      render(<ReviewWithPagination sort="recent" />);

      expect(mockUseKeywordReviews).toHaveBeenCalledWith(TEST_KEYWORD, -1, 'recent');
    });

    it('정렬 옵션이 변경되어도 페이지네이션 URL에 반영된다', () => {
      mockUseKeywordReviews.mockReturnValue(createMockKeywordReviewsResult(3, 1, 3));

      const {rerender} = render(<ReviewWithPagination sort="recent" />);

      let pagination = screen.getByTestId('pagination');
      expect(pagination).toHaveAttribute('data-test-url', `/search/${TEST_KEYWORD}?page=2&sort=recent`);

      rerender(<ReviewWithPagination sort="hotbookmarks" />);

      pagination = screen.getByTestId('pagination');
      expect(pagination).toHaveAttribute('data-test-url', `/search/${TEST_KEYWORD}?page=2&sort=hotbookmarks`);
    });

    it('useParams에서 키워드를 추출한다', () => {
      mockParams.keyword = 'react';
      mockUseKeywordReviews.mockReturnValue(createMockKeywordReviewsResult(3, 1, 3));

      render(<ReviewWithPagination sort="recent" />);

      expect(mockUseKeywordReviews).toHaveBeenCalledWith('react', 1, 'recent');
    });

    it('useSearchParams에서 페이지를 추출한다', () => {
      mockSearchParams.set('page', '5');
      mockUseKeywordReviews.mockReturnValue(createMockKeywordReviewsResult(3, 5, 10));

      render(<ReviewWithPagination sort="recent" />);

      expect(mockUseKeywordReviews).toHaveBeenCalledWith(TEST_KEYWORD, 5, 'recent');
    });

    it('인코딩된 키워드도 올바르게 처리한다', () => {
      mockParams.keyword = '%ED%85%8C%EC%8A%A4%ED%8A%B8';
      mockUseKeywordReviews.mockReturnValue(emptyKeywordReviewsResult);

      render(<ReviewWithPagination sort="recent" />);

      expect(screen.getByText(/테스트에 대한 검색 결과가 없어요/)).toBeInTheDocument();
    });
  });
});
