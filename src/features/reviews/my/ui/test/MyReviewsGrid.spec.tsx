import {render, screen} from '@testing-library/react';
import MyReviewsGrid from '../MyReviewsGrid';
import {
  createMockReviewCards,
  mixedAuthorReviews,
  TEST_USER_NICKNAME,
  TEST_OTHER_USER_NICKNAME,
} from './stub';

jest.mock('../MyReviewCard', () => ({
  __esModule: true,
  default: ({card, isAuthor, context, priority}: any) => (
    <li
      data-testid={`review-card-${card.board_id}`}
      data-is-author={isAuthor}
      data-context={context}
      data-priority={priority}
    >
      {card.title}
    </li>
  ),
}));

describe('features/reviews/my/ui/MyReviewsGrid', () => {
  describe('정상 케이스', () => {
    it('리뷰 배열이 정상적으로 렌더링된다', () => {
      const reviews = createMockReviewCards(3);
      render(<MyReviewsGrid reviews={reviews} context="my" />);

      expect(screen.getByTestId('review-card-1')).toBeInTheDocument();
      expect(screen.getByTestId('review-card-2')).toBeInTheDocument();
      expect(screen.getByTestId('review-card-3')).toBeInTheDocument();
    });

    it('각 리뷰마다 마이 페이지용 리뷰 카드가 렌더링된다', () => {
      const reviews = createMockReviewCards(5);
      render(<MyReviewsGrid reviews={reviews} context="my" />);

      const cards = screen.getAllByTestId(/^review-card-/);
      expect(cards).toHaveLength(5);
    });

    it('리뷰 개수만큼 카드가 렌더링된다', () => {
      const reviews = createMockReviewCards(10);
      render(<MyReviewsGrid reviews={reviews} context="my" />);

      const cards = screen.getAllByTestId(/^review-card-/);
      expect(cards).toHaveLength(10);
    });
  });

  describe('탭 - 내가 작성한 후기', () => {
    it('모든 카드의 작성자 여부가 참이다', () => {
      const reviews = createMockReviewCards(3);
      render(<MyReviewsGrid reviews={reviews} context="my" />);

      const card1 = screen.getByTestId('review-card-1');
      const card2 = screen.getByTestId('review-card-2');
      const card3 = screen.getByTestId('review-card-3');

      expect(card1).toHaveAttribute('data-is-author', 'true');
      expect(card2).toHaveAttribute('data-is-author', 'true');
      expect(card3).toHaveAttribute('data-is-author', 'true');
    });

    it('사용 위치 값 인자가 my로 전달된다', () => {
      const reviews = createMockReviewCards(1);
      render(<MyReviewsGrid reviews={reviews} context="my" />);

      const card = screen.getByTestId('review-card-1');
      expect(card).toHaveAttribute('data-context', 'my');
    });
  });

  describe('탭 - 내가 저장한 후기', () => {
    it('로그인 사용자 닉네임이 작성자 닉네임과 일치하면 작성자 여부가 참이된다', () => {
      render(<MyReviewsGrid reviews={mixedAuthorReviews} context="myBookmarks" userNickname={TEST_USER_NICKNAME} />);

      const card1 = screen.getByTestId('review-card-1');
      expect(card1).toHaveAttribute('data-is-author', 'true');
    });

    it('로그인 사용자 닉네임이 작성자 닉네임과 다르면 작성자 여부가 거젓이된다', () => {
      render(<MyReviewsGrid reviews={mixedAuthorReviews} context="myBookmarks" userNickname={TEST_USER_NICKNAME} />);

      const card2 = screen.getByTestId('review-card-2');
      const card3 = screen.getByTestId('review-card-3');

      expect(card2).toHaveAttribute('data-is-author', 'false');
      expect(card3).toHaveAttribute('data-is-author', 'false');
    });

    it('작성자 닉네임이 없으면 모든 카드의 작성자 여부가 거짓이된다', () => {
      render(<MyReviewsGrid reviews={mixedAuthorReviews} context="myBookmarks" userNickname={null} />);

      const card1 = screen.getByTestId('review-card-1');
      const card2 = screen.getByTestId('review-card-2');
      const card3 = screen.getByTestId('review-card-3');

      expect(card1).toHaveAttribute('data-is-author', 'false');
      expect(card2).toHaveAttribute('data-is-author', 'false');
      expect(card3).toHaveAttribute('data-is-author', 'false');
    });

    it('사용 위치 값 인자가 myBookmarks로 전달된다', () => {
      render(<MyReviewsGrid reviews={mixedAuthorReviews} context="myBookmarks" userNickname={TEST_USER_NICKNAME} />);

      const card = screen.getByTestId('review-card-1');
      expect(card).toHaveAttribute('data-context', 'myBookmarks');
    });
  });

  describe('이미지 우선 로딩 테스트', () => {
    it('첫 3개 리뷰는 이미지가 우선 로딩된다', () => {
      const reviews = createMockReviewCards(5);
      render(<MyReviewsGrid reviews={reviews} context="my" />);

      const card1 = screen.getByTestId('review-card-1');
      const card2 = screen.getByTestId('review-card-2');
      const card3 = screen.getByTestId('review-card-3');

      expect(card1).toHaveAttribute('data-priority', 'true');
      expect(card2).toHaveAttribute('data-priority', 'true');
      expect(card3).toHaveAttribute('data-priority', 'true');
    });

    it('4번째 이후 리뷰는 이미지가 지연 로딩된다', () => {
      const reviews = createMockReviewCards(6);
      render(<MyReviewsGrid reviews={reviews} context="my" />);

      const card4 = screen.getByTestId('review-card-4');
      const card5 = screen.getByTestId('review-card-5');
      const card6 = screen.getByTestId('review-card-6');

      expect(card4).toHaveAttribute('data-priority', 'false');
      expect(card5).toHaveAttribute('data-priority', 'false');
      expect(card6).toHaveAttribute('data-priority', 'false');
    });

    it('리뷰가 3개 미만일 때 모든 리뷰의 이미지가 우선 로딩된다', () => {
      const reviews = createMockReviewCards(2);
      render(<MyReviewsGrid reviews={reviews} context="my" />);

      const card1 = screen.getByTestId('review-card-1');
      const card2 = screen.getByTestId('review-card-2');

      expect(card1).toHaveAttribute('data-priority', 'true');
      expect(card2).toHaveAttribute('data-priority', 'true');
    });

    it('리뷰가 정확히 3개일 때 모든 리뷰의 이미지가 우선 로딩된다', () => {
      const reviews = createMockReviewCards(3);
      render(<MyReviewsGrid reviews={reviews} context="my" />);

      const card1 = screen.getByTestId('review-card-1');
      const card2 = screen.getByTestId('review-card-2');
      const card3 = screen.getByTestId('review-card-3');

      expect(card1).toHaveAttribute('data-priority', 'true');
      expect(card2).toHaveAttribute('data-priority', 'true');
      expect(card3).toHaveAttribute('data-priority', 'true');
    });
  });

  describe('엣지/예외 케이스', () => {
    it('빈 배열이 전달되면 빈 리스트가 렌더링된다', () => {
      render(<MyReviewsGrid reviews={[]} context="my" />);

      const cards = screen.queryAllByTestId(/^review-card-/);
      expect(cards).toHaveLength(0);
    });

    it('리뷰가 1개만 있어도 정상 렌더링된다', () => {
      const reviews = createMockReviewCards(1);
      render(<MyReviewsGrid reviews={reviews} context="my" />);

      expect(screen.getByTestId('review-card-1')).toBeInTheDocument();
    });

    it('작성자가 모두 다른 북마크 리뷰도 렌더링된다', () => {
      render(<MyReviewsGrid reviews={mixedAuthorReviews} context="myBookmarks" userNickname={TEST_OTHER_USER_NICKNAME} />);

      expect(screen.getByTestId('review-card-1')).toBeInTheDocument();
      expect(screen.getByTestId('review-card-2')).toBeInTheDocument();
      expect(screen.getByTestId('review-card-3')).toBeInTheDocument();

      const card1 = screen.getByTestId('review-card-1');
      const card2 = screen.getByTestId('review-card-2');

      expect(card1).toHaveAttribute('data-is-author', 'false');
      expect(card2).toHaveAttribute('data-is-author', 'true');
    });
  });
});
