import {Review} from '@/entities/reviews';

type Props = {card: Review};

export default function BestReviewCard({card}: Props) {
  return <section>{card.category}</section>;
}
