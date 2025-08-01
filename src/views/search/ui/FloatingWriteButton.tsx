'use client';

import {useRouter} from 'next/navigation';
import {useIsLoggedIn} from '@/entities/auth';
import {LucideIcon} from '@/shared/ui/icons';
import {useLoginModal} from '@/features/auth';

export default function FloatingWriteButton() {
  const router = useRouter();

  const isLoggedIn = useIsLoggedIn();
  const {isOpenLoginModal, openLoginModal, renderLoginModal} = useLoginModal();

  const handleClick = () => {
    if (!isLoggedIn) {
      openLoginModal();
      return;
    }

    router.push('/reviews/new', {scroll: false});
  };

  return (
    <>
      <button
        className="bg-boldBlue text-white rounded-full p-3 shadow-lg hover:bg-extraboldBlue transition-colors"
        onClick={handleClick}
        aria-label="리뷰 작성하기"
      >
        <LucideIcon name="Plus" size={24} />
      </button>
      {isOpenLoginModal && renderLoginModal()}
    </>
  );
}
