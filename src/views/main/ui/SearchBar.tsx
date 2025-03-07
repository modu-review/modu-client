'use client';

import {Input} from '@/shared/shadcnComponent/ui/input';
import {LucideIcon} from '@/shared/ui/icons';

export default function SearchBar() {
  return (
    <div>
      <LucideIcon name="Search" size={24} color="#53587E" />
      <Input type="text" placeholder="후기를 검색하세요" />
    </div>
  );
}
