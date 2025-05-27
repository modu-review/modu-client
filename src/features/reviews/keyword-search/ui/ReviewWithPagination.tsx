'use client';

import {useParams, useSearchParams} from 'next/navigation';
import Pagination from '@/widgets/pagination';
import {SortKey} from '@/features/reviews/sorting';
import {ReviewArticle, useSearchReviewsWithKeyword} from '@/entities/reviews';

type Props = {
  sort: SortKey;
};

export default function ReviewWithPagination({sort}: Props) {
  const {keyword} = useParams<{keyword: string}>();
  const searchParams = useSearchParams();

  const currentPage = Number(searchParams.get('page')) || 1;
  const {content, total_pages} = useSearchReviewsWithKeyword(keyword, currentPage, sort);

  return (
    <ul className="flex flex-col mb-6">
      {content.map(searchReview => (
        <li key={searchReview.board_id}>
          <ReviewArticle searchReview={searchReview} />
        </li>
      ))}
      <Pagination
        currentPage={currentPage}
        totalPages={total_pages}
        generateUrl={(page: number) => `/search/${keyword}?page=${page}&sort=${sort}`}
      />
    </ul>
  );
}
