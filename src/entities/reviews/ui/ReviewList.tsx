import CardFrame from './CardFrame';
import {ReviewCard} from '@/entities/review';
import {LucideIcon} from '@/shared/ui/icons';

type Props = {
  filteredReview: {
    count: number;
    reviews: ReviewCard[];
  };
};

export default function ReviewList({filteredReview}: Props) {
  const {count, reviews} = filteredReview;

  if (count === 0) {
    return (
      <section className="w-full h-full min-h-[250px] md:min-h-[350px] lg:min-h-[450px] mb-10 flex flex-col items-center justify-center">
        <LucideIcon className="w-[120px] h-[120px] md:w-[160px] md:h-[160px]" name="PackageOpen" color="white" />
        <p className="text-white mt-8 text-lg md:text-xl">해당 카테고리는 아직 베스트 후기가 없어요.</p>
      </section>
    );
  }

  return (
    <ul className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-y-14 md:gap-y-20 content-center justify-items-center mb-16">
      {reviews.map(card => (
        <li key={card.board_id}>
          <CardFrame card={card} from="bestReview" />
        </li>
      ))}
    </ul>
  );
}
