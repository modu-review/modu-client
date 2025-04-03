import {useSuspenseQuery} from '@tanstack/react-query';
import {reviewQueryOptions} from './query-service';

type Props = {
  query: string;
  page: number;
};

function useSearchReviewsWithQuery({query, page}: Props) {
  return useSuspenseQuery(reviewQueryOptions.search(query, page));
}

export default useSearchReviewsWithQuery;
