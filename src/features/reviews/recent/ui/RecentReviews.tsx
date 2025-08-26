// 'use client';

// import {ReviewCard} from '@/entities/review';
// import Image from 'next/image';

// const mockPosts: Partial<ReviewCard>[] = [
//   {
//     board_id: 1,
//     title: '초코 케이크 리뷰',
//     preview: '달달하고 부드러웠어요!',
//     image_url: '/images/choco.jpg',
//   },
//   {
//     board_id: 2,
//     title: '수제 버거 리뷰',
//     preview: '정말 두툼한 패티!',
//     image_url: '/images/burger.jpg',
//   },
//   {
//     board_id: 3,
//     title: '촉촉한 로션 후기',
//     preview: '민감성 피부에 강추',
//     image_url: '/images/lotion.jpg',
//   },
//   {
//     board_id: 4,
//     title: '감자튀김 후기',
//     preview: '바삭하고 고소해요!',
//     image_url: '/images/fries.jpg',
//   },
//   {
//     board_id: 5,
//     title: '딸기 스무디 리뷰',
//     preview: '상큼하고 시원했어요!',
//     image_url: '/images/smoothie.jpg',
//   },
//   {
//     board_id: 6,
//     title: '에센스 후기',
//     preview: '흡수가 빠르고 끈적이지 않아요.',
//     image_url: '/images/essence.jpg',
//   },
// ];

// export default function RecentReviews() {
//   const duplicated = [...mockPosts, ...mockPosts]; // loop 효과용

//   return (
//     <div className="relative w-full overflow-hidden mb-32">
//       <h2 className="text-center text-3xl font-bold my-16">최근 등록된 리뷰</h2>
//       <div className="carousel-track">
//         {duplicated.map((post, idx) => (
//           <div
//             key={`${post.board_id}-${idx}`}
//             className="carousel-item min-w-[260px] bg-white border-boldBlue border-[0.3rem] rounded-xl shadow-md p-4 shrink-0 mx-2"
//           >
//             <Image
//               src={post.image_url || '/images/placeholder.png'}
//               width={400}
//               height={200}
//               alt={post.title ?? '리뷰 이미지'}
//               className="w-full h-40 object-cover rounded-md mb-2"
//             />
//             <h3 className="font-semibold text-lg">{post.title}</h3>
//             <p className="text-sm text-gray-600">{post.preview}</p>
//           </div>
//         ))}
//       </div>

//       <style jsx>{`
//         .carousel-track {
//           display: flex;
//           animation: scroll-left 50s linear infinite;
//           width: max-content;
//         }

//         @keyframes scroll-left {
//           0% {
//             transform: translateX(0%);
//           }
//           100% {
//             transform: translateX(-50%);
//           }
//         }
//       `}</style>
//     </div>
//   );
// }

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
  const duplicated = [...mockPosts, ...mockPosts]; // 무한 루프용
  //   const duplicated = Array(3).fill(mockPosts).flat(); // 또는 [...mockPosts, ...mockPosts, ...mockPosts, ...mockPosts];

  return (
    <div className="relative w-full overflow-hidden mb-24 ">
      <h2 className="text-boldBlue text-center text-2xl font-bold my-16 lg:text-3xl">최근 등록된 후기</h2>

      {/* 1행 - 왼쪽으로 슬라이드 */}
      <div className="carousel-wrapper">
        <div className="carousel-track-left">
          {duplicated.map((post, idx) => (
            <div key={`row1-${post.board_id}-${idx}`} className="carousel-item">
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
      <div className="hidden md:block lg:block carousel-wrapper mt-8">
        <div className="carousel-track-right">
          {duplicated.map((post, idx) => (
            <div key={`row2-${post.board_id}-${idx}`} className="carousel-item">
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

      <style jsx>{`
        .carousel-wrapper {
          overflow: hidden;
          width: 100%;
        }

        .carousel-track-left,
        .carousel-track-right {
          display: flex;
          width: max-content;
        }

        .carousel-track-left {
          animation: scroll-left 50s linear infinite;
        }

        .carousel-track-right {
          animation: scroll-right 50s linear infinite;
        }

        .carousel-item {
          min-width: 260px;
          background-color: white;
          border: 0.3rem solid rgb(15 76 117);
          border-radius: 1rem;
          padding: 1rem;
          margin: 0 0.5rem;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
          flex-shrink: 0;
        }

        @keyframes scroll-left {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-33.333%);
          }
        }

        @keyframes scroll-right {
          0% {
            transform: translateX(-33.333%);
          }
          100% {
            transform: translateX(0%);
          }
        }
      `}</style>
      {/* <div className="flex w-full mt-24">
        <Link
          href="/search"
          className="flex items-center mx-auto cursor-pointer animate-pulse text-boldBlue font-extrabold shadow-lg text-[20px] hover:text-black"
          aria-label="더 많은 후기 보러가기"
        >
          더 많은 후기 보기 <LucideIcon name="ArrowRight" size={20} />
        </Link>
      </div> */}
      <div className="flex w-full mt-24">
        <Link
          href="/search"
          aria-label="더 많은 후기 보러가기"
          className="relative inline-flex items-center justify-center mx-auto px-6 py-4 group transition-transform active:scale-95"
        >
          {/* 배경 확장용 span */}
          <span className="absolute inset-0 bg-lightBlue rounded-full transition-all duration-300 ease-in-out group-hover:w-full w-14 h-14 group-hover:bg-boldBlue"></span>

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
