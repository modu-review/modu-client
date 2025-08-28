'use client';

import {useRef, FormEvent} from 'react';
import {useRouter} from 'next/navigation';
import useSearchValidate from '../lib/useSearchValidate';
import {Input} from '@/shared/shadcnComponent/ui/input';
import {LucideIcon} from '@/shared/ui/icons';

type Props = {
  autoFocus?: boolean;
  onBlur?: () => void;
};

export default function SearchBar({autoFocus, onBlur}: Props) {
  const router = useRouter();
  const searchInputRef = useRef<HTMLInputElement>(null);

  const {validateSearchQuery, error, clearError} = useSearchValidate();

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    const searchQuery = searchInputRef.current?.value.trim() || '';

    if (validateSearchQuery(searchQuery)) {
      router.push(`/search/${searchQuery}`);
    } else if (searchInputRef.current) {
      searchInputRef.current.focus();
      searchInputRef.current.select();
    }
  };

  return (
    <div className="w-full flex flex-col items-center px-4 relative">
      <form
        onSubmit={handleSearch}
        className="flex items-center w-full max-w-[480px] md:max-w-[550px] lg:max-w-[712px] md:h-full lg:h-full h-11 shadow-md rounded-3xl border px-4 py-1"
      >
        <button type="submit" className="focus:outline-none" aria-label="검색">
          <LucideIcon name="Search" size={24} color="#53587E" />
        </button>
        <Input
          ref={searchInputRef}
          className="ml-3 py-2 text-base border-none outline-none"
          type="text"
          placeholder="후기를 검색하세요"
          aria-label="검색어 입력"
          onChange={clearError}
          autoFocus={autoFocus}
          onBlur={onBlur}
        />
      </form>
      {error && <p className="absolute -bottom-7 text-[14px] md:-bottom-8 md:text-[16px] text-red-500">{error}</p>}
    </div>
  );
}
