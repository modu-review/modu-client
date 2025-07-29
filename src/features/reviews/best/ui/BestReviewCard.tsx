import Link from 'next/link';
import {CardDescription} from '@/entities/reviews';
import {ReviewCard} from '@/entities/review';

type Props = {
  card: ReviewCard;
  priority: boolean;
};

export default function BestReviewCard({card, priority}: Props) {
  return (
    <Link href={`/reviews/${card.board_id}`}>
      <article className="relative bg-white rounded-xl pt-7 w-[310px] h-[400px] md:w-[300px] md:h-[400px] lg:w-[280px] lg:h-[370px] shadow-lg shadow-gray-800 hover:translate-y-[-2px] hover:shadow-black hover:shadow-lg transition-all">
        <CardDescription card={card} priority={priority} />
      </article>
    </Link>
  );
}
