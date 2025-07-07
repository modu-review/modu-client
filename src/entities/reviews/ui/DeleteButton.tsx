'use client';

import {Category} from '@/entities/review/model/type';
import useDeleteReview from '@/entities/review/model/useDeleteReview';
import {LoadingSpinner} from '@/shared/ui/components';
import {DeleteConfirmModal, Modal, useModal} from '@/shared/ui/modal';

type Props = {
  category: Category;
  reviewId: number;
};

export default function DeleteButton({category, reviewId}: Props) {
  const {deleteReview, isPending} = useDeleteReview();
  const {openModal, handleModalOpen, handleModalClose} = useModal();

  const handleDelete = () => {
    deleteReview({category, reviewId});

    handleModalClose();
  };

  return (
    <>
      <button
        className="text-gray-500 hover:text-gray-700"
        onClick={handleModalOpen}
        disabled={isPending}
        tabIndex={isPending ? -1 : 0}
        aria-label="리뷰 삭제"
        aria-disabled={isPending}
      >
        삭제
      </button>
      {isPending && (
        <section className="fixed inset-0 z-50 bg-black/70">
          <LoadingSpinner text="리뷰를 삭제 중이에요." className="text-white" />
        </section>
      )}
      {openModal && (
        <Modal onClose={handleModalClose}>
          <DeleteConfirmModal
            onDelete={handleDelete}
            onDeleteCancel={handleModalClose}
            text="삭제된 리뷰는 복구할 수 없어요."
          />
        </Modal>
      )}
    </>
  );
}
