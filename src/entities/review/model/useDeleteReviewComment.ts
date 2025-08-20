import {useMutation, useQueryClient} from '@tanstack/react-query';
import {DeleteCommentPayload} from './type';
import {deleteReviewComment} from '../apis/api-service';
import toast from '@/shared/lib/utils/toastService';
import {reviewQueryKeys} from './query-service';

export default function useDeleteReviewComment() {
  const queryClient = useQueryClient();

  const {mutate, ...rest} = useMutation({
    mutationFn: ({commentId, reviewId}: DeleteCommentPayload) => deleteReviewComment({commentId, reviewId}),
    onSuccess: (_data, {reviewId}) => {
      toast.success({
        title: '댓글을 성공적으로 삭제했어요.',
      });

      queryClient.invalidateQueries({queryKey: reviewQueryKeys.comments.all(reviewId)});
    },
  });

  return {
    deleteReviewComment: mutate,
    ...rest,
  };
}
