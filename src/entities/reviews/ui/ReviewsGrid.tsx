import {cva} from 'class-variance-authority';
import CardFrame from './CardFrame';
import {ReviewCard} from '@/entities/review/model/type';

const reviewsGridVariants = cva(
  'w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 content-center justify-items-center',
  {
    variants: {
      variant: {
        bestReview: 'xl:grid-cols-4 gap-y-14 md:gap-y-20 mb-16',
        myPage: 'gap-y-10 mb-10',
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
      from: 'myReview';
      onDelete: () => void;
      onEdit: () => void;
    }
  | {
      reviews: ReviewCard[];
      from: 'myBookmarkedReview';
      userId: string | null;
      onDelete: () => void;
      onEdit: () => void;
    };

export default function ReviewsGrid(props: Props) {
  const {reviews, from} = props;
  const variant = from === 'bestReview' ? 'bestReview' : 'myPage';

  function renderCardFrame(card: ReviewCard) {
    switch (from) {
      case 'myReview':
        return (
          <CardFrame
            key={card.board_id}
            card={card}
            from="myPage"
            isAuthor={true}
            onDelete={props.onDelete}
            onEdit={props.onEdit}
          />
        );
      case 'myBookmarkedReview':
        return (
          <CardFrame
            key={card.board_id}
            card={card}
            from="myPage"
            isAuthor={props.userId === card.author}
            onDelete={props.onDelete}
            onEdit={props.onEdit}
          />
        );
      case 'bestReview':
        return <CardFrame key={card.board_id} card={card} from="bestReview" />;
      default:
        const _exhaustiveCheck: never = from;
        throw new Error(`허용되지 않은 'from' 값: ${_exhaustiveCheck}`);
    }
  }

  return <ul className={reviewsGridVariants({variant})}>{reviews.map(card => renderCardFrame(card))}</ul>;
}
