import {useCallback} from 'react';
import {SortKey} from '@/features/reviews/sorting';
import {NoSearchResults, ReviewArticle, ReviewArticleLoading, useCategoryReviews} from '@/entities/reviews';
import {LucideIcon} from '@/shared/ui/icons';

type Props = {
  selectedCategory: string;
  sort: SortKey;
};

export default function ReviewsWithScroll({selectedCategory, sort}: Props) {
  const {data, hasNextPage, fetchNextPage, isFetchingNextPage} = useCategoryReviews(selectedCategory, sort);

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

  if (data.pages[0].results.length === 0) {
    return (
      <NoSearchResults
        title="아직 해당 카테고리에 리뷰가 등록되지 않았어요."
        description="다른 카테고리를 클릭해 리뷰를 확인해보세요!"
      />
    );
  }

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
          <LucideIcon name="PackageOpen" className="w-20 h-20" />
          <p className="md:text-lg mt-3 mb-6">모든 게시글을 조회했어요.</p>
        </div>
      )}
    </>
  );
}
