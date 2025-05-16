export type SortKey = 'recent' | 'hotbookmarks' | 'hotcomments';
export type SortType = '최신순' | '북마크순' | '댓글순';

export type SortSelectOption = {
  name: SortType;
  value: SortKey;
};
