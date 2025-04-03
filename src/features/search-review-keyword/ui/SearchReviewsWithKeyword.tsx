'use client';

import {useSearchParams} from 'next/navigation';
import Pagination from '@/widgets/pagination';
import {ReviewArticle, useSearchReviewsWithKeyword} from '@/entities/reviews';

type Props = {
  keyword: string;
};

export default function SearchReviewsWithKeyword({keyword}: Props) {
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;

  const {results, total_pages} = useSearchReviewsWithKeyword(keyword, currentPage);

  return (
    <section className="p-3 mt-9 md:mt-12">
      <ul className="flex flex-col mb-6">
        {results.map(searchReview => (
          <li key={searchReview.board_id}>
            <ReviewArticle searchReview={searchReview} />
          </li>
        ))}
      </ul>
      <Pagination currentPage={currentPage} totalPage={total_pages} query={keyword} />
    </section>
  );
}
