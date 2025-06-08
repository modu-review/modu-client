import {CATEGORY_LIST} from '@/entities/review';
import {ReviewCategory} from '@/entities/reviews/model/types';
import {Button} from '@/shared/shadcnComponent/ui/button';

type Props = {
  selectedCategory: ReviewCategory;
  onSelectCategory: (category: ReviewCategory) => void;
};

export default function CategoryBar({selectedCategory, onSelectCategory}: Props) {
  return (
    <nav className="w-full px-2 mb-8 md:mb-10">
      <ul className="grid grid-cols-[repeat(auto-fit,minmax(100px,1fr))] text-center gap-2 bg-white rounded-3xl p-3 border shadow-md">
        {CATEGORY_LIST.map(({id, value, label}) => (
          <li key={id}>
            <Button
              variant={selectedCategory === value ? 'activeCategory' : 'inActiveCategory'}
              size="category"
              aria-pressed={selectedCategory === value}
              aria-label={`카테고리: ${label}`}
              onClick={() => onSelectCategory(value)}
            >
              {label}
            </Button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
