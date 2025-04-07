import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '@/shared/shadcnComponent/ui/select';
import {SORT_MAP, SORT_OPTIONS} from '../const/sortOptions';
import {SortKey} from '../model/type';
import {cn} from '@/shared/lib/utils/cn';

type Props = {
  sort: SortKey;
  onValueChange: (value: SortKey) => void;
  className?: string;
};

export default function SelectSortOptions({sort, onValueChange, className}: Props) {
  return (
    <Select value={sort} onValueChange={onValueChange}>
      <SelectTrigger className={cn('w-[120px]', className)}>
        <SelectValue aria-label={SORT_MAP[sort]}>{SORT_MAP[sort]}</SelectValue>
      </SelectTrigger>
      <SelectContent>
        {SORT_OPTIONS.map(({name, value}) => (
          <SelectItem key={value} value={value}>
            {name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
