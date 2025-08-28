import RecentReviewCardLoading from './RecentReviewsCardLoading';

export function RecentReviewsCarouselLoading() {
  return (
    <section className="w-full flex-col overflow-hidden">
      <div className="flex gap-20 justify-center">
        {Array.from({length: 3}).map((_, idx) => (
          <RecentReviewCardLoading key={idx} />
        ))}
      </div>
      <div className="hidden justify-center md:flex md:gap-20 mt-14">
        {Array.from({length: 3}).map((_, idx) => (
          <RecentReviewCardLoading key={idx} />
        ))}
      </div>
    </section>
  );
}
