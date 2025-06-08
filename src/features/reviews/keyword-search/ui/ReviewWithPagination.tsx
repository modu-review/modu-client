'use client';

import {useParams, useSearchParams} from 'next/navigation';
import Pagination from '@/widgets/pagination';
import {SortKey} from '@/features/reviews/sorting';
import {ReviewArticle, useKeywordReviews} from '@/entities/reviews';

type Props = {
  sort: SortKey;
};

export default function ReviewWithPagination({sort}: Props) {
  const {keyword} = useParams<{keyword: string}>();
  const searchParams = useSearchParams();

  const currentPage = Number(searchParams.get('page')) || 1;
  const {results, total_pages} = useKeywordReviews(keyword, currentPage, sort);

  return (
    <ul className="flex flex-col mb-6">
      {results.map(searchReview => (
        <li key={searchReview.board_id}>
          <ReviewArticle searchReview={searchReview} />
        </li>
      ))}
      <Pagination currentPage={currentPage} totalPage={total_pages} query={keyword} sort={sort} />
    </ul>
  );
}
