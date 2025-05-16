import {ReviewCategory} from '@/entities/reviews';

type Category = {
  id: ReviewCategory;
  category: string;
};

const CATEGORY_LIST: Category[] = [
  {id: 'all', category: '전체'},
  {id: 'car', category: '자동차'},
  {id: 'food', category: '음식'},
  {id: 'company', category: '회사'},
  {id: 'cosmetic', category: '화장품'},
  {id: 'cafe', category: '카페'},
  {id: 'devices1', category: '전자제품'},
  {id: 'clothes', category: '의류'},
];

export default CATEGORY_LIST;
