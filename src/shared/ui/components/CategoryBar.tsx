import {Button} from '@/shared/shadcnComponent/ui/button';

type Props = {selectedCategory: string; onSelectCategory: (category: string) => void};

export default function CategoryBar({selectedCategory, onSelectCategory}: Props) {
  const CATEGORY_LIST = [
    {id: 'all', category: '전체'},
    {id: 'car', category: '자동차'},
    {id: 'food', category: '음식'},
    {id: 'company', category: '회사'},
    {id: 'cosmetic', category: '화장품'},
    {id: 'cafe', category: '카페'},
    {id: 'devices1', category: '전자제품'},
    {id: 'clothes', category: '의류'},
  ];

  return (
    <nav className="w-full max-w-[1000px] px-2 mb-14">
      <ul className="grid grid-cols-[repeat(auto-fit,minmax(100px,1fr))] text-center gap-2 bg-white rounded-3xl p-3">
        {CATEGORY_LIST.map(({category, id}) => (
          <li key={id}>
            <Button
              variant={selectedCategory === category ? 'activeCategory' : 'inActiveCategory'}
              size="category"
              aria-pressed={selectedCategory === category}
              aria-label={`카테고리: ${category}`}
              onClick={() => onSelectCategory(category)}
            >
              {category}
            </Button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
