import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '@/shared/shadcnComponent/ui/select';
import {SORT_OPTIONS} from '../const/sortOptions';

export default function SelectSortOption() {
  return (
    <Select>
      <SelectTrigger className="w-[120px]">
        <SelectValue></SelectValue>
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
