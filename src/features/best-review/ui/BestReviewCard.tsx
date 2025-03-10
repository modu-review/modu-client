import {Review} from '@/entities/reviews';
import {CardFrame} from '@/shared/ui/components';

type Props = {card: Review};

export default function BestReviewCard({card}: Props) {
  return (
    <section className="rounded-t-full rounded-b-xl w-[320px] h-[430px] md:w-[330px] md:h-[430px] lg:w-[310px] lg:h-[400px] bg-white">
      <CardFrame card={card} />
    </section>
  );
}
