import {ReviewPayload, usePostReview} from '@/entities/review';

function useSaveReview() {
  const {postReview, isPending} = usePostReview();

  const saveReview = (data: ReviewPayload) => {
    postReview(data);
  };

  return {isPending, saveReview};
}

export default useSaveReview;
