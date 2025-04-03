import {ReviewArticle, ReviewArticleLoading} from '@/entities/reviews';
import useSearchReviews from '@/entities/reviews/model/useSearchReviews';

import {useCallback} from 'react';

type Props = {
  selectedCategory: string;
};

export default function ReviewsWithScroll({selectedCategory}: Props) {
  const {data, hasNextPage, fetchNextPage, isFetchingNextPage} = useSearchReviews(selectedCategory);

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
      <ul className="px-3 py-14">
        {data.pages.map(page =>
          page.results.map(review => (
            <li key={review.board_id}>
              <ReviewArticle searchReview={review} />
            </li>
          )),
        )}
      </ul>
      <div className="h-[250px] w-full mt-6" ref={observerRef}>
        {isFetchingNextPage && <ReviewArticleLoading />}
      </div>
    </>
  );
}
