import SearchReviews from '@/features/search-review';

export default function SearchPage() {
  return (
    <section className="flex flex-col md:px-8">
      <h4 className="font-bold text-2xl mt-16 mb-8 md:text-3xl px-5"> 후기글 모음 </h4>
      <SearchReviews />
    </section>
  );
}
