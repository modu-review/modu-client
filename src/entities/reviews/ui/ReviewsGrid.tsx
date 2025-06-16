import {cva} from 'class-variance-authority';
import CardFrame from './CardFrame';
import {ReviewCard} from '@/entities/review/model/type';

const reviewsGridVariants = cva(
  'w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 content-center justify-items-center',
  {
    variants: {
      cols: {
        bestReview: 'xl:grid-cols-4',
        myPage: '',
      },
      gap: {
        bestReview: 'gap-y-14 md:gap-y-20',
        myPage: 'gap-y-10',
      },
      margin: {
        bestReview: 'mb-16',
        myPage: 'mb-10',
      },
    },
  },
);

type Props =
  | {
      reviews: ReviewCard[];
      from: 'bestReview';
    }
  | {
      reviews: ReviewCard[];
      from: 'myPage';
      onDelete: () => void;
      onEdit: () => void;
    };

export default function ReviewsGrid(props: Props) {
  const {reviews, from} = props;
  return (
    <ul className={reviewsGridVariants({cols: from, gap: from, margin: from})}>
      {reviews.map(card =>
        from === 'myPage' ? (
          <CardFrame key={card.board_id} card={card} from="myPage" onDelete={props.onDelete} onEdit={props.onEdit} />
        ) : (
          <CardFrame key={card.board_id} card={card} from="bestReview" />
        ),
      )}
    </ul>
  );
}
