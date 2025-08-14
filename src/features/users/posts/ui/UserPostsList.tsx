'use client';

import {useCallback} from 'react';
import {NoSearchResults} from '@/entities/reviews';
import {SelectSortOptions, useSelectSortOption} from '@/features/reviews/sorting';
import {CATEGORY_MAP} from '@/entities/review';
import {useGetPostsByUser, UserPost} from '@/entities/users';
import UserPostLoading from '@/entities/users/ui/UserPostLoading';

type Props = {
  userEmail: string;
};

export default function UserPostsList({userEmail}: Props) {
  // const data = {
  //   pages: [
  //     {
  //       results: [
  //         {
  //           board_id: 1,
  //           title: '루미키 65배열 크림 하우징 후기',
  //           preview:
  //             '루미키 65 하우징 후기입니다. HMX Emo 스위치를 적용한 보드로, 타건감, 통울림, 흡음이 인상적이며...',
  //           created_at: '2025-08-12 08:00',
  //           author_id: 'wldus4225',
  //           category: '전체공개',
  //           image_url: '/images/sample.jpg',
  //           comments_count: 2,
  //           bookmarks: 3,
  //         },
  //       ],
  //     },
  //     {
  //       results: [
  //         {
  //           board_id: 1,
  //           title: '루미키 65배열 크림 하우징 후기',
  //           preview:
  //             '루미키 65 하우징 후기입니다. HMX Emo 스위치를 적용한 보드로, 타건감, 통울림, 흡음이 인상적이며...',
  //           created_at: '2025-08-12 08:00',
  //           author_id_id: 'wldus4225',
  //           category: '전체공개',
  //           image_url: '/images/sample.jpg',
  //           comments_count: 2,
  //           bookmarks: 3,
  //         },
  //       ],
  //     },
  //     {
  //       results: [
  //         {
  //           board_id: 1,
  //           title: '루미키 65배열 크림 하우징 후기',
  //           preview:
  //             '루미키 65 하우징 후기입니다. HMX Emo 스위치를 적용한 보드로, 타건감, 통울림, 흡음이 인상적이며...',
  //           created_at: '2025-08-12 08:00',
  //           author_id_id: 'wldus4225',
  //           category: '전체공개',
  //           image_url: '/images/sample.jpg',
  //           comments_count: 2,
  //           bookmarks: 3,
  //         },
  //       ],
  //     },
  //     {
  //       results: [
  //         {
  //           board_id: 1,
  //           title: '루미키 65배열 크림 하우징 후기',
  //           preview:
  //             '루미키 65 하우징 후기입니다. HMX Emo 스위치를 적용한 보드로, 타건감, 통울림, 흡음이 인상적이며...',
  //           created_at: '2025-08-12 08:00',
  //           author_id_id: 'wldus4225',
  //           category: '전체공개',
  //           image_url: '/images/sample.jpg',
  //           comments_count: 2,
  //           bookmarks: 3,
  //         },
  //       ],
  //     },
  //     {
  //       results: [
  //         {
  //           board_id: 1,
  //           title: '루미키 65배열 크림 하우징 후기',
  //           preview:
  //             '루미키 65 하우징 후기입니다. HMX Emo 스위치를 적용한 보드로, 타건감, 통울림, 흡음이 인상적이며...',
  //           created_at: '2025-08-12 08:00',
  //           author_id_id: 'wldus4225',
  //           category: '전체공개',
  //           image_url: '/images/sample.jpg',
  //           comments_count: 20,
  //           bookmarks: 3,
  //         },
  //       ],
  //     },
  //   ],
  //   next_cursor: 2, // => 다음 커서 번호
  //   has_next: true, // => 다음 데이터가 있는지
  //   total_results: 23, // => 총 몇 개의 검색 결과가 있는지
  // };

  const {sort, handleChange} = useSelectSortOption({
    options: {
      page: '1',
    },
  });

  const {data, hasNextPage, fetchNextPage, isFetchingNextPage} = useGetPostsByUser(userEmail);
  console.log(data);

  const observerRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (!node) return;

      const observer = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      });

      observer.observe(node);

      return () => observer.disconnect();
    },
    [hasNextPage, fetchNextPage],
  );
  // 예외처리
  if (data.pages[0].results.length === 0) {
    return (
      <NoSearchResults
        title={`아직 ${userEmail}님의 게시글이 등록되지 않았어요.`}
        description="다른 사용자들의 게시글을 클릭해 리뷰를 확인해보세요!"
      />
    );
  }

  return (
    <section className="px-4 md:px-6 lg:px-12">
      <header className="flex justify-between items-end mb-4">
        <h3 className="text-lg md:text-xl font-semibold">
          전체 게시글 수 <span className="text-primary text-boldBlue font-bold"> {data.pages[0].total_results}</span>
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
                <UserPost userReview={review} priority={shouldPrioritize} />
              </li>
            );
          }),
        )}
      </ul>
      {hasNextPage ? (
        <div className="w-full mt-6" ref={observerRef}>
          {/* TODO:  ReviewArticleLoading skeleton ui 만들어서 변경해주기*/}
          {isFetchingNextPage && Array.from({length: 3}, (_, idx) => <UserPostLoading key={idx} />)}
        </div>
      ) : (
        data.pages.length > 1 && (
          <div className="w-full flex flex-col justify-center items-center">
            <p className="font-semibold text-lg md:text-xl mt-4 md:mt-3">더 이상 불러올 게시글이 없어요.</p>
            <p className="text-muted-foreground mt-1">다른 카테고리를 클릭해 리뷰를 확인해보세요!</p>
          </div>
        )
      )}
    </section>
  );
}
