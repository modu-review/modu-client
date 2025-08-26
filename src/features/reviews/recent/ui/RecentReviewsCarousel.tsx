import {ReviewCard} from '@/entities/review';
import RecentReviewCard from './RecentReviewCard';

type Props = {
  posts: Partial<ReviewCard>[];
  direction: 'left' | 'right';
};
export default function RecentReviewsCarousel({posts, direction}: Props) {
  return (
    <div className="overflow-hidden w-full">
      <div className={`flex w-max ${direction === 'left' ? 'animate-scroll-left' : 'animate-scroll-right'}`}>
        {posts.map((post, idx) => (
          <RecentReviewCard key={`row1-${post.board_id}-${idx}`} post={post} />
        ))}
      </div>
    </div>
  );
}
