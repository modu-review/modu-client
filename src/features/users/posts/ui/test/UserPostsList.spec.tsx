import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import UserPostsList from '../UserPostsList';
import {useGetPostsByUser} from '@/entities/users';
import {useSelectSortOption} from '@/features/reviews/sorting';
import {createMockInfiniteQueryData, emptyInfiniteQueryData, createMockPostsByUserPage} from './stub';

jest.mock('@/entities/users', () => ({
  useGetPostsByUser: jest.fn(),
  UserPost: ({userReview, priority}: any) => (
    <div data-testid={`user-post-${userReview.board_id}`} data-priority={priority}>
      {userReview.title}
    </div>
  ),
}));

jest.mock('@/entities/users/ui/UserPostLoading', () => ({
  __esModule: true,
  default: () => <div data-testid="user-post-loading">Loading...</div>,
}));

jest.mock('@/features/reviews/sorting', () => ({
  useSelectSortOption: jest.fn(),
  SelectSortOptions: ({sort, onValueChange, className}: any) => (
    <div data-testid="select-sort-options" className={className}>
      <button onClick={() => onValueChange('hotbookmarks')}>정렬변경</button>
    </div>
  ),
  SortButtons: ({sort, onValueChange, className}: any) => (
    <div data-testid="sort-buttons" className={className}>
      <button onClick={() => onValueChange('hotbookmarks')}>정렬변경</button>
    </div>
  ),
}));

jest.mock('@/entities/reviews', () => ({
  NoSearchResults: ({title, description}: any) => (
    <div data-testid="no-search-results">
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  ),
}));

const mockUseGetPostsByUser = useGetPostsByUser as jest.MockedFunction<typeof useGetPostsByUser>;
const mockUseSelectSortOption = useSelectSortOption as jest.MockedFunction<typeof useSelectSortOption>;

