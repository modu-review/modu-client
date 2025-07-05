'use client';

import dynamic from 'next/dynamic';
import {LoginModal} from '@/widgets/login-modal';
import {BookmarksLoading} from '@/features/review/bookmarks';
import {CommentsLoading} from '@/features/review/comments';
import {Category} from '@/entities/review';
import {RQProvider} from '@/shared/providers';
import {Modal, useModal} from '@/shared/ui/modal';

const Bookmarks = dynamic(() => import('@/features/review/bookmarks/ui/Bookmarks'), {
  ssr: false,
  loading: () => <BookmarksLoading />,
});

const Comments = dynamic(() => import('@/features/review/comments/ui/Comments'), {
  ssr: false,
  loading: () => <CommentsLoading />,
});

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
          <LoginModal onClose={handleModalClose} />
        </Modal>
      )}
    </>
  );
}
