'use client';

import Pagination from '@/widgets/pagination';
import {useSearchParams} from 'next/navigation';

type Props = {
  query: string;
};

export default function SearchReviews({query}: Props) {
  const currentPage = Number(useSearchParams().get('page')) || 1;
  // Todo: 검색어(query)를 기반으로 리뷰를 검색하는 API를 호출해 데이터를 불러온다. (페이지를 전달해 해당 페이지의 리뷰를 불러온다. 초기값 1)

  // Todo: 페이지네이션을 구현한다. (useSearchParams를 통해 페이지를 전달받는다.)

  return (
    <section>
      {/* Todo: 검색 결과를 표시한다. */}
      <Pagination />
    </section>
  );
}
