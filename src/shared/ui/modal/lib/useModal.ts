'use client';

import {useEffect, useState} from 'react';

export function useModal(onCloseCallback?: () => void) {
  const [openModal, setOpenModal] = useState(false);

  const handleModalOpen = () => {
    setOpenModal(true);
  };

  const handleModalClose = () => {
    setOpenModal(false);

    if (onCloseCallback) onCloseCallback();
  };

  useEffect(() => {
    const prevBodyOverflow = document.body.style.overflow;
    const htmlElement = document.documentElement;

    if (openModal) {
      htmlElement.style.overflow = 'hidden';
    } else {
      htmlElement.style.overflow = prevBodyOverflow;
    }

    return () => {
      htmlElement.style.overflow = prevBodyOverflow;
    };
  }, [openModal]);

  return {openModal, handleModalOpen, handleModalClose};
}
