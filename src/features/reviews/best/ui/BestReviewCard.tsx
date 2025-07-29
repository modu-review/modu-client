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
      <article className="relative bg-white rounded-[2rem] pt-5 w-[310px] h-[400px] md:w-[300px] md:h-[400px] lg:w-[300px] lg:h-[400px] shadow-lg shadow-gray-800 hover:translate-y-[-2px] hover:shadow-black hover:shadow-lg transition-all">
        <CardDescription card={card} priority={priority} />
      </article>
    </Link>
  );
}
