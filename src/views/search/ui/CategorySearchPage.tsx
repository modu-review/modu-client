import {CategoryReviews} from '@/features/reviews/category';
import FloatingWriteButton from './FloatingWriteButton';
import SearchDrawer from './SearchDrawer';

export default function CategorySearchPage() {
  return (
    <section className="flex flex-col md:px-8 max-w-5xl mx-auto">
      <header className="flex items-center justify-between mt-4 md:mt-6 mb-4 md:mb-6 pl-7 pr-10">
        <h4 className="font-bold text-2xl md:text-3xl"> 후기글 모음 </h4>
        <SearchDrawer />
      </header>
      <CategoryReviews />
      <FloatingWriteButton />
    </section>
  );
}
