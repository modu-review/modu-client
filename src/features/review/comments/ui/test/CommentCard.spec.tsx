import {render, screen, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import mockRouter from 'next-router-mock';
import {Toaster} from 'sonner';
import {MemoryRouterProvider} from 'next-router-mock/MemoryRouterProvider';
import CommentCard from '../CommentCard';
import {deleteReviewComment} from '@/entities/review/apis/api-service';
import {withAllContext} from '@/shared/lib/utils/withAllContext';
import {commentStub, otherUserCommentStub, TEST_PAGE, TEST_REVIEW_ID, TEST_USER_NICKNAME} from './stub';

jest.mock('@/entities/review/apis/api-service');
jest.mock('@/shared/ui/components', () => ({
  ...jest.requireActual('@/shared/ui/components'),
  Avatar: ({src, alt}: {src: string; alt: string}) => <img src={src} alt={alt} />,
}));

const mockDeleteReviewComment = deleteReviewComment as jest.MockedFunction<typeof deleteReviewComment>;

describe('src/features/review/comments/ui/CommentCard.tsx', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('렌더링 테스트', () => {
    const defaultProps = {
      comment: commentStub,
      userNickname: TEST_USER_NICKNAME,
      reviewId: TEST_REVIEW_ID,
      page: TEST_PAGE,
    };

    it('댓글 카드가 렌더링된다.', () => {
      render(withAllContext(<CommentCard {...defaultProps} />));

      expect(screen.getByText(commentStub.author_nickname)).toBeInTheDocument();
      expect(screen.getByText(`(${commentStub.created_at})`)).toBeInTheDocument();
      expect(screen.getByText(commentStub.content)).toBeInTheDocument();
    });

    it('작성자인 경우 삭제 버튼이 표시된다.', () => {
      render(withAllContext(<CommentCard {...defaultProps} />));

      expect(screen.getByLabelText('댓글 삭제', {selector: 'button'})).toBeInTheDocument();
    });

    it('작성자가 아닌 경우 삭제 버튼이 표시되지 않는다.', () => {
      render(withAllContext(<CommentCard {...defaultProps} comment={otherUserCommentStub} />));

      expect(screen.queryByLabelText('댓글 삭제', {selector: 'button'})).not.toBeInTheDocument();
    });
  });

  describe('통합 테스트', () => {
    const defaultProps = {
      comment: commentStub,
      userNickname: TEST_USER_NICKNAME,
      reviewId: TEST_REVIEW_ID,
      page: TEST_PAGE,
    };

    it('작성자 이름을 클릭하면 사용자 페이지로 이동한다.', async () => {
      const user = userEvent.setup();

      render(withAllContext(<CommentCard {...defaultProps} />), {wrapper: MemoryRouterProvider});

      const link = screen.getByRole('link');
      expect(link).toHaveTextContent(commentStub.author_nickname);

      await user.click(link);

      expect(mockRouter.asPath).toBe(`/users/${commentStub.author_nickname}`);
    });

    describe('삭제', () => {
      beforeEach(() => {
        mockDeleteReviewComment.mockResolvedValue();

        const modalRoot = document.createElement('div');
        modalRoot.id = 'modal-root';
        document.body.appendChild(modalRoot);
      });

      afterEach(() => {
        const modalRoot = document.getElementById('modal-root');
        if (modalRoot) {
          document.body.removeChild(modalRoot);
        }
      });

      it('댓글 삭제 버튼을 클릭하면 확인 모달을 표시한다.', async () => {
        mockDeleteReviewComment.mockResolvedValue();

        const user = userEvent.setup();

        render(withAllContext(<CommentCard {...defaultProps} />));

        const deleteButton = screen.getByLabelText('댓글 삭제', {selector: 'button'});
        await user.click(deleteButton);

        expect(screen.getByText('삭제된 항목은 복구할 수 없어요.')).toBeInTheDocument();
      });

      it('확인 모달에서 삭제 버튼을 클릭하면 댓글 삭제 후 토스트가 표시된다.', async () => {
        const user = userEvent.setup();

        render(
          withAllContext(
            <>
              <CommentCard {...defaultProps} />
              <Toaster />
            </>,
          ),
        );

        const deleteButton = screen.getByLabelText('댓글 삭제', {selector: 'button'});
        await user.click(deleteButton);

        const deleteModalButton = screen.getByLabelText('삭제', {selector: 'button'});
        await user.click(deleteModalButton);

        expect(mockDeleteReviewComment).toHaveBeenCalledTimes(1);
        expect(mockDeleteReviewComment).toHaveBeenCalledWith({
          commentId: commentStub.id,
          reviewId: TEST_REVIEW_ID,
        });

        expect(screen.getByText('댓글을 성공적으로 삭제했어요.')).toBeInTheDocument();
      });

      it('요청 중 삭제 버튼이 비활성화된다.', async () => {
        let resolveDeleteReviewComment: any;
        mockDeleteReviewComment.mockImplementation(() => {
          return new Promise(resolve => {
            resolveDeleteReviewComment = resolve;
          });
        });

        const user = userEvent.setup();

        render(
          withAllContext(
            <>
              <CommentCard {...defaultProps} />
              <Toaster />
            </>,
          ),
        );

        const deleteButton = screen.getByLabelText('댓글 삭제', {selector: 'button'});
        await user.click(deleteButton);

        const deleteModalButton = screen.getByLabelText('삭제', {selector: 'button'});
        await user.click(deleteModalButton);

        expect(mockDeleteReviewComment).toHaveBeenCalledTimes(1);
        expect(deleteButton).toBeDisabled();

        resolveDeleteReviewComment();

        await waitFor(() => {
          expect(deleteButton).toBeEnabled();
        });
      });
    });
  });
});
