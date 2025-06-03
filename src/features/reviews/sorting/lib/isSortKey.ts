import {SORT_MAP} from '../const/sortOptions';
import {SortKey} from '../model/type';

export default function isSortKey(value: string | null): value is SortKey {
  return value !== null && value in SORT_MAP;
}
