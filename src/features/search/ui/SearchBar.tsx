'use client';

import {useRef, FormEvent} from 'react';
import {useRouter} from 'next/navigation';
import useSearchValidate from '../lib/useSearchValidate';
import {Input} from '@/shared/shadcnComponent/ui/input';
import {LucideIcon} from '@/shared/ui/icons';

export default function SearchBar() {
  const searchInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const {validateSearchQuery} = useSearchValidate();

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    const searchQuery = searchInputRef.current?.value.trim() || '';

    if (validateSearchQuery(searchQuery)) {
      router.push(`/reviews?query=${encodeURIComponent(searchQuery)}`);
    } else if (searchInputRef.current) {
      searchInputRef.current.focus();
      searchInputRef.current.select();
    }
  };

  return (
    <div className="w-full max-w-[480px] md:max-w-[550px] lg:max-w-[712px]">
      <form onSubmit={handleSearch} className="flex items-center w-full h-full shadow-md rounded-3xl border px-4">
        <button type="submit" className="focus:outline-none" aria-label="검색">
          <LucideIcon name="Search" size={24} color="#53587E" />
        </button>
        <Input
          ref={searchInputRef}
          className="ml-3 py-2 text-base border-none outline-none"
          type="text"
          placeholder="후기를 검색하세요"
          aria-label="검색어 입력"
        />
      </form>
    </div>
  );
}
