'use client';

import {ReviewCard} from '@/entities/review';
import Image from 'next/image';
import Link from 'next/link';
import {LucideIcon} from '@/shared/ui/icons';

const mockPosts: Partial<ReviewCard>[] = [
  {
    board_id: 1,
    title: '초코 케이크 리뷰',
    preview: '달달하고 부드러웠어요!',
    image_url: '/images/choco.jpg',
  },
  {
    board_id: 2,
    title: '수제 버거 리뷰',
    preview: '정말 두툼한 패티!',
    image_url: '/images/burger.jpg',
  },
  {
    board_id: 3,
    title: '촉촉한 로션 후기',
    preview: '민감성 피부에 강추',
    image_url: '/images/lotion.jpg',
  },
  {
    board_id: 4,
    title: '감자튀김 후기',
    preview: '바삭하고 고소해요!',
    image_url: '/images/fries.jpg',
  },
  {
    board_id: 5,
    title: '딸기 스무디 리뷰',
    preview: '상큼하고 시원했어요!',
    image_url: '/images/smoothie.jpg',
  },
  {
    board_id: 6,
    title: '에센스 후기',
    preview: '흡수가 빠르고 끈적이지 않아요.',
    image_url: '/images/essence.jpg',
  },
];

export default function RecentReviews() {
  const duplicated = [...mockPosts, ...mockPosts];

  return (
    <div className="relative w-full overflow-hidden mb-24">
      <h2 className="text-boldBlue text-center text-2xl font-bold my-16 lg:text-3xl">최근 등록된 후기</h2>

      {/* 1행 - 왼쪽으로 슬라이드 */}
      <div className="overflow-hidden w-full">
        <div className="flex w-max animate-scroll-left">
          {duplicated.map((post, idx) => (
            <div
              key={`row1-${post.board_id}-${idx}`}
              className="min-w-[260px] bg-white border-[0.3rem] border-boldBlue rounded-2xl p-4 mx-2 shadow-md flex-shrink-0"
            >
              <Image
                src={post.image_url || '/images/placeholder.png'}
                width={400}
                height={200}
                alt={post.title ?? '리뷰 이미지'}
                className="w-full h-40 object-cover rounded-md mb-2"
              />
              <h3 className="font-semibold text-lg">{post.title}</h3>
              <p className="text-sm text-gray-600">{post.preview}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 2행 - 오른쪽으로 슬라이드 */}
      <div className="hidden md:block lg:block overflow-hidden w-full mt-8">
        <div className="flex w-max animate-scroll-right">
          {duplicated.map((post, idx) => (
            <div
              key={`row2-${post.board_id}-${idx}`}
              className="min-w-[260px] bg-white border-[0.3rem] border-boldBlue rounded-2xl p-4 mx-2 shadow-md flex-shrink-0"
            >
              <Image
                src={post.image_url || '/images/placeholder.png'}
                width={400}
                height={200}
                alt={post.title ?? '리뷰 이미지'}
                className="w-full h-40 object-cover rounded-md mb-2"
              />
              <h3 className="font-semibold text-lg">{post.title}</h3>
              <p className="text-sm text-gray-600">{post.preview}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 버튼 */}
      <div className="flex w-full mt-24">
        <Link
          href="/search"
          aria-label="더 많은 후기 보러가기"
          className="relative inline-flex items-center justify-center mx-auto px-6 py-4 group transition-transform active:scale-95"
        >
          <span className="absolute inset-0 bg-lightBlue rounded-full transition-all duration-300 ease-in-out w-14 h-14 group-hover:w-full group-hover:bg-boldBlue"></span>

          <span className="relative font-extrabold text-[16px] tracking-widest uppercase text-boldBlue group-hover:text-white">
            더 많은 후기 보기
          </span>

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
