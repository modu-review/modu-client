import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import MyReviewCard from '../MyReviewCard';
import {useDeleteReviewFromMyPage} from '@/entities/review';
import {CardDescription} from '@/entities/reviews';
import {LucideIcon} from '@/shared/ui/icons';
import {LoadingSpinner} from '@/shared/ui/components';
import {ConfirmDeleteTrigger} from '@/shared/ui/modal';
import {createMockReviewCard} from './stub';

jest.mock('@/entities/review');
jest.mock('@/entities/reviews');
jest.mock('@/shared/ui/icons');
jest.mock('@/shared/ui/components');
jest.mock('@/shared/ui/modal');

const mockUseDeleteReviewFromMyPage = useDeleteReviewFromMyPage as jest.MockedFunction<
  typeof useDeleteReviewFromMyPage
>;
const mockDeleteReview = jest.fn();

const MockCardDescription = CardDescription as jest.MockedFunction<typeof CardDescription>;
const MockLucideIcon = LucideIcon as jest.MockedFunction<typeof LucideIcon>;
const MockLoadingSpinner = LoadingSpinner as jest.MockedFunction<typeof LoadingSpinner>;
const MockConfirmDeleteTrigger = ConfirmDeleteTrigger as jest.MockedFunction<typeof ConfirmDeleteTrigger>;

