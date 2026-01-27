import {render, screen} from '@testing-library/react';
import CategoryReviews from '../CategoryReviews';
import {useSelectCategoryFromUrl} from '@/features/reviews/filtering';
import {useSelectSortOption} from '@/features/reviews/sorting';

jest.mock('@/features/reviews/filtering', () => ({
  CategoryBar: ({selectedCategory, onSelectCategory}: any) => (
    <div data-testid="category-bar" data-category={selectedCategory}>
      <button onClick={() => onSelectCategory('food')}>음식</button>
    </div>
  ),
  useSelectCategoryFromUrl: jest.fn(),
}));

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

jest.mock('@/features/reviews/search-bar', () => ({
  SearchBar: () => <div data-testid="search-bar">SearchBar</div>,
}));

jest.mock('../ReviewWithScroll', () => ({
  __esModule: true,
  default: ({selectedCategory, sort}: any) => (
    <div data-testid="reviews-with-scroll" data-category={selectedCategory} data-sort={sort}>
      ReviewsWithScroll
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

const mockUseSelectCategoryFromUrl = useSelectCategoryFromUrl as jest.MockedFunction<typeof useSelectCategoryFromUrl>;
const mockUseSelectSortOption = useSelectSortOption as jest.MockedFunction<typeof useSelectSortOption>;

describe('src/features/reviews/category/ui/CategoryReviews.tsx', () => {
  const mockHandleSelectCategory = jest.fn();
  const mockHandleChange = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    mockUseSelectCategoryFromUrl.mockReturnValue({
      selectedCategory: 'all',
      handleSelectCategory: mockHandleSelectCategory,
    });

    mockUseSelectSortOption.mockReturnValue({
      sort: 'recent',
      handleChange: mockHandleChange,
    });
  });

  describe('Happy Path', () => {
    it('초기 렌더링 시 모든 하위 컴포넌트가 정상적으로 렌더링된다', () => {
      render(<CategoryReviews />);

      expect(screen.getByTestId('category-bar')).toBeInTheDocument();
      expect(screen.getByTestId('search-bar')).toBeInTheDocument();
      expect(screen.getByTestId('sort-options')).toBeInTheDocument();
      expect(screen.getByTestId('reviews-with-scroll')).toBeInTheDocument();
    });

    it('카테고리 바 컴포넌트에 선택된 카테고리와 변경 콜백 함수가 전달된다', () => {
      mockUseSelectCategoryFromUrl.mockReturnValue({
        selectedCategory: 'food',
        handleSelectCategory: mockHandleSelectCategory,
      });

      render(<CategoryReviews />);

      const categoryBar = screen.getByTestId('category-bar');
      expect(categoryBar).toHaveAttribute('data-category', 'food');
    });

    it('정렬 옵션 선택 컴포넌트에 정렬 상태와 변경 콜백 함수가 전달된다', () => {
      mockUseSelectSortOption.mockReturnValue({
        sort: 'hotbookmarks',
        handleChange: mockHandleChange,
      });

      render(<CategoryReviews />);

      const sortOptions = screen.getByTestId('sort-options');
      expect(sortOptions).toHaveValue('hotbookmarks');
    });

    it('무한스크롤 컴포넌트에 선택된 카테고리와 정렬 옵션이 전달된다', () => {
      mockUseSelectCategoryFromUrl.mockReturnValue({
        selectedCategory: 'car',
        handleSelectCategory: mockHandleSelectCategory,
      });

      mockUseSelectSortOption.mockReturnValue({
        sort: 'hotcomments',
        handleChange: mockHandleChange,
      });

      render(<CategoryReviews />);

      const reviewsWithScroll = screen.getByTestId('reviews-with-scroll');
      expect(reviewsWithScroll).toHaveAttribute('data-category', 'car');
      expect(reviewsWithScroll).toHaveAttribute('data-sort', 'hotcomments');
    });

    it('정렬 옵션 선택 훅에 카테고리 아이디가 포함된 옵션 객체가 전달된다', () => {
      mockUseSelectCategoryFromUrl.mockReturnValue({
        selectedCategory: 'cosmetic',
        handleSelectCategory: mockHandleSelectCategory,
      });

      render(<CategoryReviews />);

      expect(mockUseSelectSortOption).toHaveBeenCalledWith({
        options: {
          categoryId: 'cosmetic',
        },
      });
    });
  });

  describe('Edge Case', () => {
    it('유효하지 않은 카테고리가 선택되어도 에러 없이 렌더링된다', () => {
      mockUseSelectCategoryFromUrl.mockReturnValue({
        selectedCategory: 'all',
        handleSelectCategory: mockHandleSelectCategory,
      });

      render(<CategoryReviews />);

      expect(screen.getByTestId('category-bar')).toBeInTheDocument();
      expect(screen.getByTestId('reviews-with-scroll')).toBeInTheDocument();
    });

    it('유효하지 않은 정렬 옵션이 선택되어도 에러 없이 렌더링된다', () => {
      mockUseSelectSortOption.mockReturnValue({
        sort: 'recent',
        handleChange: mockHandleChange,
      });

      render(<CategoryReviews />);

      expect(screen.getByTestId('sort-options')).toHaveValue('recent');
    });
  });

  describe('UI Elements', () => {
    it('리액트 쿼리 프로바이더에 로딩 대체 UI가 전달된다', () => {
      render(<CategoryReviews />);

      const rqProvider = screen.getByTestId('rq-provider');
      expect(rqProvider).toHaveAttribute('data-has-loading', 'true');
    });

    it('리액트 쿼리 프로바이더에 아이콘이 전달된다', () => {
      render(<CategoryReviews />);

      const rqProvider = screen.getByTestId('rq-provider');
      expect(rqProvider).toHaveAttribute('data-has-icon', 'true');
    });
  });
});
