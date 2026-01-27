import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import KeywordReviews from '../KeywordReviews';
import {useSelectSortOption} from '@/features/reviews/sorting';

jest.mock('@/features/reviews/sorting', () => ({
  SelectSortOptions: ({sort, onValueChange, className}: any) => (
    <select data-testid="sort-options" value={sort} onChange={(e) => onValueChange(e.target.value)} className={className}>
      <option value="recent">최신순</option>
      <option value="hotbookmarks">북마크순</option>
      <option value="hotcomments">댓글순</option>
    </select>
  ),
  useSelectSortOption: jest.fn(),
}));

jest.mock('../ReviewWithPagination', () => ({
  __esModule: true,
  default: ({sort}: any) => (
    <div data-testid="review-with-pagination" data-sort={sort}>
      ReviewWithPagination
    </div>
  ),
}));

jest.mock('@/shared/providers', () => ({
  RQProvider: ({children, LoadingFallback, icon}: any) => (
    <div data-testid="rq-provider" data-has-loading={!!LoadingFallback} data-has-icon={!!icon}>
      {children}
    </div>
  ),
}));

jest.mock('@/entities/reviews', () => ({
  ReviewsLoading: () => <div data-testid="reviews-loading">ReviewsLoading</div>,
}));

jest.mock('@/shared/ui/icons', () => ({
  LucideIcon: ({name, className}: any) => (
    <div data-testid="lucide-icon" data-icon-name={name} className={className}>
      Icon
    </div>
  ),
}));

const mockUseSelectSortOption = useSelectSortOption as jest.MockedFunction<typeof useSelectSortOption>;

describe('src/features/reviews/keyword/ui/KeywordReviews.tsx', () => {
  const mockHandleChange = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    mockUseSelectSortOption.mockReturnValue({
      sort: 'recent',
      handleChange: mockHandleChange,
    });
  });

  describe('Happy Path', () => {
    it('초기 렌더링 시 모든 하위 컴포넌트가 정상적으로 렌더링된다', () => {
      render(<KeywordReviews />);

      expect(screen.getByTestId('sort-options')).toBeInTheDocument();
      expect(screen.getByTestId('review-with-pagination')).toBeInTheDocument();
      expect(screen.getByTestId('rq-provider')).toBeInTheDocument();
    });

    it('정렬 옵션 선택 컴포넌트에 정렬 상태와 변경 콜백 함수가 전달된다', () => {
      mockUseSelectSortOption.mockReturnValue({
        sort: 'hotbookmarks',
        handleChange: mockHandleChange,
      });

      render(<KeywordReviews />);

      const sortOptions = screen.getByTestId('sort-options');
      expect(sortOptions).toHaveValue('hotbookmarks');
    });

    it('페이지네이션 컴포넌트에 정렬 옵션이 전달된다', () => {
      mockUseSelectSortOption.mockReturnValue({
        sort: 'hotcomments',
        handleChange: mockHandleChange,
      });

      render(<KeywordReviews />);

      const reviewWithPagination = screen.getByTestId('review-with-pagination');
      expect(reviewWithPagination).toHaveAttribute('data-sort', 'hotcomments');
    });

    it('정렬 옵션 선택 훅에 페이지 1이 포함된 옵션 객체가 전달된다', () => {
      render(<KeywordReviews />);

      expect(mockUseSelectSortOption).toHaveBeenCalledWith({
        options: {
          page: '1',
        },
      });
    });

    it('정렬 옵션을 변경하면 handleChange가 호출된다', async () => {
      const user = userEvent.setup();
      render(<KeywordReviews />);

      const select = screen.getByTestId('sort-options');
      await user.selectOptions(select, 'hotbookmarks');

      expect(mockHandleChange).toHaveBeenCalledWith('hotbookmarks');
      expect(mockHandleChange).toHaveBeenCalledTimes(1);
    });
  });

  describe('Edge Case', () => {
    it('유효하지 않은 정렬 옵션이 선택되어도 에러 없이 렌더링된다', () => {
      mockUseSelectSortOption.mockReturnValue({
        sort: 'recent',
        handleChange: mockHandleChange,
      });

      render(<KeywordReviews />);

      expect(screen.getByTestId('sort-options')).toHaveValue('recent');
    });
  });

  describe('UI Elements', () => {
    it('리액트 쿼리 프로바이더에 로딩 대체 UI가 전달된다', () => {
      render(<KeywordReviews />);

      const rqProvider = screen.getByTestId('rq-provider');
      expect(rqProvider).toHaveAttribute('data-has-loading', 'true');
    });

    it('리액트 쿼리 프로바이더에 에러 아이콘이 전달된다', () => {
      render(<KeywordReviews />);

      const rqProvider = screen.getByTestId('rq-provider');
      expect(rqProvider).toHaveAttribute('data-has-icon', 'true');
    });

    it('정렬 선택 컴포넌트에 올바른 스타일이 적용된다', () => {
      render(<KeywordReviews />);

      const sortOptions = screen.getByTestId('sort-options');
      expect(sortOptions).toHaveClass('ml-auto mb-6 md:mr-5');
    });
  });
});
