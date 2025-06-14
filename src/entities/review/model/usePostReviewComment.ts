'use client';

import {useRouter} from 'next/navigation';
import {postReviewComment} from '../apis/api-service';
import {reviewQueryKeys} from './query-service';
import {CommentPayload, ReviewComments} from './type';
import {useMutation, useQueryClient} from '@tanstack/react-query';

export default function usePostReviewComment(page: number) {
  const queryClient = useQueryClient();
  const router = useRouter();

  const {mutate, ...rest} = useMutation({
    mutationFn: ({userId, reviewId, category, content}: CommentPayload) =>
      postReviewComment({userId, reviewId, category, content}),
    onMutate: async ({userId, reviewId, content}) => {
      const previousComments = queryClient.getQueryData<ReviewComments>(reviewQueryKeys.comments(reviewId, page));

      if (!previousComments || page !== previousComments.total_pages) {
        return {previousComments, wasNewPageCreated: false};
      }

      const newComment = {
        id: Date.now(),
        profile_image: 'https://picsum.photos/seed/picsum/200/200', // TODO: 실제 사용자 프로필 이미지로 변경.
        author: userId,
        content,
        created_at: new Date().toISOString(),
      };
      const wasNewPageCreated = previousComments.comments.length === 8;

      if (wasNewPageCreated) {
        const updatedComments = {
          comments_count: previousComments.comments_count + 1,
          comments: [newComment],
          current_page: previousComments.current_page + 1,
          total_pages: previousComments.total_pages + 1,
        };

        queryClient.setQueryData(reviewQueryKeys.comments(reviewId, page + 1), updatedComments);

        router.push(`?page=${page + 1}`, {scroll: false});
      } else {
        await queryClient.cancelQueries({queryKey: reviewQueryKeys.comments(reviewId, page)});

        const updatedComments = {
          ...previousComments,
          comments_count: previousComments.comments_count + 1,
          comments: [...previousComments.comments, newComment],
        };

        queryClient.setQueryData(reviewQueryKeys.comments(reviewId, page), updatedComments);
      }

      return {previousComments, wasNewPageCreated};
    },
    onSuccess: (_, {reviewId}) => {
      queryClient.invalidateQueries({queryKey: [`review-${reviewId}`, 'comments']});
    },
    onError: (_, {reviewId}, context) => {
      if (!context) return;

      const {previousComments, wasNewPageCreated} = context;

      if (wasNewPageCreated) {
        queryClient.removeQueries({queryKey: reviewQueryKeys.comments(reviewId, page + 1)});

        router.push(`?page=${page}`, {scroll: false});
      } else {
        queryClient.setQueryData(reviewQueryKeys.comments(reviewId, page), previousComments);
      }
    },
  });

  return {
    postComment: mutate,
    ...rest,
  };
}
