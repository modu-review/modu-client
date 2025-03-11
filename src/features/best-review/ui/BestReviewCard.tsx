import {Review} from '@/entities/reviews';
import {CardFrame} from '@/shared/ui/components';

type Props = {card: Review};

export default function BestReviewCard({card}: Props) {
  return (
    <section className="rounded-t-[130px] rounded-b-xl w-[290px] h-[400px] shadow-2xl md:w-[300px] md:h-[400px] lg:w-[280px] lg:h-[370px] bg-white">
      <CardFrame card={card} />
    </section>
  );
}
