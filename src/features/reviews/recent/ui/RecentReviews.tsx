'use client';

import Link from 'next/link';
import {LucideIcon} from '@/shared/ui/icons';
import RecentReviewsCarousel from './RecentReviewsCarousel';
import {useGetRecentReviews} from '@/entities/reviews';

export default function RecentReviews() {
  const {
    data: {latest_reviews},
  } = useGetRecentReviews();
  // console.log('latest_reviews', latest_reviews);
  // const duplicated = [...mockPosts, ...mockPosts]; // loop용

  return (
    <div className="relative w-full overflow-hidden mb-24">
      <h2 className="text-boldBlue text-center text-2xl font-bold my-16 lg:text-3xl">최근 등록된 후기</h2>

      {/* 1행(왼쪽방향슬라이딩) */}
      <RecentReviewsCarousel posts={latest_reviews} rowKey="row1" />

      {/* 2행(오른쪽방향슬라이딩_데스크탑에서만 표시 */}
      <div className="hidden md:block lg:block mt-8">
        <RecentReviewsCarousel posts={latest_reviews} rightToLeft={false} rowKey="row2" />
      </div>

      {/* 버튼 */}
      <div className="flex w-full mt-24">
        <Link
          href="/search"
          aria-label="더 많은 후기 보러가기"
          className="relative inline-flex items-center justify-center mx-auto px-6 py-4 group transition-transform active:scale-95"
        >
          {/* 배경 우너형 애니메이션 */}
          <span className="absolute inset-0 bg-lightBlue rounded-full transition-all duration-300 ease-in-out w-14 h-14 group-hover:w-full group-hover:bg-boldBlue"></span>
          {/* 텍스트 */}
          <span className="relative font-extrabold text-[16px] tracking-widest uppercase text-boldBlue group-hover:text-white">
            더 많은 후기 보기
          </span>
          {/* 아이콘 */}
          <LucideIcon
            name="ArrowRight"
            size={20}
            className="stroke-current text-boldBlue group-hover:text-white relative ml-2 transition-transform duration-300 ease-in-out transform -translate-x-2 group-hover:translate-x-0 stroke-[2px]"
          />
        </Link>
      </div>
    </div>
  );
}
