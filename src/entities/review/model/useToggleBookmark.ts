import {bookmarkReview} from '../apis/api-service';
import {reviewQueryKeys} from './query-service';
import {BookmarkPayload, ReviewBookmarks} from './type';
import {useMutation, useQueryClient} from '@tanstack/react-query';

export default function useToggleBookmark() {
  const queryClient = useQueryClient();

  const {mutate, ...rest} = useMutation({
    mutationFn: ({userId, reviewId}: BookmarkPayload) => bookmarkReview({userId, reviewId}),
    onMutate: async ({reviewId}) => {
      await queryClient.cancelQueries({queryKey: reviewQueryKeys.bookmarks(reviewId)});

      const previousBookmarks = queryClient.getQueryData<ReviewBookmarks>(reviewQueryKeys.bookmarks(reviewId));

      console.log(previousBookmarks);

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
      queryClient.invalidateQueries({queryKey: reviewQueryKeys.bookmarks(reviewId)});
    },
    onError: (_, {reviewId}, context) => {
      if (context) {
        queryClient.setQueryData(reviewQueryKeys.bookmarks(reviewId), context.previousBookmarks);
      }
    },
  });

  return {
    toggleBookmark: mutate,
    ...rest,
  };
}
