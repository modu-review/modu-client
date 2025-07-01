'use client';

import {useMutation, useQueryClient} from '@tanstack/react-query';
import {useRouter} from 'next/navigation';
import {deleteReview} from '../apis/api-service';
import {Category} from './type';
import toast from '@/shared/lib/utils/toastService';
import {reviewsQueryKeys} from '@/entities/reviews';

type MutationVariables = {
  category: Category;
  reviewId: number;
};

export default function useDeleteReview() {
  const queryClient = useQueryClient();
  const router = useRouter();

  const {mutate, ...rest} = useMutation({
    mutationFn: ({reviewId}: MutationVariables) => deleteReview(reviewId),
    onSuccess: (_data, {category}) => {
      toast.success({
        title: '리뷰를 성공적으로 삭제했어요.',
      });

      const invalidateKeys = [
        reviewsQueryKeys.category.category('all'),
        reviewsQueryKeys.category.category(category),
        reviewsQueryKeys.keyword.all(),
      ];

      invalidateKeys.forEach(key => {
        queryClient.invalidateQueries({queryKey: key});
      });

      router.push('/search');
    },
  });

  return {
    deleteReview: mutate,
    ...rest,
  };
}
