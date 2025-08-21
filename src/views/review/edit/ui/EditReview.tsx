import EditReviewClient from './EditReviewClient';
import {getReviewDetail} from '@/entities/review';

type Props = {
  reviewId: number;
  sessionUserNickname: string;
};

export default async function EditReview({reviewId, sessionUserNickname}: Props) {
  const data = await getReviewDetail(reviewId);

  if (data.author_nickname !== sessionUserNickname) {
    throw new Error('작성자만 리뷰를 수정할 수 있습니다.');
  }

  return <EditReviewClient data={data} reviewId={reviewId} />;
}
