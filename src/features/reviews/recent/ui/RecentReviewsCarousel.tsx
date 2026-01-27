import Link from 'next/link';
import RecentReviewCard from './RecentReviewCard';
import MultiCarousel from './MultiCarousel';
import {useGetRecentReviews} from '@/entities/reviews';

export default function RecentReviewsCarousel() {
  const {
    data: {latest_reviews},
  } = useGetRecentReviews();

  if (latest_reviews.length === 0) {
    return (
      <section className="flex justify-center items-center min-h-[200px]">
        <p className="text-xl font-semibold">아직 등록된 후기가 없어요.</p>
      </section>
    );
  }

  return (
    <section>
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
      <div className="flex w-full mt-16 md:mt-24">
        <Link
          href="/search"
          aria-label="더 많은 후기 보러가기"
          className="relative inline-flex items-center justify-center mx-auto px-6 py-4 group transition-transform active:scale-95"
        >
          <span className="absolute inset-0 bg-lightBlue rounded-full transition-all duration-300 ease-in-out w-14 h-14 group-hover:w-full group-hover:bg-boldBlue"></span>
          <span className="relative font-extrabold text-[16px] tracking-widest uppercase text-boldBlue group-hover:text-white">
            더 많은 후기 보기{` >`}
          </span>
        </Link>
      </div>
    </section>
  );
}
