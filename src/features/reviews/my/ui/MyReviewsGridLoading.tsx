import MyReviewCardLoading from './MyReviewCardLoading';

export default function MyReviewsGridLoading() {
  return (
    <ul className="w-full grid content-center justify-items-center md:grid-cols-[repeat(auto-fit,minmax(350px,1fr))] lg:grid-cols-[repeat(auto-fit,minmax(360px,1fr))] xl:md:grid-cols-[repeat(auto-fit,minmax(420px,1fr))] gap-y-10 lg:gap-y-12 xl:gap-y-14 mb-24">
      {Array.from({length: 6}).map((_, index) => (
        <MyReviewCardLoading key={index} />
      ))}
    </ul>
  );
}
