import {Suspense} from 'react';
import {cookies} from 'next/headers';
import {LoadingSpinner} from '@/shared/ui/components';

type Props = {
  params: Promise<{reviewId: string}>;
};

export default async function ReviewEditPage({params}: Props) {
  const {reviewId} = await params;
  const parsedReviewId = Number(reviewId);

  const cookieStore = await cookies();
  const sessionUserEmail = cookieStore.get('userEmail');

  if (!sessionUserEmail) {
    throw new Error('로그인 세션이 만료되었습니다. 다시 로그인해주세요.');
  }

  return (
    <section className="fixed inset-0 bg-white">
      <Suspense fallback={<LoadingSpinner text="리뷰 정보를 불러오고 있어요." />}>
        {/* TODO: 에디터 컴포넌트를 사용한 리뷰 수정 기능 구현 */}
      </Suspense>
    </section>
  );
}
