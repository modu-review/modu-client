import {CategoryReviews} from '@/features/reviews/category';

export default function CategorySearchPage() {
  return (
    <section className="flex flex-col md:px-8 max-w-5xl mx-auto">
      <h4 className="font-bold text-2xl mt-3 mb-4 md:mb-6 md:text-3xl px-5"> 후기글 모음 </h4>
      <CategoryReviews />
    </section>
  );
}
