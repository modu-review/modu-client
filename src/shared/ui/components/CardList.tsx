import {Review} from '@/entities/reviews';
import {BestReviewCard} from '@/features/best-review';

type Props = {cards: Review[]; from: 'mainpage' | 'mypage'};

export default function CardList({cards, from}: Props) {
  return (
    <ul className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-20 content-center justify-items-center">
      {cards.map(card => (
        <li key={card.board_id}>
          {from === 'mainpage' ? <BestReviewCard card={card} /> : <BestReviewCard card={card} />}
        </li>
      ))}
    </ul>
  );
}
