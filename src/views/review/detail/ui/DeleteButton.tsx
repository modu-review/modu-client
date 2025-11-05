'use client';

import {Category, useDeleteReview} from '@/entities/review';
import {LoadingSpinner} from '@/shared/ui/components';
import {ConfirmDeleteTrigger} from '@/shared/ui/modal';

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
    <>
      <ConfirmDeleteTrigger onConfirm={handleDelete} isPending={isPending} label="리뷰 삭제">
        {props => (
          <button {...props} className="text-gray-500 hover:text-gray-700">
            삭제
          </button>
        )}
      </ConfirmDeleteTrigger>
      {isPending && (
        <section className="fixed inset-0 z-50 bg-black/70">
          <LoadingSpinner text="리뷰를 삭제 중이에요." className="text-white" />
        </section>
      )}
    </>
  );
}