describe('features/users/posts/ui/UserPostsList', () => {
  const mockFetchNextPage = jest.fn();
  const mockHandleChange = jest.fn();
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

    mockUseSelectSortOption.mockReturnValue({
      sort: 'recent',
      handleChange: mockHandleChange,
    });

    mockUseGetPostsByUser.mockReturnValue({
      data: createMockInfiniteQueryData(1, 3, 10),
      hasNextPage: false,
      fetchNextPage: mockFetchNextPage,
      isFetchingNextPage: false,
    } as any);
  });

  describe('정상 케이스', () => {
    it('게시글 데이터가 있을 때 정상적으로 렌더링된다', () => {
      mockUseGetPostsByUser.mockReturnValue({
        data: createMockInfiniteQueryData(1, 5, 10),
        hasNextPage: false,
        fetchNextPage: mockFetchNextPage,
        isFetchingNextPage: false,
      } as any);

      render(<UserPostsList userNickname="testUser" />);

      expect(screen.getByTestId('user-post-1')).toBeInTheDocument();
      expect(screen.getByTestId('user-post-2')).toBeInTheDocument();
      expect(screen.getByTestId('user-post-3')).toBeInTheDocument();
      expect(screen.getByTestId('user-post-4')).toBeInTheDocument();
      expect(screen.getByTestId('user-post-5')).toBeInTheDocument();

      expect(screen.getByText('작성된 게시글 수')).toBeInTheDocument();
      expect(screen.getByText('(10)')).toBeInTheDocument();
    });

    it('첫 페이지의 첫 3개 게시글에는 이미지 우선 로딩이, 나머지는 지연 로딩된다', () => {
      mockUseGetPostsByUser.mockReturnValue({
        data: createMockInfiniteQueryData(1, 5, 10),
        hasNextPage: false,
        fetchNextPage: mockFetchNextPage,
        isFetchingNextPage: false,
      } as any);

      render(<UserPostsList userNickname="testUser" />);

      expect(screen.getByTestId('user-post-1')).toHaveAttribute('data-priority', 'true');
      expect(screen.getByTestId('user-post-2')).toHaveAttribute('data-priority', 'true');
      expect(screen.getByTestId('user-post-3')).toHaveAttribute('data-priority', 'true');
      expect(screen.getByTestId('user-post-4')).toHaveAttribute('data-priority', 'false');
      expect(screen.getByTestId('user-post-5')).toHaveAttribute('data-priority', 'false');
    });

    it('두 번째 페이지부터는 모든 게시글의 이미지가 지연 로딩된다', () => {
      mockUseGetPostsByUser.mockReturnValue({
        data: createMockInfiniteQueryData(2, 3, 10),
        hasNextPage: false,
        fetchNextPage: mockFetchNextPage,
        isFetchingNextPage: false,
      } as any);

      render(<UserPostsList userNickname="testUser" />);

      expect(screen.getByTestId('user-post-1')).toHaveAttribute('data-priority', 'true');
      expect(screen.getByTestId('user-post-2')).toHaveAttribute('data-priority', 'true');
      expect(screen.getByTestId('user-post-3')).toHaveAttribute('data-priority', 'true');

      expect(screen.getByTestId('user-post-4')).toHaveAttribute('data-priority', 'false');
      expect(screen.getByTestId('user-post-5')).toHaveAttribute('data-priority', 'false');
      expect(screen.getByTestId('user-post-6')).toHaveAttribute('data-priority', 'false');
    });

    it('여러 페이지의 게시글이 모두 렌더링된다', () => {
      mockUseGetPostsByUser.mockReturnValue({
        data: createMockInfiniteQueryData(2, 2, 10),
        hasNextPage: false,
        fetchNextPage: mockFetchNextPage,
        isFetchingNextPage: false,
      } as any);

      render(<UserPostsList userNickname="testUser" />);

      expect(screen.getByText('게시글 1')).toBeInTheDocument();
      expect(screen.getByText('게시글 2')).toBeInTheDocument();
      expect(screen.getByText('게시글 3')).toBeInTheDocument();
      expect(screen.getByText('게시글 4')).toBeInTheDocument();
    });

    it('다음 페이지가 존재할 경우 스크롤 감지 요소가 렌더링된다', () => {
      mockUseGetPostsByUser.mockReturnValue({
        data: createMockInfiniteQueryData(1, 3, 10),
        hasNextPage: true,
        fetchNextPage: mockFetchNextPage,
        isFetchingNextPage: false,
      } as any);

      render(<UserPostsList userNickname="testUser" />);

      const observerDiv = document.querySelector('.w-full.mt-6');
      expect(observerDiv).toBeInTheDocument();
    });

    it('다음 페이지 로딩 중일 때 스켈레톤 UI가 3개 렌더링된다', () => {
      mockUseGetPostsByUser.mockReturnValue({
        data: createMockInfiniteQueryData(1, 3, 10),
        hasNextPage: true,
        fetchNextPage: mockFetchNextPage,
        isFetchingNextPage: true,
      } as any);

      render(<UserPostsList userNickname="testUser" />);

      const loadingComponents = screen.getAllByTestId('user-post-loading');
      expect(loadingComponents).toHaveLength(3);
    });

    it('정렬 옵션을 변경하면 핸들러가 호출된다', async () => {
      const user = userEvent.setup();

      render(<UserPostsList userNickname="testUser" />);

      const sortButton = screen.getByTestId('select-sort-options').querySelector('button');
      await user.click(sortButton!);

      expect(mockHandleChange).toHaveBeenCalledWith('hotbookmarks');
    });

    it('모바일에서는 SelectSortOptions가, 데스크톱에서는 SortButtons가 렌더링된다', () => {
      render(<UserPostsList userNickname="testUser" />);

      const selectSortOptions = screen.getByTestId('select-sort-options');
      const sortButtons = screen.getByTestId('sort-buttons');

      // SelectSortOptions의 부모 div에 "block md:hidden" 클래스가 있음
      expect(selectSortOptions.parentElement).toHaveClass('block', 'md:hidden');
      // SortButtons 자체에 "hidden md:flex" 클래스가 있음
      expect(sortButtons).toHaveClass('hidden', 'md:flex');
    });
  });

  describe('엣지/예외 케이스', () => {
    it('첫 페이지 게시글이 비어있으면 검색 결과 없음이 렌더링된다', () => {
      mockUseGetPostsByUser.mockReturnValue({
        data: emptyInfiniteQueryData,
        hasNextPage: false,
        fetchNextPage: mockFetchNextPage,
        isFetchingNextPage: false,
      } as any);

      render(<UserPostsList userNickname="testUser" />);

      expect(screen.getByTestId('no-search-results')).toBeInTheDocument();
      expect(screen.getByText('아직 testUser님의 게시글이 등록되지 않았어요.')).toBeInTheDocument();
      expect(screen.getByText('다른 사용자들의 게시글을 클릭해 리뷰를 확인해보세요!')).toBeInTheDocument();
    });

    it('다음 페이지가 없고 페이지가 2개 이상일 때 종료 메시지가 표시된다', () => {
      mockUseGetPostsByUser.mockReturnValue({
        data: createMockInfiniteQueryData(2, 3, 10),
        hasNextPage: false,
        fetchNextPage: mockFetchNextPage,
        isFetchingNextPage: false,
      } as any);

      render(<UserPostsList userNickname="testUser" />);

      expect(screen.getByText('- 끝 -')).toBeInTheDocument();
      expect(screen.getByText('더 이상 불러올 게시글이 없어요.')).toBeInTheDocument();
    });

    it('다음 페이지가 없지만 페이지가 1개뿐이면 종료 메시지가 표시되지 않는다', () => {
      mockUseGetPostsByUser.mockReturnValue({
        data: createMockInfiniteQueryData(1, 3, 10),
        hasNextPage: false,
        fetchNextPage: mockFetchNextPage,
        isFetchingNextPage: false,
      } as any);

      render(<UserPostsList userNickname="testUser" />);

      expect(screen.queryByText('더 이상 불러올 게시글이 없어요.')).not.toBeInTheDocument();
    });

    it('다음 페이지가 있다면 종료 메시지가 표시되지 않는다', () => {
      mockUseGetPostsByUser.mockReturnValue({
        data: createMockInfiniteQueryData(2, 3, 10),
        hasNextPage: true,
        fetchNextPage: mockFetchNextPage,
        isFetchingNextPage: false,
      } as any);

      render(<UserPostsList userNickname="testUser" />);

      expect(screen.queryByText('더 이상 불러올 게시글이 없어요.')).not.toBeInTheDocument();
    });
  });

  describe('IntersectionObserver 동작', () => {
    it('observer가 생성되고 observe가 호출된다', () => {
      mockUseGetPostsByUser.mockReturnValue({
        data: createMockInfiniteQueryData(1, 3, 10),
        hasNextPage: true,
        fetchNextPage: mockFetchNextPage,
        isFetchingNextPage: false,
      } as any);

      render(<UserPostsList userNickname="testUser" />);

      expect(global.IntersectionObserver).toHaveBeenCalled();
      expect(mockObserve).toHaveBeenCalled();
    });

    it('observer가 감지되고 다음 페이지가 있다면 다음 페이지를 요청한다', () => {
      mockUseGetPostsByUser.mockReturnValue({
        data: createMockInfiniteQueryData(1, 3, 10),
        hasNextPage: true,
        fetchNextPage: mockFetchNextPage,
        isFetchingNextPage: false,
      } as any);

      render(<UserPostsList userNickname="testUser" />);

      intersectionObserverCallback([{isIntersecting: true} as IntersectionObserverEntry], {} as IntersectionObserver);

      expect(mockFetchNextPage).toHaveBeenCalled();
    });

    it('다음 페이지가 없다면 IntersectionObserver가 생성되지 않는다', () => {
      jest.clearAllMocks();

      mockUseGetPostsByUser.mockReturnValue({
        data: createMockInfiniteQueryData(1, 3, 10),
        hasNextPage: false,
        fetchNextPage: mockFetchNextPage,
        isFetchingNextPage: false,
      } as any);

      render(<UserPostsList userNickname="testUser" />);

      const observerDiv = document.querySelector('.w-full.mt-6');
      expect(observerDiv).not.toBeInTheDocument();
    });

    it('컴포넌트 언마운트 시 observer cleanup이 실행된다', () => {
      mockUseGetPostsByUser.mockReturnValue({
        data: createMockInfiniteQueryData(1, 3, 10),
        hasNextPage: true,
        fetchNextPage: mockFetchNextPage,
        isFetchingNextPage: false,
      } as any);

      const {unmount} = render(<UserPostsList userNickname="testUser" />);

      unmount();

      expect(mockDisconnect).toHaveBeenCalled();
    });
  });
});
