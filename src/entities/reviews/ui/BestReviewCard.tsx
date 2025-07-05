import Link from 'next/link';
import CardDescription from './CardDescription';
import {ReviewCard} from '@/entities/review/model/type';

type Props = {
  card: ReviewCard;
};

export default function BestReviewCard({card}: Props) {
  return (
    <Link href={`/reviews/${card.board_id}`}>
      <article className="relative bg-white rounded-t-[115px] rounded-b-xl pt-7 w-[290px] h-[400px] md:w-[300px] md:h-[400px] lg:w-[280px] lg:h-[370px] shadow-lg shadow-black">
        <CardDescription card={card} />
      </article>
    </Link>
  );
}
