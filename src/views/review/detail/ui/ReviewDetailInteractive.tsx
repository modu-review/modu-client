'use client';

import dynamic from 'next/dynamic';
import {BookmarksLoading} from '@/features/review/bookmarks';
import {CommentsLoading} from '@/features/review/comments';
import {useLoginModal} from '@/features/auth';
import {Category} from '@/entities/review';
import {RQProvider} from '@/shared/providers';

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
  const {isOpenLoginModal, openLoginModal, renderLoginModal} = useLoginModal();

  return (
    <>
      <RQProvider LoadingFallback={<BookmarksLoading />}>
        <Bookmarks reviewId={reviewId} openLoginModal={openLoginModal} />
      </RQProvider>
      <RQProvider LoadingFallback={<CommentsLoading />}>
        <Comments reviewId={reviewId} category={category} openLoginModal={openLoginModal} />
      </RQProvider>
      {isOpenLoginModal && renderLoginModal()}
    </>
  );
}
