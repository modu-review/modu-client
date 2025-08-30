import Link from 'next/link';
import RecentReviewsClient from './RecentReviewsClient';

export default function RecentReviews() {
  return (
    <div className="relative w-full overflow-hidden mb-16 md:mb-24">
      <h2 className="text-boldBlue text-center text-2xl font-bold my-10 md:my-16 lg:text-3xl">최근 등록된 후기</h2>

      {/* Carousel - 클라이언트 컴포넌트 */}
      <RecentReviewsClient />

      {/* 버튼 */}
      <div className="flex w-full mt-16 md:mt-24">
        <Link
          href="/search"
          aria-label="더 많은 후기 보러가기"
          className="relative inline-flex items-center justify-center mx-auto px-6 py-4 group transition-transform active:scale-95"
        >
          {/* 배경 원형 애니메이션 */}
          <span className="absolute inset-0 bg-lightBlue rounded-full transition-all duration-300 ease-in-out w-14 h-14 group-hover:w-full group-hover:bg-boldBlue"></span>
          {/* 텍스트 */}
          <span className="relative font-extrabold text-[16px] tracking-widest uppercase text-boldBlue group-hover:text-white">
            더 많은 후기 보기{` >`}
          </span>
        </Link>
      </div>
    </div>
  );
}
