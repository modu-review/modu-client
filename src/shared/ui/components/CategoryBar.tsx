import {Button} from '@/shared/shadcnComponent/ui/button';

type Props = {selectedCategory: string; onSelectCategory: (category: string) => void};

export default function CategoryBar({selectedCategory, onSelectCategory}: Props) {
  const CATEGORY_LIST = [
    {id: 'all', category: '전체'},
    {id: 'car', category: '자동차'},
    {id: 'food', category: '음식'},
    {id: 'company', category: '회사'},
    {id: 'cosmetic', category: '화장품'},
    {id: 'devices1', category: '전자제품'},
    {id: 'devices2', category: '전자제품'},
    {id: 'devices3', category: '전자제품'},
  ];

  return (
    <section className="w-full max-w-[1000px] mx-auto bg-white rounded-3xl py-3 mb-14">
      <ul className="flex justify-around">
        {CATEGORY_LIST.map(({category, id}) => (
          <li key={id}>
            <Button
              variant={`${selectedCategory === category ? 'primary' : 'nonPrimary'}`}
              size="primary"
              onClick={() => onSelectCategory(category)}
            >
              {category}
            </Button>
          </li>
        ))}
      </ul>
    </section>
  );
}
