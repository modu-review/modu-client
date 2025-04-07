import {useRouter, useSearchParams} from 'next/navigation';
import isSortKey from './isSortKey';
import {SortKey} from '../model/type';

export default function useSelectSortOption(categoryId: string) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const rawSort = searchParams.get('sort');
  const sort = isSortKey(rawSort) ? rawSort : 'recent';

  const handleChange = (value: SortKey) => {
    router.push(`?categoryId=${categoryId}&sort=${value}`);
  };

  return {sort, handleChange};
}
