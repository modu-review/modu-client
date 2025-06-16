import CardLoading from './CardLoading';

export default function ReviewsGridLoading() {
  return (
    <section className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 content-center justify-items-center mb-10 gap-y-10">
      {Array.from({length: 6}).map((_, idx) => (
        <CardLoading key={idx} />
      ))}
    </section>
  );
}
