'use client';

import {useIsLoggedIn} from '@/entities/auth';
import {Textarea} from '@/shared/shadcnComponent/ui/textarea';

export default function CommentsInput() {
  const isLoggedIn = useIsLoggedIn();

  return (
    <Textarea
      className="w-full h-32 mt-4 mb-6 resize-none"
      placeholder={isLoggedIn ? '댓글을 입력해주세요.' : '로그인 후 댓글을 작성할 수 있어요.'}
      disabled={!isLoggedIn}
    />
  );
}
