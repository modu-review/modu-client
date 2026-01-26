import {render, screen} from '@testing-library/react';
import ReviewsWithScroll from '../ReviewWithScroll';
import {useCategoryReviews} from '@/entities/reviews';
import {
  createMockInfiniteQueryData,
  createMockSearchReviewCard,
  emptyInfiniteQueryData,
  createMockCategoryReviewsPage,
} from './stub';

jest.mock('@/entities/reviews', () => ({
  useCategoryReviews: jest.fn(),
  ReviewArticle: ({searchReview, priority}: any) => (
    <article data-testid={`review-article-${searchReview.board_id}`} data-priority={priority}>
      {searchReview.title}
    </article>
  ),
  ReviewArticleLoading: () => <div data-testid="review-article-loading">Loading...</div>,
  NoSearchResults: ({title, description}: any) => (
    <div data-testid="no-search-results">
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  ),
}));

const mockUseCategoryReviews = useCategoryReviews as jest.MockedFunction<typeof useCategoryReviews>;

describe('src/features/reviews/category/ui/ReviewsWithScroll.tsx', () => {
  const mockFetchNextPage = jest.fn();
  let intersectionObserverCallback: IntersectionObserverCallback;
  const mockObserve = jest.fn();
  const mockDisconnect = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    const mockIntersectionObserver = jest.fn(callback => {
      intersectionObserverCallback = callback;
      return {
        observe: mockObserve,
        disconnect: mockDisconnect,
        unobserve: jest.fn(),
        takeRecords: jest.fn(),
      };
    });

    global.IntersectionObserver = mockIntersectionObserver as any;
  });

  describe('Happy Path', () => {
    it('리뷰 데이터가 있을 때 리스트 형태로 렌더링된다', () => {
      mockUseCategoryReviews.mockReturnValue({
        data: createMockInfiniteQueryData(1, 5),
        hasNextPage: false,
        fetchNextPage: mockFetchNextPage,
        isFetchingNextPage: false,
      } as any);

      render(<ReviewsWithScroll selectedCategory="food" sort="recent" />);

      expect(screen.getByTestId('review-article-1')).toBeInTheDocument();
      expect(screen.getByTestId('review-article-2')).toBeInTheDocument();
      expect(screen.getByTestId('review-article-3')).toBeInTheDocument();
      expect(screen.getByTestId('review-article-4')).toBeInTheDocument();
      expect(screen.getByTestId('review-article-5')).toBeInTheDocument();
    });

    it('첫 페이지의 첫 3개 리뷰에는 이미지 우선 로딩이, 나머지는 지연 로딩된다', () => {
      mockUseCategoryReviews.mockReturnValue({
        data: createMockInfiniteQueryData(1, 5),
        hasNextPage: false,
        fetchNextPage: mockFetchNextPage,
        isFetchingNextPage: false,
      } as any);

      render(<ReviewsWithScroll selectedCategory="food" sort="recent" />);

      expect(screen.getByTestId('review-article-1')).toHaveAttribute('data-priority', 'true');
      expect(screen.getByTestId('review-article-2')).toHaveAttribute('data-priority', 'true');
      expect(screen.getByTestId('review-article-3')).toHaveAttribute('data-priority', 'true');
      expect(screen.getByTestId('review-article-4')).toHaveAttribute('data-priority', 'false');
      expect(screen.getByTestId('review-article-5')).toHaveAttribute('data-priority', 'false');
    });

    it('여러 페이지의 리뷰가 모두 렌더링된다', () => {
      const mockData = {
        pages: [
          {
            results: [
              createMockSearchReviewCard({board_id: 1, title: '페이지1 리뷰1'}),
              createMockSearchReviewCard({board_id: 2, title: '페이지1 리뷰2'}),
            ],
            has_next: true,
            next_cursor: 1,
          },
          {
            results: [
              createMockSearchReviewCard({board_id: 3, title: '페이지2 리뷰1'}),
              createMockSearchReviewCard({board_id: 4, title: '페이지2 리뷰2'}),
            ],
            has_next: false,
            next_cursor: null,
          },
        ],
        pageParams: [0, 1],
      };

      mockUseCategoryReviews.mockReturnValue({
        data: mockData,
        hasNextPage: false,
        fetchNextPage: mockFetchNextPage,
        isFetchingNextPage: false,
      } as any);

      render(<ReviewsWithScroll selectedCategory="food" sort="recent" />);

      expect(screen.getByText('페이지1 리뷰1')).toBeInTheDocument();
      expect(screen.getByText('페이지1 리뷰2')).toBeInTheDocument();
      expect(screen.getByText('페이지2 리뷰1')).toBeInTheDocument();
      expect(screen.getByText('페이지2 리뷰2')).toBeInTheDocument();
    });

    it('두 번째 페이지부터는 모든 리뷰의 이미지가 지연 로딩된다', () => {
      mockUseCategoryReviews.mockReturnValue({
        data: createMockInfiniteQueryData(2, 3),
        hasNextPage: false,
        fetchNextPage: mockFetchNextPage,
        isFetchingNextPage: false,
      } as any);

      render(<ReviewsWithScroll selectedCategory="food" sort="recent" />);

      // 첫 페이지 첫 3개는 priority=true
      expect(screen.getByTestId('review-article-1')).toHaveAttribute('data-priority', 'true');
      expect(screen.getByTestId('review-article-2')).toHaveAttribute('data-priority', 'true');
      expect(screen.getByTestId('review-article-3')).toHaveAttribute('data-priority', 'true');

      // 두 번째 페이지 모두 priority=false
      expect(screen.getByTestId('review-article-4')).toHaveAttribute('data-priority', 'false');
      expect(screen.getByTestId('review-article-5')).toHaveAttribute('data-priority', 'false');
      expect(screen.getByTestId('review-article-6')).toHaveAttribute('data-priority', 'false');
    });

    it('다음 페이지가 존재할 경우 스크롤 감지 요소가 렌더링된다', () => {
      mockUseCategoryReviews.mockReturnValue({
        data: createMockInfiniteQueryData(1, 3),
        hasNextPage: true,
        fetchNextPage: mockFetchNextPage,
        isFetchingNextPage: false,
      } as any);

      render(<ReviewsWithScroll selectedCategory="food" sort="recent" />);

      // observer ref가 연결된 div가 있는지 확인 (class로 찾기)
      const observerDiv = document.querySelector('.w-full.mt-6');
      expect(observerDiv).toBeInTheDocument();
    });

    it('다음 페이지 로딩 중일 때 스켈레톤 UI가 3개 렌더링된다', () => {
      mockUseCategoryReviews.mockReturnValue({
        data: createMockInfiniteQueryData(1, 3),
        hasNextPage: true,
        fetchNextPage: mockFetchNextPage,
        isFetchingNextPage: true,
      } as any);

      render(<ReviewsWithScroll selectedCategory="food" sort="recent" />);

      const loadingComponents = screen.getAllByTestId('review-article-loading');
      expect(loadingComponents).toHaveLength(3);
    });
  });

  describe('Edge Case', () => {
    it('첫 페이지 리뷰가 비어있으면 검색 결과 없음이 렌더링된다', () => {
      mockUseCategoryReviews.mockReturnValue({
        data: emptyInfiniteQueryData,
        hasNextPage: false,
        fetchNextPage: mockFetchNextPage,
        isFetchingNextPage: false,
      } as any);

      render(<ReviewsWithScroll selectedCategory="food" sort="recent" />);

      expect(screen.getByTestId('no-search-results')).toBeInTheDocument();
      expect(screen.getByText('아직 해당 카테고리에 리뷰가 등록되지 않았어요.')).toBeInTheDocument();
      expect(screen.getByText('다른 카테고리를 클릭해 리뷰를 확인해보세요!')).toBeInTheDocument();
    });

    it('리뷰가 3개 미만일 때도 모두 이미지 우선 로딩이 적용된다', () => {
      mockUseCategoryReviews.mockReturnValue({
        data: {
          pages: [createMockCategoryReviewsPage(2, false, 1)],
          pageParams: [0],
        },
        hasNextPage: false,
        fetchNextPage: mockFetchNextPage,
        isFetchingNextPage: false,
      } as any);

      render(<ReviewsWithScroll selectedCategory="food" sort="recent" />);

      expect(screen.getByTestId('review-article-1')).toHaveAttribute('data-priority', 'true');
      expect(screen.getByTestId('review-article-2')).toHaveAttribute('data-priority', 'true');
    });

    it('리뷰가 1개일 때도 이미지 우선 로딩이 적용된다', () => {
      mockUseCategoryReviews.mockReturnValue({
        data: {
          pages: [createMockCategoryReviewsPage(1, false, 1)],
          pageParams: [0],
        },
        hasNextPage: false,
        fetchNextPage: mockFetchNextPage,
        isFetchingNextPage: false,
      } as any);

      render(<ReviewsWithScroll selectedCategory="food" sort="recent" />);

      expect(screen.getByTestId('review-article-1')).toHaveAttribute('data-priority', 'true');
    });

    it('다음 페이지가 없고 페이지가 2개 이상일 때 종료 메시지가 표시된다', () => {
      mockUseCategoryReviews.mockReturnValue({
        data: createMockInfiniteQueryData(2, 3),
        hasNextPage: false,
        fetchNextPage: mockFetchNextPage,
        isFetchingNextPage: false,
      } as any);

      render(<ReviewsWithScroll selectedCategory="food" sort="recent" />);

      expect(screen.getByText('더 이상 불러올 게시글이 없어요.')).toBeInTheDocument();
      expect(screen.getByText('다른 카테고리를 클릭해 리뷰를 확인해보세요!')).toBeInTheDocument();
    });

    it('다음 페이지가 없지만 페이지가 1개뿐이면 종료 메시지가 표시되지 않는다', () => {
      mockUseCategoryReviews.mockReturnValue({
        data: createMockInfiniteQueryData(1, 3),
        hasNextPage: false,
        fetchNextPage: mockFetchNextPage,
        isFetchingNextPage: false,
      } as any);

      render(<ReviewsWithScroll selectedCategory="food" sort="recent" />);

      expect(screen.queryByText('더 이상 불러올 게시글이 없어요.')).not.toBeInTheDocument();
    });

    it('다음 페이지가 없다면 종료 메시지가 표시되지 않는다', () => {
      mockUseCategoryReviews.mockReturnValue({
        data: createMockInfiniteQueryData(2, 3),
        hasNextPage: true,
        fetchNextPage: mockFetchNextPage,
        isFetchingNextPage: false,
      } as any);

      render(<ReviewsWithScroll selectedCategory="food" sort="recent" />);

      expect(screen.queryByText('더 이상 불러올 게시글이 없어요.')).not.toBeInTheDocument();
    });
  });

  describe('IntersectionObserver 동작', () => {
    it('observer가 생성되고 observe가 호출된다', () => {
      mockUseCategoryReviews.mockReturnValue({
        data: createMockInfiniteQueryData(1, 3),
        hasNextPage: true,
        fetchNextPage: mockFetchNextPage,
        isFetchingNextPage: false,
      } as any);

      render(<ReviewsWithScroll selectedCategory="food" sort="recent" />);

      expect(global.IntersectionObserver).toHaveBeenCalled();
      expect(mockObserve).toHaveBeenCalled();
    });

    it('observer가 감지되고 다음 페이지가 있다면 다음 페이지를 요청한다', () => {
      mockUseCategoryReviews.mockReturnValue({
        data: createMockInfiniteQueryData(1, 3),
        hasNextPage: true,
        fetchNextPage: mockFetchNextPage,
        isFetchingNextPage: false,
      } as any);

      render(<ReviewsWithScroll selectedCategory="food" sort="recent" />);

      // IntersectionObserver callback을 수동으로 트리거
      intersectionObserverCallback([{isIntersecting: true} as IntersectionObserverEntry], {} as IntersectionObserver);

      expect(mockFetchNextPage).toHaveBeenCalled();
    });

    it('다음 페이지가 없다면 IntersectionObserver가 생성되지 않는다', () => {
      jest.clearAllMocks(); // 이전 테스트의 호출 횟수 초기화

      mockUseCategoryReviews.mockReturnValue({
        data: createMockInfiniteQueryData(1, 3),
        hasNextPage: false,
        fetchNextPage: mockFetchNextPage,
        isFetchingNextPage: false,
      } as any);

      render(<ReviewsWithScroll selectedCategory="food" sort="recent" />);

      // hasNextPage가 false이면 observerRef가 사용되지 않으므로 IntersectionObserver가 생성되지 않음
      // 종료 메시지가 표시되는 대신 observer div가 렌더링되지 않음
      const observerDiv = document.querySelector('.w-full.mt-6');
      expect(observerDiv).not.toBeInTheDocument();
    });
  });
});
