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
      userEmail: string | null;
    };

export default function MyReviewsGrid(props: Props) {
  const {reviews, context} = props;

  return (
    <ul className="w-full grid content-center justify-items-center md:grid-cols-[repeat(auto-fit,minmax(350px,1fr))] lg:grid-cols-[repeat(auto-fit,minmax(360px,1fr))] xl:md:grid-cols-[repeat(auto-fit,minmax(420px,1fr))] gap-y-10 lg:gap-y-12 xl:gap-y-14 mb-24">
      {reviews.map((card, index) => {
        const isAuthor = context === 'my' || card.author_email === props.userEmail;
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
