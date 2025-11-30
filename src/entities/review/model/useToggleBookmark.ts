import {reviewsQueryKeys} from '@/entities/reviews';
import {bookmarkReview, unBookmarkReview} from '../apis/api-service';
import {reviewQueryKeys} from './query-service';
import {BookmarkPayload, ReviewBookmarks} from './type';
import {useMutation, useQueryClient} from '@tanstack/react-query';

type MutationVariables = {
  hasBookmarked: boolean;
} & BookmarkPayload;

export default function useToggleBookmark() {
  const queryClient = useQueryClient();

  const {mutate, ...rest} = useMutation({
    mutationFn: ({reviewId, hasBookmarked}: MutationVariables) => {
      if (hasBookmarked) {
        return unBookmarkReview({reviewId});
      } else {
        return bookmarkReview({reviewId});
      }
    },
    onMutate: async ({reviewId}) => {
      await queryClient.cancelQueries({queryKey: reviewQueryKeys.bookmarks(reviewId)});

      const previousBookmarks = queryClient.getQueryData<ReviewBookmarks>(reviewQueryKeys.bookmarks(reviewId));

      if (previousBookmarks) {
        const updatedBookmarks: ReviewBookmarks = {
          bookmarks: previousBookmarks.bookmarks + (previousBookmarks.hasBookmarked ? -1 : 1),
          hasBookmarked: !previousBookmarks.hasBookmarked,
        };

        queryClient.setQueryData(reviewQueryKeys.bookmarks(reviewId), updatedBookmarks);
      }

      return {previousBookmarks};
    },
    onSuccess: (_, {reviewId}) => {
      const invalidateKeys = [reviewsQueryKeys.myBookmarks.all(), reviewQueryKeys.bookmarks(reviewId)];

      invalidateKeys.forEach(key => {
        queryClient.invalidateQueries({queryKey: key});
      });
    },
    onError: (_, {reviewId}, context) => {
      if (context) {
        queryClient.setQueryData(reviewQueryKeys.bookmarks(reviewId), context.previousBookmarks);
      }
    },
  });

  const toggleBookmark = (payload: BookmarkPayload) => {
    const currentData = queryClient.getQueryData<ReviewBookmarks>(reviewQueryKeys.bookmarks(payload.reviewId));
    const hasBookmarked = currentData ? currentData.hasBookmarked : false;

    mutate({
      ...payload,
      hasBookmarked,
    });
  };

  return {
    toggleBookmark,
    ...rest,
  };
}
