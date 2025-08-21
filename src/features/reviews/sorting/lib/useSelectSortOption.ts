import {useRouter, useSearchParams} from 'next/navigation';
import isSortKey from './isSortKey';
import {SortKey} from '../model/type';

type Props = {
  options?: Record<string, string>;
};

export default function useSelectSortOption({options = {}}: Props = {}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const rawSort = searchParams.get('sort');
  const sort = isSortKey(rawSort) ? rawSort : 'recent';

  const handleChange = (value: SortKey) => {
    const queryString = new URLSearchParams({
      ...options,
      sort: value,
    });

    router.push(`?${queryString}`);
  };

  return {sort, handleChange};
}
