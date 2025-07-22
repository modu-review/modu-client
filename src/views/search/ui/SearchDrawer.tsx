'use client';

import {useState} from 'react';
import {SearchBar} from '@/features/reviews/search-bar';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/shared/shadcnComponent/ui/sheet';
import {LucideIcon} from '@/shared/ui/icons';

export default function SearchDrawer() {
  const [isOpen, setIsOpen] = useState(false);

  const handleCloseDrawer = () => {
    setIsOpen(false);
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger className="hover:text-boldBlue hover:scale-105 transition-all">
        <LucideIcon name="Search" className="w-6 h-6 md:w-8 md:h-8" />
      </SheetTrigger>
      <SheetContent side="right" className="w-full md:min-w-[500px]">
        <div className="w-full max-w-3xl mx-auto pb-6">
          <SheetHeader className="mb-6 md:mb-8">
            <SheetTitle className="text-xl font-semibold md:text-2xl">후기 검색</SheetTitle>
            <SheetDescription className="md:text-base">원하는 키워드로 후기를 검색해보세요.</SheetDescription>
          </SheetHeader>
          <SearchBar autoFocus={true} closeDrawer={handleCloseDrawer} />
        </div>
      </SheetContent>
    </Sheet>
  );
}
