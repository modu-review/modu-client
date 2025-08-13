'use client';

import {useCallback} from 'react';
import {NoSearchResults, ReviewArticle, ReviewArticleLoading} from '@/entities/reviews';
import Image from 'next/image';
import {SelectSortOptions, useSelectSortOption} from '@/features/reviews/sorting';
import {LucideIcon} from '@/shared/ui/icons';
import {CATEGORY_MAP} from '@/entities/review';

type Props = {
  userId: string;
};

export default function UserPostsList({userId}: Props) {
  const data = {
    pages: [
      {
        results: [
          {
            board_id: 1,
            title: '루미키 65배열 크림 하우징 후기',
            preview:
              '루미키 65 하우징 후기입니다. HMX Emo 스위치를 적용한 보드로, 타건감, 통울림, 흡음이 인상적이며...',
            created_at: '2025-08-12 08:00',
            author: 'wldus4225',
            category: '전체공개',
            image_url: '/images/sample.jpg',
            comments_count: 2,
            bookmarks: 3,
          },
        ],
      },
      {
        results: [
          {
            board_id: 1,
            title: '루미키 65배열 크림 하우징 후기',
            preview:
              '루미키 65 하우징 후기입니다. HMX Emo 스위치를 적용한 보드로, 타건감, 통울림, 흡음이 인상적이며...',
            created_at: '2025-08-12 08:00',
            author: 'wldus4225',
            category: '전체공개',
            image_url: '/images/sample.jpg',
            comments_count: 2,
            bookmarks: 3,
          },
        ],
      },
      {
        results: [
          {
            board_id: 1,
            title: '루미키 65배열 크림 하우징 후기',
            preview:
              '루미키 65 하우징 후기입니다. HMX Emo 스위치를 적용한 보드로, 타건감, 통울림, 흡음이 인상적이며...',
            created_at: '2025-08-12 08:00',
            author: 'wldus4225',
            category: '전체공개',
            image_url: '/images/sample.jpg',
            comments_count: 2,
            bookmarks: 3,
          },
        ],
      },
      {
        results: [
          {
            board_id: 1,
            title: '루미키 65배열 크림 하우징 후기',
            preview:
              '루미키 65 하우징 후기입니다. HMX Emo 스위치를 적용한 보드로, 타건감, 통울림, 흡음이 인상적이며...',
            created_at: '2025-08-12 08:00',
            author: 'wldus4225',
            category: '전체공개',
            image_url: '/images/sample.jpg',
            comments_count: 2,
            bookmarks: 3,
          },
        ],
      },
      {
        results: [
          {
            board_id: 1,
            title: '루미키 65배열 크림 하우징 후기',
            preview:
              '루미키 65 하우징 후기입니다. HMX Emo 스위치를 적용한 보드로, 타건감, 통울림, 흡음이 인상적이며...',
            created_at: '2025-08-12 08:00',
            author: 'wldus4225',
            category: '전체공개',
            image_url: '/images/sample.jpg',
            comments_count: 2,
            bookmarks: 3,
          },
        ],
      },
    ],
  };

  const {sort, handleChange} = useSelectSortOption({
    options: {
      page: '1',
    },
  });

  return (
    <section className="px-4 md:px-6 lg:px-12">
      <header className="flex justify-between items-end mb-4">
        <h3 className="text-lg md:text-xl font-semibold">
          전체 게시글 수 <span className="text-primary text-boldBlue font-bold">(23)</span>
        </h3>
      </header>
      <div>
        <SelectSortOptions className="ml-auto mb-6 md:mr-5" sort={sort} onValueChange={handleChange} />
      </div>

      <ul className="space-y-6">
        {data.pages.map((page, pageIndex) =>
          page.results.map((review, reviewIndex) => {
            const shouldPrioritize = pageIndex === 0 && reviewIndex < 3;

            return (
              <li key={review.board_id} className="bg-slate-100 rounded-xl shadow p-6 md:p-6 flex gap-4 items-start">
                {/* 썸네일 */}
                <div className="flex-shrink-0 w-[100px] h-[100px] overflow-hidden rounded-md border mt-2 border-gray-300">
                  <Image
                    width={100}
                    height={100}
                    src={review.image_url}
                    alt={`${review.title} 썸네일`}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* 콘텐츠 영역 */}
                <div className="flex flex-col flex-1">
                  {/* 제목 */}
                  <div className="flex justify-between items-start">
                    <h4 className="text-base md:text-lg font-semibold leading-tight">{review.title}</h4>
                    <span className="text-xs font-bold text-white bg-mediumBlue px-4 py-2 rounded-xl shrink-0">
                      {'전자제품'}
                      {/* {CATEGORY_MAP[category]} // TODO: 실제카테고리가져오기 */}
                    </span>
                  </div>

                  {/* 날짜 */}
                  <p className="text-xs text-muted-foreground mt-1">{review.created_at}</p>

                  {/* 내용 요약 */}
                  <p className="text-sm mt-2 line-clamp-2">{review.preview}</p>

                  {/* 하단 아이콘 영역 */}
                  <div className="flex justify-start items-center gap-4 mt-4 text-sm">
                    <div className="flex items-center gap-1">
                      <LucideIcon name="MessageCircle" size={16} />
                      {review.comments_count}
                    </div>
                    <div className="flex items-center gap-1">
                      <LucideIcon name="Bookmark" size={16} />
                      {review.bookmarks}
                    </div>
                  </div>
                </div>
              </li>
            );
          }),
        )}
      </ul>
    </section>
  );
}
