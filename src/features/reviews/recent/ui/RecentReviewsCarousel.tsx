import {ReviewCard} from '@/entities/review';
import RecentReviewCard from './RecentReviewCard';
import MultiCarousel from './MultiCarousel';

type Props = {
  posts: ReviewCard[];
  rightToLeft?: boolean;
  rowKey: string;
};
export default function RecentReviewsCarousel({posts, rightToLeft, rowKey}: Props) {
  return (
    <div className="overflow-hidden w-full">
      <MultiCarousel rightToLeft={rightToLeft}>
        {posts.map((post, idx) => (
          <RecentReviewCard
            key={`${rowKey}-${post.board_id}-${idx}`}
            post={post}
            uniqueKey={`${rowKey}-${post.board_id}-${idx}`}
          />
        ))}
      </MultiCarousel>
    </div>
  );
}
