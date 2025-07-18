'use client';

import {useSearchParams} from 'next/navigation';
import CommentsInput from './CommentsInput';
import {Category, useGetReviewComments} from '@/entities/review';
import CommentsList from './CommentsList';

type Props = {
  reviewId: number;
  category: Category;
  openLoginModal: () => void;
};

export default function Comments({reviewId, category, openLoginModal}: Props) {
  const searchParams = useSearchParams();

  const currentPage = Number(searchParams.get('page')) || 1;
  const {comments, comments_count, total_pages} = useGetReviewComments(reviewId, currentPage);

  const isCommentsEmpty = comments.length === 0 && total_pages === 0;

  return (
    <section className="w-full px-2.5 md:px-6">
      <h2 className="mr-auto text-xl pb-1.5 border-b-2">
        댓글쓰기 <span className="text-lg">{comments_count}</span>
      </h2>
      <CommentsInput reviewId={reviewId} category={category} page={currentPage} openLoginModal={openLoginModal} />
      {!isCommentsEmpty && (
        <CommentsList comments={comments} currentPage={currentPage} totalPages={total_pages} reviewId={reviewId} />
      )}
    </section>
  );
}
