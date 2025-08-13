'use client';

import {useCallback} from 'react';
import {NoSearchResults, ReviewArticle, ReviewArticleLoading} from '@/entities/reviews';
import Image from 'next/image';
import {SelectSortOptions, useSelectSortOption} from '@/features/reviews/sorting';
import {LucideIcon} from '@/shared/ui/icons';
import {CATEGORY_MAP} from '@/entities/review';
import {UserPost} from '@/entities/users';

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
            author_id: 'wldus4225',
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
            author_id_id: 'wldus4225',
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
            author_id_id: 'wldus4225',
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
            author_id_id: 'wldus4225',
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
            author_id_id: 'wldus4225',
            category: '전체공개',
            image_url: '/images/sample.jpg',
            comments_count: 20,
            bookmarks: 3,
          },
        ],
      },
    ],
    next_cursor: 2, // => 다음 커서 번호
    has_next: true, // => 다음 데이터가 있는지
    total_results: 23, // => 총 몇 개의 검색 결과가 있는지
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
                <UserPost userReview={review} priorit={shouldPrioritize} />
              </li>
            );
          }),
        )}
      </ul>
    </section>
  );
}
