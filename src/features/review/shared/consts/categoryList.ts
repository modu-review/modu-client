import {CategoryValue} from '../model/type';

const CATEGORY_LIST = [
  {value: 'car', label: '자동차'},
  {value: 'food', label: '음식'},
  {value: 'company', label: '회사'},
  {value: 'cosmetic', label: '화장품'},
  {value: 'cafe', label: '카페'},
  {value: 'devices1', label: '전자제품'},
  {value: 'clothes', label: '의류'},
] as const;

const CATEGORY_MAP = CATEGORY_LIST.reduce(
  (acc, {value, label}) => {
    acc[value] = label;
    return acc;
  },
  {} as Record<CategoryValue, string>,
);

const CATEGORY_VALUES = CATEGORY_LIST.map(category => category.value) as [CategoryValue, ...CategoryValue[]];

export {CATEGORY_LIST, CATEGORY_MAP, CATEGORY_VALUES};
