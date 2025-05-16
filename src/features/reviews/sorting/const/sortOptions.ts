import {SortKey, SortSelectOption, SortType} from '../model/type';

const SORT_OPTIONS: SortSelectOption[] = [
  {
    name: '최신순',
    value: 'recent',
  },
  {
    name: '북마크순',
    value: 'hotbookmarks',
  },
  {
    name: '댓글순',
    value: 'hotcomments',
  },
];

const SORT_MAP: Record<SortKey, SortType> = {
  recent: '최신순',
  hotbookmarks: '북마크순',
  hotcomments: '댓글순',
};

export {SORT_OPTIONS, SORT_MAP};
