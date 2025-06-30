import {cva} from 'class-variance-authority';
import CardFrame from './CardFrame';
import {ReviewCard} from '@/entities/review/model/type';

const reviewsGridVariants = cva(
  'w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 content-center justify-items-center',
  {
    variants: {
      variant: {
        bestReviews: 'xl:grid-cols-4 gap-y-14 md:gap-y-20 mb-16',
        myPage: 'gap-y-10 mb-10',
      },
    },
  },
);

type Props =
  | {
      reviews: ReviewCard[];
      from: 'bestReviews';
    }
  | {
      reviews: ReviewCard[];
      from: 'myReviews';
      onDelete: () => void;
    }
  | {
      reviews: ReviewCard[];
      from: 'myBookmarkedReviews';
      userId: string | null;
      onDelete: () => void;
    };

export default function ReviewsGrid(props: Props) {
  const {reviews, from} = props;
  const variant = from === 'bestReviews' ? 'bestReviews' : 'myPage';

  function renderCardFrame(card: ReviewCard) {
    switch (from) {
      case 'myReviews':
        return (
          <CardFrame
            key={card.board_id}
            card={card}
            from="myPage"
            isAuthor={true}
            reviewId={card.board_id}
            onDelete={props.onDelete}
          />
        );
      case 'myBookmarkedReviews':
        return (
          <CardFrame
            key={card.board_id}
            card={card}
            from="myPage"
            isAuthor={props.userId === card.author}
            reviewId={card.board_id}
            onDelete={props.onDelete}
          />
        );
      case 'bestReviews':
        return <CardFrame key={card.board_id} card={card} from="bestReviews" />;
      default:
        const _exhaustiveCheck: never = from;
        throw new Error(`허용되지 않은 'from' 값: ${_exhaustiveCheck}`);
    }
  }

  return <ul className={reviewsGridVariants({variant})}>{reviews.map(card => renderCardFrame(card))}</ul>;
}
