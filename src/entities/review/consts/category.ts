import {Category} from '../model/type';

export const CATEGORY_LIST = [
  {id: 'all', value: 'all', label: '전체'},
  {id: 'food', value: 'food', label: '음식'},
  {id: 'car', value: 'car', label: '자동차'},
  {id: 'cosmetic', value: 'cosmetic', label: '화장품'},
  {id: 'clothes', value: 'clothes', label: '의류'},
  {id: 'company', value: 'company', label: '회사'},
  {id: 'device', value: 'device', label: '전자제품'},
  {id: 'book', value: 'book', label: '책'},
  {id: 'sports', value: 'sports', label: '운동용품'},
] as const;

export const CATEGORY_MAP = CATEGORY_LIST.reduce(
  (acc, {value, label}) => {
    acc[value] = label;
    return acc;
  },
  {} as Record<Category, string>,
);

export const CATEGORY_VALUES = CATEGORY_LIST.map(category => category.value) as [Category, ...Category[]];
