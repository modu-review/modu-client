import {CategoryReviews} from '@/features/reviews/category';
import FloatingWriteButton from './FloatingWriteButton';
import SearchDrawer from './SearchDrawer';
import FloatingMoveUpButton from './FloatingMoveUpButton';

export default function CategorySearchPage() {
  return (
    <section className="flex flex-col md:px-8 max-w-5xl mx-auto">
      <header className="flex items-center justify-between mt-4 md:mt-6 mb-4 md:mb-6 pl-7 pr-10">
        <h4 className="font-bold text-2xl md:text-3xl"> 후기글 모음 </h4>
        <div className="md:hidden">
          <SearchDrawer />
        </div>
      </header>
      <CategoryReviews />
      <div className="fixed bottom-4 right-3 md:bottom-8 md:right-6 lg:right-8 flex flex-col gap-2">
        <FloatingMoveUpButton />
        <FloatingWriteButton />
      </div>
    </section>
  );
}
