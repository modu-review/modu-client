import {cva} from 'class-variance-authority';
import MyPageReviewCard from './MyPageReviewCard';
import BestReviewCard from './BestReviewCard';
import {ReviewCard} from '@/entities/review/model/type';

const reviewsGridVariants = cva(
  'w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 content-center justify-items-center',
  {
    variants: {
      variant: {
        bestReviews: 'gap-y-14 md:gap-y-20 mb-16',
        myPage: 'gap-y-10 mb-24',
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
    }
  | {
      reviews: ReviewCard[];
      from: 'myBookmarkedReviews';
      userEmail: string | null;
    };

export default function ReviewsGrid(props: Props) {
  const {reviews, from} = props;
  const variant = from === 'bestReviews' ? 'bestReviews' : 'myPage';

  function renderCardFrame(card: ReviewCard) {
    switch (from) {
      case 'myReviews':
        return <MyPageReviewCard key={card.board_id} card={card} isAuthor={true} context="my" />;
      case 'myBookmarkedReviews':
        const isAuthor = card.author_email === props.userEmail;
        return <MyPageReviewCard key={card.board_id} card={card} isAuthor={isAuthor} context="bookmarks" />;
      case 'bestReviews':
        return <BestReviewCard key={card.board_id} card={card} />;
      default:
        const _exhaustiveCheck: never = from;
        throw new Error(`허용되지 않은 'from' 값: ${_exhaustiveCheck}`);
    }
  }

  return <ul className={reviewsGridVariants({variant})}>{reviews.map(card => renderCardFrame(card))}</ul>;
}
