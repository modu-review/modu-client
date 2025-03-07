'use client';

import {Input} from '@/shared/shadcnComponent/ui/input';
import {LucideIcon} from '@/shared/ui/icons';

export default function SearchBar() {
  return (
    <div className="flex items-center w-full max-w-[480px] md:max-w-[550px] lg:max-w-[712px] h-full shadow-md rounded-3xl border px-4">
      <LucideIcon name="Search" size={24} color="#53587E" />
      <Input className="ml-3 py-2 text-base border-none outline-none" type="text" placeholder="후기를 검색하세요" />
    </div>
  );
}
