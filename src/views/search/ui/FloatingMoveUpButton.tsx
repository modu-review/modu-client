'use client';

import {LucideIcon} from '@/shared/ui/icons';

export default function FloatingMoveUpButton() {
  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <button
      className="w-14 h-14 rounded-full shadow-lg flex justify-center items-center transition-all duration-300 ease-in-out hover:scale-105 bg-mediumBlue"
      onClick={handleScrollToTop}
      aria-label="위로 이동"
    >
      <LucideIcon className="w-8 h-8 transition-colors duration-300 ease-in-out text-white" name="ArrowUp" />
    </button>
  );
}
