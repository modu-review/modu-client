import {Review} from '@/entities/reviews';
import {BestReviewCard} from '@/features/best-review';

type Props = {cards: Review[]; from: 'mainpage' | 'mypage'};

export default function CardList({cards, from}: Props) {
  return (
    <ul>
      {cards.map(card => (
        <li key={card.board_id}>
          {from === 'mainpage' ? <BestReviewCard card={card} /> : <BestReviewCard card={card} />}
        </li>
      ))}
    </ul>
  );
}
