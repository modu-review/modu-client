'use client';

import {useCallback} from 'react';
import {NoSearchResults} from '@/entities/reviews';
import {SelectSortOptions, SortButtons, useSelectSortOption} from '@/features/reviews/sorting';
import {useGetPostsByUser, UserPost} from '@/entities/users';
import UserPostLoading from '@/entities/users/ui/UserPostLoading';
import {useMediaQuery} from '@/shared/hooks/useMediaQuery';

type Props = {
  userId: string;
};

export default function UserPostsList({userId}: Props) {
  const {sort, handleChange} = useSelectSortOption({
    options: {
      page: '1',
    },
  });

  const isMobile = useMediaQuery('(max-width: 768px)');

  const {data, hasNextPage, fetchNextPage, isFetchingNextPage} = useGetPostsByUser(userId, sort);

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
        title={`아직 ${userId}님의 게시글이 등록되지 않았어요.`}
        description="다른 사용자들의 게시글을 클릭해 리뷰를 확인해보세요!"
      />
    );
  }

  return (
    <section className="px-4 md:px-6 lg:px-12">
      <header className="flex justify-between items-end mb-4">
        <h3 className="text-lg md:text-xl font-semibold">
          전체 게시글 수 <span className=" text-boldBlue font-extrabold"> ({data.pages[0].total_results})</span>
        </h3>
      </header>
      <div className="flex justify-end">
        {isMobile ? (
          <SelectSortOptions className="ml-auto mb-6 md:mr-5" sort={sort} onValueChange={handleChange} />
        ) : (
          <SortButtons className="ml-auto mb-6 md:mr-5" sort={sort} onValueChange={handleChange} />
        )}
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
          {isFetchingNextPage && Array.from({length: 3}, (_, idx) => <UserPostLoading key={idx} />)}
        </div>
      ) : (
        data.pages.length > 1 && (
          <div className="w-full flex flex-col justify-center items-center my-20">
            <p className="font-semibold text-lg md:text-xl mt-4 md:mt-3">- 끝 -</p>
            <p className="text-muted-foreground mt-1">더 이상 불러올 게시글이 없어요.</p>
          </div>
        )
      )}
    </section>
  );
}
