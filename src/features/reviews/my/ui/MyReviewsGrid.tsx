import MyReviewCard from './MyReviewCard';
import {ReviewCard} from '@/entities/review';

type Props =
  | {
      reviews: ReviewCard[];
      context: 'my';
    }
  | {
      reviews: ReviewCard[];
      context: 'myBookmarks';
      userNickname: string | null;
    };

export default function MyReviewsGrid(props: Props) {
  const {reviews, context} = props;

  return (
    <ul className="w-full grid content-center justify-items-center grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-14 md:gap-y-10">
      {reviews.map((card, index) => {
        const isAuthor = context === 'my' || card.author_nickname === props.userNickname;
        const shouldPrioritize = index < 3;

        return (
          <MyReviewCard
            key={card.board_id}
            card={card}
            isAuthor={isAuthor}
            context={context}
            priority={shouldPrioritize}
          />
        );
      })}
    </ul>
  );
}
