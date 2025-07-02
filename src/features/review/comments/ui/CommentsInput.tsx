'use client';

import {useUserEmail} from '@/entities/auth';
import {Category, usePostReviewComment} from '@/entities/review';
import {Textarea} from '@/shared/shadcnComponent/ui/textarea';
import {useRef} from 'react';

type Props = {
  reviewId: number;
  category: Category;
  page: number;
  openLoginModal: () => void;
};

export default function CommentsInput({reviewId, category, page, openLoginModal}: Props) {
  const userEmail = useUserEmail();

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const {postComment} = usePostReviewComment(page);

  const handleSubmit = () => {
    if (!textareaRef.current || !userEmail) return;

    const commentContent = textareaRef.current.value.trim();
    if (commentContent.length === 0) return;

    postComment({userEmail, reviewId, category, content: commentContent});
    textareaRef.current.value = '';
  };

  const handleTextareaClick = () => {
    if (!userEmail) {
      openLoginModal();
    }
  };

  return (
    <section className="relative mt-4 mb-6">
      <Textarea
        className={`w-full h-32 resize-none transition-colors ${
          !userEmail
            ? 'cursor-pointer bg-gray-50 hover:bg-gray-100 focus-visible:ring-0'
            : 'focus:ring-2 focus:ring-boldBlue'
        }`}
        placeholder={userEmail ? '댓글을 입력해주세요.' : '로그인 후 댓글을 작성할 수 있어요.'}
        aria-label={userEmail ? '댓글을 입력해주세요.' : '로그인 후 댓글을 작성할 수 있어요.'}
        readOnly={!userEmail}
        tabIndex={userEmail ? 0 : -1}
        spellCheck="false"
        ref={textareaRef}
        onClick={handleTextareaClick}
      />
      <button
        className="absolute right-4 bottom-3 text-sm bg-boldBlue text-white px-7 py-1.5 rounded-2xl hover:bg-boldBlue/90 transition-colors disabled:pointer-events-none disabled:opacity-50"
        aria-label={userEmail ? '댓글 등록' : '로그인 후 댓글을 등록할 수 있어요.'}
        type="button"
        tabIndex={userEmail ? 0 : -1}
        disabled={!userEmail}
        aria-disabled={!userEmail}
        onClick={handleSubmit}
      >
        등록
      </button>
    </section>
  );
}
