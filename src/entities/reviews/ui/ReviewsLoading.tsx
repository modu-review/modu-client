import ReviewArticleLoading from './ReviewArticleLoading';

export default function ReviewsLoading() {
  return (
    <section className="flex flex-col mt-9 md:mt-12">
      {Array.from({length: 5}, (_, idx) => (
        <ReviewArticleLoading key={idx} />
      ))}
    </section>
  );
}
