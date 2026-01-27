import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SelectSortOptions from '../SelectSortOptions';
import {SORT_MAP, SORT_OPTIONS} from '../../const/sortOptions';

jest.mock('@/shared/shadcnComponent/ui/select', () => ({
  Select: ({children, value, onValueChange}: any) => (
    <div data-testid="select-wrapper" data-value={value}>
      <button onClick={() => onValueChange('hotbookmarks')} data-testid="mock-select-button">
        {children}
      </button>
    </div>
  ),
  SelectTrigger: ({children, className}: any) => (
    <div data-testid="select-trigger" className={className}>
      {children}
    </div>
  ),
  SelectValue: ({children, 'aria-label': ariaLabel}: any) => (
    <div data-testid="select-value" aria-label={ariaLabel}>
      {children}
    </div>
  ),
  SelectContent: ({children}: any) => <div data-testid="select-content">{children}</div>,
  SelectItem: ({children, value}: any) => <div data-testid={`select-item-${value}`}>{children}</div>,
}));

jest.mock('@/shared/lib/utils/cn', () => ({
  cn: (...classes: any[]) => classes.filter(Boolean).join(' '),
}));

describe('features/reviews/sorting/ui/SelectSortOptions', () => {
  const mockOnValueChange = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('정상 케이스', () => {
    it('선택된 정렬 값이 올바르게 표시된다', () => {
      render(<SelectSortOptions sort="recent" onValueChange={mockOnValueChange} />);

      const selectValue = screen.getByTestId('select-value');
      expect(selectValue).toHaveTextContent('최신순');
    });

    it('모든 정렬 옵션이 렌더링된다', () => {
      render(<SelectSortOptions sort="recent" onValueChange={mockOnValueChange} />);

      SORT_OPTIONS.forEach(({value}) => {
        expect(screen.getByTestId(`select-item-${value}`)).toBeInTheDocument();
      });
    });

    it('정렬 옵션을 선택하면 핸들러가 호출된다', async () => {
      const user = userEvent.setup();
      render(<SelectSortOptions sort="recent" onValueChange={mockOnValueChange} />);

      const button = screen.getByTestId('mock-select-button');
      await user.click(button);

      expect(mockOnValueChange).toHaveBeenCalledWith('hotbookmarks');
      expect(mockOnValueChange).toHaveBeenCalledTimes(1);
    });

    it('커스텀 스타일이 트리거에 적용된다', () => {
      render(<SelectSortOptions sort="recent" onValueChange={mockOnValueChange} className="custom-class" />);

      const trigger = screen.getByTestId('select-trigger');
      expect(trigger).toHaveClass('w-[120px]');
      expect(trigger).toHaveClass('custom-class');
    });

    it('다양한 정렬 값에 대해 올바른 라벨이 표시된다', () => {
      const {rerender} = render(<SelectSortOptions sort="recent" onValueChange={mockOnValueChange} />);
      expect(screen.getByTestId('select-value')).toHaveTextContent(SORT_MAP.recent);

      rerender(<SelectSortOptions sort="hotbookmarks" onValueChange={mockOnValueChange} />);
      expect(screen.getByTestId('select-value')).toHaveTextContent(SORT_MAP.hotbookmarks);

      rerender(<SelectSortOptions sort="hotcomments" onValueChange={mockOnValueChange} />);
      expect(screen.getByTestId('select-value')).toHaveTextContent(SORT_MAP.hotcomments);
    });

    it('ARIA 라벨이 올바르게 설정된다', () => {
      render(<SelectSortOptions sort="hotbookmarks" onValueChange={mockOnValueChange} />);

      const selectValue = screen.getByTestId('select-value');
      expect(selectValue).toHaveAttribute('aria-label', SORT_MAP.hotbookmarks);
    });
  });

  describe('엣지/예외 케이스', () => {
    it('스타일 적용 없이 렌더링해도 정상 동작한다', () => {
      render(<SelectSortOptions sort="recent" onValueChange={mockOnValueChange} />);

      const trigger = screen.getByTestId('select-trigger');
      expect(trigger).toHaveClass('w-[120px]');
    });
  });
});
