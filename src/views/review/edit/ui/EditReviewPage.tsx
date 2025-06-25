import {Suspense} from 'react';
import EditReview from './EditReview';
import {LoadingSpinner} from '@/shared/ui/components';
import getSessionUserEmail from '@/shared/lib/utils/getSessionUserEmail';

type Props = {
  params: Promise<{reviewId: string}>;
};

export default async function ReviewEditPage({params}: Props) {
  const {reviewId} = await params;
  const parsedReviewId = Number(reviewId);

  const sessionUserEmail = await getSessionUserEmail();

  if (!sessionUserEmail) {
    throw new Error('로그인 세션이 만료되었습니다. 다시 로그인해주세요.');
  }

  return (
    <section className="fixed inset-0 bg-white">
      <Suspense fallback={<LoadingSpinner text="리뷰 정보를 불러오고 있어요." />}>
        <EditReview reviewId={parsedReviewId} sessionUserEmail={sessionUserEmail} />
      </Suspense>
    </section>
  );
}
