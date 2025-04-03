import useSearchReviews from '@/entities/reviews/model/useSearchReviews';

type Props = {
  selectedCategory: string;
};

export default function ReviewsWithScroll({selectedCategory}: Props) {
  const {data, hasNextPage, fetchNextPage, isFetchingNextPage} = useSearchReviews(selectedCategory);
  console.log(data);
  return <></>;
}
