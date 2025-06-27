'use client';

import {Category} from '@/entities/review/model/type';
import useDeleteReview from '@/entities/review/model/useDeleteReview';

type Props = {
  category: Category;
  reviewId: number;
};

export default function DeleteButton({category, reviewId}: Props) {
  const {deleteReview, isPending} = useDeleteReview();

  const handleDelete = () => {
    deleteReview({category, reviewId});
  };

  return (
    <button className="text-gray-500 hover:text-gray-700" onClick={handleDelete} disabled={isPending}>
      {isPending ? '삭제 중' : '삭제'}
    </button>
  );
}
