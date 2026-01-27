import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CategoryBar from '../CategoryBar';
import {CATEGORY_LIST} from '@/entities/review';

jest.mock('@/shared/shadcnComponent/ui/button', () => ({
  Button: ({children, onClick, variant, 'aria-pressed': ariaPressed, 'aria-label': ariaLabel, ...props}: any) => (
    <button
      onClick={onClick}
      data-variant={variant}
      aria-pressed={ariaPressed}
      aria-label={ariaLabel}
      {...props}
    >
      {children}
    </button>
  ),
}));

jest.mock('@/shared/ui/icons', () => ({
  LucideIcon: ({name, className}: any) => <div data-testid={`icon-${name}`} className={className} />,
}));

describe('features/reviews/filtering/ui/CategoryBar', () => {
  const mockOnSelectCategory = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('정상 케이스', () => {
    it('모든 카테고리 버튼이 렌더링된다', () => {
      render(<CategoryBar selectedCategory="all" onSelectCategory={mockOnSelectCategory} />);

      CATEGORY_LIST.forEach(({label}) => {
        expect(screen.getByText(label)).toBeInTheDocument();
      });
    });

    it('카테고리 버튼을 클릭하면 선택 핸들러가 호출된다', async () => {
      const user = userEvent.setup();
      render(<CategoryBar selectedCategory="all" onSelectCategory={mockOnSelectCategory} />);

      const foodButton = screen.getByText('음식');
      await user.click(foodButton);

      expect(mockOnSelectCategory).toHaveBeenCalledWith('food');
      expect(mockOnSelectCategory).toHaveBeenCalledTimes(1);
    });

    it('여러 카테고리를 클릭해도 정상적으로 동작한다', async () => {
      const user = userEvent.setup();
      render(<CategoryBar selectedCategory="all" onSelectCategory={mockOnSelectCategory} />);

      await user.click(screen.getByText('음식'));
      expect(mockOnSelectCategory).toHaveBeenCalledWith('food');

      await user.click(screen.getByText('자동차'));
      expect(mockOnSelectCategory).toHaveBeenCalledWith('car');

      await user.click(screen.getByText('화장품'));
      expect(mockOnSelectCategory).toHaveBeenCalledWith('cosmetic');

      expect(mockOnSelectCategory).toHaveBeenCalledTimes(3);
    });

    it('우측 화살표 아이콘이 렌더링된다', () => {
      render(<CategoryBar selectedCategory="all" onSelectCategory={mockOnSelectCategory} />);

      expect(screen.getByTestId('icon-ChevronRight')).toBeInTheDocument();
    });
  });

  describe('엣지/예외 케이스', () => {
    it('선택된 카테고리는 활성 스타일이 적용된다', () => {
      render(<CategoryBar selectedCategory="food" onSelectCategory={mockOnSelectCategory} />);

      const foodButton = screen.getByText('음식');
      expect(foodButton).toHaveAttribute('data-variant', 'activeCategory');
    });

    it('선택되지 않은 카테고리는 비활성 스타일이 적용된다', () => {
      render(<CategoryBar selectedCategory="food" onSelectCategory={mockOnSelectCategory} />);

      const allButton = screen.getByText('전체');
      const carButton = screen.getByText('자동차');

      expect(allButton).toHaveAttribute('data-variant', 'inActiveCategory');
      expect(carButton).toHaveAttribute('data-variant', 'inActiveCategory');
    });

    it('선택된 카테고리 버튼에는 눌림 상태가 표시된다', () => {
      render(<CategoryBar selectedCategory="car" onSelectCategory={mockOnSelectCategory} />);

      const carButton = screen.getByText('자동차');
      expect(carButton).toHaveAttribute('aria-pressed', 'true');
    });

    it('선택되지 않은 카테고리 버튼에는 눌림 상태가 해제된다', () => {
      render(<CategoryBar selectedCategory="car" onSelectCategory={mockOnSelectCategory} />);

      const allButton = screen.getByText('전체');
      expect(allButton).toHaveAttribute('aria-pressed', 'false');
    });

    it('모든 카테고리 버튼에 접근성 레이블이 포함된다', () => {
      render(<CategoryBar selectedCategory="all" onSelectCategory={mockOnSelectCategory} />);

      CATEGORY_LIST.forEach(({label}) => {
        const button = screen.getByLabelText(`카테고리: ${label}`);
        expect(button).toBeInTheDocument();
      });
    });

    it('동일한 카테고리를 다시 클릭해도 핸들러가 호출된다', async () => {
      const user = userEvent.setup();
      render(<CategoryBar selectedCategory="food" onSelectCategory={mockOnSelectCategory} />);

      const foodButton = screen.getByText('음식');
      await user.click(foodButton);

      expect(mockOnSelectCategory).toHaveBeenCalledWith('food');
    });
  });
});
