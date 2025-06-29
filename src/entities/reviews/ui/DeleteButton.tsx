'use client';

import {Category} from '@/entities/review/model/type';
import useDeleteReview from '@/entities/review/model/useDeleteReview';
import {LoadingSpinner} from '@/shared/ui/components';
import {useEffect} from 'react';

type Props = {
  category: Category;
  reviewId: number;
};

export default function DeleteButton({category, reviewId}: Props) {
  const {deleteReview, isPending} = useDeleteReview();

  const handleDelete = () => {
    deleteReview({category, reviewId});
  };

  useEffect(() => {
    const prevHtmlOverflow = document.documentElement.style.overflow;

    if (isPending) {
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.documentElement.style.overflow = prevHtmlOverflow;
    }
  }, [isPending]);

  return (
    <>
      <button className="text-gray-500 hover:text-gray-700" onClick={handleDelete} disabled={isPending}>
        삭제
      </button>
      {isPending && (
        <section className="fixed inset-0 z-50 bg-black/70">
          <LoadingSpinner text="리뷰를 삭제 중이에요." className="text-white" />
        </section>
      )}
    </>
  );
}
