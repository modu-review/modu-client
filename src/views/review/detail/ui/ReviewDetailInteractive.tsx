'use client';

import {Bookmarks, BookmarksLoading} from '@/features/review/bookmarks';
import {Comments, CommentsLoading} from '@/features/review/comments';
import {Category} from '@/entities/review';
import {RQProvider} from '@/shared/providers';
import {Modal, useModal} from '@/shared/ui/modal';
import {LoginModal} from '@/widgets/login-modal';

type Props = {
  reviewId: number;
  category: Category;
};

export default function ReviewDetailInteractive({reviewId, category}: Props) {
  const {openModal: openLoginModal, handleModalOpen, handleModalClose} = useModal();

  return (
    <>
      <RQProvider LoadingFallback={<BookmarksLoading />}>
        <Bookmarks reviewId={reviewId} openLoginModal={handleModalOpen} />
      </RQProvider>
      <RQProvider LoadingFallback={<CommentsLoading />}>
        <Comments reviewId={reviewId} category={category} openLoginModal={handleModalOpen} />
      </RQProvider>
      {openLoginModal && (
        <Modal onClose={handleModalClose}>
          <LoginModal />
        </Modal>
      )}
    </>
  );
}