describe('features/reviews/my/ui/MyReviewCard', () => {
  const defaultCard = createMockReviewCard();

  beforeEach(() => {
    jest.clearAllMocks();

    const modalRoot = document.createElement('div');
    modalRoot.id = 'modal-root';
    document.body.appendChild(modalRoot);

    mockUseDeleteReviewFromMyPage.mockReturnValue({
      deleteReview: mockDeleteReview,
      isPending: false,
    } as unknown as ReturnType<typeof useDeleteReviewFromMyPage>);

    MockCardDescription.mockImplementation(({card, priority}) => (
      <div data-testid="card-description" data-priority={priority}>
        {card.title}
      </div>
    ));

    MockLucideIcon.mockImplementation(({name}) => <div data-testid={`icon-${name}`} />);

    MockLoadingSpinner.mockImplementation(({text}) => <div data-testid="loading-spinner">{text}</div>);

    MockConfirmDeleteTrigger.mockImplementation(({children, onConfirm, isPending}) => {
      const props = {
        onClick: onConfirm,
        disabled: isPending!,
        'aria-label': '리뷰 삭제',
        'aria-disabled': isPending!,
        tabIndex: -1,
      };
      return <div data-testid="confirm-delete-trigger">{children(props)}</div>;
    });
  });

  afterEach(() => {
    const modalRoot = document.getElementById('modal-root');
    if (modalRoot) {
      document.body.removeChild(modalRoot);
    }
  });

  describe('정상 케이스', () => {
    it('리뷰 카드가 정상적으로 렌더링된다', () => {
      render(<MyReviewCard card={defaultCard} isAuthor={true} context="my" priority={false} />);

      expect(screen.getByTestId('card-description')).toBeInTheDocument();
    });

    it('카드 내용이 상세 컴포넌트에 올바르게 전달된다', () => {
      render(<MyReviewCard card={defaultCard} isAuthor={false} context="my" priority={true} />);

      const cardDescription = screen.getByTestId('card-description');
      expect(cardDescription).toHaveTextContent(defaultCard.title);
      expect(cardDescription).toHaveAttribute('data-priority', 'true');
    });

    it('리뷰 상세 페이지로의 링크가 올바르게 설정된다', () => {
      render(<MyReviewCard card={defaultCard} isAuthor={false} context="my" priority={false} />);

      const link = screen.getByRole('link', {name: defaultCard.title});
      expect(link).toHaveAttribute('href', `/reviews/${defaultCard.board_id}`);
    });

    it('이미지 중요도가 상세 컴포넌트에 전달된다', () => {
      render(<MyReviewCard card={defaultCard} isAuthor={false} context="my" priority={true} />);

      const cardDescription = screen.getByTestId('card-description');
      expect(cardDescription).toHaveAttribute('data-priority', 'true');
    });
  });

  describe('작성자 권한', () => {
    it('작성자인 경우 수정 버튼이 표시된다', () => {
      render(<MyReviewCard card={defaultCard} isAuthor={true} context="my" priority={false} />);

      expect(screen.getByTestId('icon-PencilLine')).toBeInTheDocument();
    });

    it('작성자인 경우 삭제 버튼이 표시된다', () => {
      render(<MyReviewCard card={defaultCard} isAuthor={true} context="my" priority={false} />);

      expect(screen.getByTestId('confirm-delete-trigger')).toBeInTheDocument();
    });

    it('작성자가 아닌 경우 수정 버튼이 표시되지 않는다', () => {
      render(<MyReviewCard card={defaultCard} isAuthor={false} context="my" priority={false} />);

      expect(screen.queryByTestId('icon-PencilLine')).not.toBeInTheDocument();
    });

    it('작성자가 아닌 경우 삭제 버튼이 표시되지 않는다', () => {
      render(<MyReviewCard card={defaultCard} isAuthor={false} context="my" priority={false} />);

      expect(screen.queryByTestId('confirm-delete-trigger')).not.toBeInTheDocument();
    });

    it('수정 버튼이 수정 페이지로 이동하는 링크를 가진다', () => {
      render(<MyReviewCard card={defaultCard} isAuthor={true} context="my" priority={false} />);

      const editLink = screen.getByLabelText('리뷰 수정');
      expect(editLink).toHaveAttribute('href', `/reviews/${defaultCard.board_id}/edit`);
    });
  });

  describe('삭제 기능', () => {
    it('삭제 버튼 클릭 시 삭제 요청한다', async () => {
      const user = userEvent.setup();
      render(<MyReviewCard card={defaultCard} isAuthor={true} context="my" priority={false} />);

      const deleteButton = screen.getByLabelText('리뷰 삭제');
      await user.click(deleteButton);

      expect(mockDeleteReview).toHaveBeenCalledTimes(1);
      expect(mockDeleteReview).toHaveBeenCalledWith({
        reviewId: defaultCard.board_id,
        category: defaultCard.category,
        context: 'my',
      });
    });

    it('사용 위치가 북마크 탭일 때 올바른 사용 위치가 전달된다', async () => {
      const user = userEvent.setup();
      render(<MyReviewCard card={defaultCard} isAuthor={true} context="myBookmarks" priority={false} />);

      const deleteButton = screen.getByLabelText('리뷰 삭제');
      await user.click(deleteButton);

      expect(mockDeleteReview).toHaveBeenCalledWith({
        reviewId: defaultCard.board_id,
        category: defaultCard.category,
        context: 'myBookmarks',
      });
    });

    it('삭제 중 상태에서 로딩 스피너가 표시된다', () => {
      mockUseDeleteReviewFromMyPage.mockReturnValue({
        deleteReview: mockDeleteReview,
        isPending: true,
      } as unknown as ReturnType<typeof useDeleteReviewFromMyPage>);

      render(<MyReviewCard card={defaultCard} isAuthor={true} context="my" priority={false} />);

      expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
      expect(screen.getByText('리뷰를 삭제하고 있어요.')).toBeInTheDocument();
    });

    it('삭제 중 상태에서 올바른 로딩 메시지가 표시된다', () => {
      mockUseDeleteReviewFromMyPage.mockReturnValue({
        deleteReview: mockDeleteReview,
        isPending: true,
      } as unknown as ReturnType<typeof useDeleteReviewFromMyPage>);

      render(<MyReviewCard card={defaultCard} isAuthor={true} context="my" priority={false} />);

      expect(screen.getByText('리뷰를 삭제하고 있어요.')).toBeInTheDocument();
    });

    it('삭제 중 상태에서 삭제 버튼이 비활성화된다', () => {
      mockUseDeleteReviewFromMyPage.mockReturnValue({
        deleteReview: mockDeleteReview,
        isPending: true,
      } as unknown as ReturnType<typeof useDeleteReviewFromMyPage>);

      render(<MyReviewCard card={defaultCard} isAuthor={true} context="my" priority={false} />);

      const deleteButton = screen.getByLabelText('리뷰 삭제');
      expect(deleteButton).toBeDisabled();
    });

    it('삭제 중이 아닐 때 로딩 스피너가 표시되지 않는다', () => {
      render(<MyReviewCard card={defaultCard} isAuthor={true} context="my" priority={false} />);

      expect(screen.queryByTestId('loading-spinner')).not.toBeInTheDocument();
    });
  });

  describe('엣지/예외 케이스', () => {
    it('이미지가 없는 리뷰도 렌더링된다', () => {
      const cardWithoutImage = createMockReviewCard({image_url: ''});
      render(<MyReviewCard card={cardWithoutImage} isAuthor={false} context="my" priority={false} />);

      expect(screen.getByTestId('card-description')).toBeInTheDocument();
    });

    it('댓글과 북마크가 0개인 카드도 렌더링된다', () => {
      const cardWithoutInteractions = createMockReviewCard({
        comments_count: 0,
        bookmarks: 0,
      });
      render(<MyReviewCard card={cardWithoutInteractions} isAuthor={false} context="my" priority={false} />);

      expect(screen.getByTestId('card-description')).toBeInTheDocument();
    });

    it('긴 제목이 있는 카드도 렌더링된다', () => {
      const longTitle = '이것은 매우 긴 제목입니다. '.repeat(20);
      const cardWithLongTitle = createMockReviewCard({title: longTitle});
      render(<MyReviewCard card={cardWithLongTitle} isAuthor={false} context="my" priority={false} />);

      expect(screen.getByTestId('card-description')).toBeInTheDocument();
    });
  });
});
