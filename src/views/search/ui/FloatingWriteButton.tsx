'use client';

import {useRouter} from 'next/navigation';
import {useIsLoggedIn} from '@/entities/auth';
import {LucideIcon} from '@/shared/ui/icons';
import {LoginModal, Modal, useModal} from '@/shared/ui/modal';

export default function FloatingWriteButton() {
  const router = useRouter();

  const isLoggedIn = useIsLoggedIn();
  const {openModal, handleModalOpen, handleModalClose} = useModal();

  const handleClick = () => {
    if (!isLoggedIn) {
      handleModalOpen();
      return;
    }

    router.push('/reviews/new', {scroll: false});
  };

  return (
    <>
      <button
        className="fixed bottom-4 right-4 md:bottom-8 md:right-6 lg:right-8 bg-boldBlue text-white rounded-full p-3 shadow-lg hover:bg-extraboldBlue transition-colors"
        onClick={handleClick}
        aria-label="리뷰 작성하기"
      >
        <LucideIcon name="Plus" size={24} />
      </button>
      {openModal && (
        <Modal onClose={handleModalClose}>
          <LoginModal onClose={handleModalClose} />
        </Modal>
      )}
    </>
  );
}
