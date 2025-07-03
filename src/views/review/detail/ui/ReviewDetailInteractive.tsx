'use client';

import {useEffect, useState} from 'react';
import {LoginModal} from '@/widgets/login-modal';
import {Bookmarks, BookmarksLoading} from '@/features/review/bookmarks';
import {Comments, CommentsLoading} from '@/features/review/comments';
import {Category} from '@/entities/review';
import {RQProvider} from '@/shared/providers';
import {Modal, useModal} from '@/shared/ui/modal';

type Props = {
  reviewId: number;
  category: Category;
};

export default function ReviewDetailInteractive({reviewId, category}: Props) {
  const [isClient, setIsClient] = useState(false);
  const {openModal: openLoginModal, handleModalOpen, handleModalClose} = useModal();

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <>
        <BookmarksLoading />
        <CommentsLoading />
      </>
    );
  }

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
          <LoginModal onClose={handleModalClose} />
        </Modal>
      )}
    </>
  );
}
