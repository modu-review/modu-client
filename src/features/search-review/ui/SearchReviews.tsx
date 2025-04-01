'use client';

import useSearchReviewsWithQuery from '@/entities/reviews';
import Pagination from '@/widgets/pagination';
import {useSearchParams} from 'next/navigation';

type Props = {
  query: string;
};

export default function SearchReviews({query}: Props) {
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;
  const {
    data: {results, total_pages},
  } = useSearchReviewsWithQuery({query, page: currentPage});

  // Todo: 페이지네이션을 구현한다. (useSearchParams를 통해 페이지를 전달받는다.)

  return (
    <section className="p-4">
      <ul className="flex flex-col gap-4 mb-4">
        {results.map(({board_id, title, content}) => (
          <li key={board_id}>
            <h3>{title}</h3>
            <p>{content}</p>
          </li>
        ))}
      </ul>
      <Pagination />
    </section>
  );
}
