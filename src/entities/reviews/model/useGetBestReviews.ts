import {useSuspenseQuery} from '@tanstack/react-query';
import {reviewQueryOptions} from './query-service';

function useGetBestReviews() {
  const {data} = useSuspenseQuery(reviewQueryOptions.best());

  return data;
}

export default useGetBestReviews;
