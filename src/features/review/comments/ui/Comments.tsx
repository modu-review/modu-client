'use client';

import {useGetReviewComments} from '@/entities/review';
import {useSearchParams} from 'next/navigation';

type Props = {
  reviewId: number;
};

export default function Comments({reviewId}: Props) {
  const searchParams = useSearchParams();

  const currentPage = Number(searchParams.get('page')) || 1;
  const {comments, comments_count, total_pages} = useGetReviewComments(reviewId, currentPage);

  return (
    <section className="w-full px-6">
      <h2 className="mr-auto text-xl border-b-2">
        댓글쓰기 <span className="text-lg">{comments_count}</span>
      </h2>
    </section>
  );
}
