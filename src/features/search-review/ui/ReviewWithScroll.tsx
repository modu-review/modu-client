import {useCallback} from 'react';
import {SortKey} from '@/features/review-sorting';
import {ReviewArticle, ReviewArticleLoading, useSearchReviews} from '@/entities/reviews';
import {LucideIcon} from '@/shared/ui/icons';

type Props = {
  selectedCategory: string;
  sort: SortKey;
};

export default function ReviewsWithScroll({selectedCategory, sort}: Props) {
  const {data, hasNextPage, fetchNextPage, isFetchingNextPage} = useSearchReviews(selectedCategory, sort);

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

  return (
    <>
      <ul>
        {data.pages.map(page =>
          page.results.map(review => (
            <li key={review.board_id}>
              <ReviewArticle searchReview={review} />
            </li>
          )),
        )}
      </ul>
      {hasNextPage ? (
        <div className="h-[550px] w-full mt-6" ref={observerRef}>
          {isFetchingNextPage && <ReviewArticleLoading />}
        </div>
      ) : (
        <div className="w-full flex flex-col justify-center items-center mt-10">
          <LucideIcon name="PackageOpen" className="w-32 h-32" />
          <p className="md:text-lg mt-3 mb-6">모든 게시글을 조회했어요.</p>
        </div>
      )}
    </>
  );
}
