import MyReviewCardLoading from './MyReviewCardLoading';

export default function MyReviewsGridLoading() {
  return (
    <ul className="w-full grid content-center justify-items-center grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-14 md:gap-y-10">
      {Array.from({length: 6}).map((_, index) => (
        <MyReviewCardLoading key={index} />
      ))}
    </ul>
  );
}
