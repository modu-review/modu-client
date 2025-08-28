import RecentReviewCard from './RecentReviewCard';
import MultiCarousel from './MultiCarousel';
import {useGetRecentReviews} from '@/entities/reviews';

export default function RecentReviewsCarousel() {
  const {
    data: {latest_reviews},
  } = useGetRecentReviews();

  return (
    <div className="overflow-hidden w-full">
      <MultiCarousel>
        {latest_reviews.map(post => (
          <RecentReviewCard key={`1-${post.board_id}`} post={post} />
        ))}
      </MultiCarousel>
      <div className="hidden md:block mt-14">
        <MultiCarousel rightToLeft={false}>
          {latest_reviews.map(post => (
            <RecentReviewCard key={`2-${post.board_id}`} post={post} />
          ))}
        </MultiCarousel>
      </div>
    </div>
  );
}
