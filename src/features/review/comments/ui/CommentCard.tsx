import {Comment, useDeleteReviewComment} from '@/entities/review';
import {Avatar} from '@/shared/ui/components';
import {Modal, useModal, DeleteConfirmModal} from '@/shared/ui/modal';

type Props = {
  comment: Comment;
  userEmail: string | null;
  reviewId: number;
};

export default function CommentCard({comment, userEmail, reviewId}: Props) {
  const {author_id, author_email, content, created_at, profile_image} = comment;
  const isAuthor = userEmail === author_email;

  const {deleteReviewComment, isPending} = useDeleteReviewComment();
  const {openModal, handleModalOpen, handleModalClose} = useModal();

  const handleDelete = () => {
    if (!userEmail) return;

    deleteReviewComment({
      commentId: comment.id,
      reviewId,
      userEmail,
    });

    handleModalClose();
  };

  return (
    <>
      <div className="flex min-h-[100px] gap-3 mx-2 px-3 pt-5 mb-5 bg-slate-100 rounded-lg relative">
        {isPending && <div className="z-10 absolute inset-0 bg-gray-300/50 rounded-lg animate-pulse" />}
        {openModal && (
          <Modal onClose={handleModalClose}>
            <DeleteConfirmModal
              onDelete={handleDelete}
              onDeleteCancel={handleModalClose}
              text="삭제된 댓글은 복구할 수 없어요."
            />
          </Modal>
        )}
        <Avatar src={profile_image} alt={`${author_id}님의 프로필 이미지`} />
        <article className="w-full flex flex-col">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-sm md:text-base font-semibold">{author_id}</span>
            <time className="text-xs md:text-sm text-gray-500" dateTime={created_at}>
              ({created_at})
            </time>
          </div>
          <p className="text-sm md:text-base flex-1">{content}</p>
          {isAuthor && (
            <section className="flex items-center gap-2 justify-end my-3 pr-2 text-sm text-gray-500 transition-colors">
              <button
                className="hover:text-gray-700"
                onClick={handleModalOpen}
                disabled={isPending}
                tabIndex={isPending ? -1 : 0}
                aria-label="리뷰 삭제"
                aria-disabled={isPending}
              >
                삭제
              </button>
            </section>
          )}
        </article>
      </div>
      <div className="w-full h-[1.5px] bg-gray-300" />
    </>
  );
}
