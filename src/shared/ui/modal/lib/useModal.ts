'use client';

import {useState} from 'react';

export function useModal(onCloseCallback?: () => void) {
  const [openModal, setOpenModal] = useState(false);

  const handleModalOpen = () => {
    setOpenModal(true);
  };

  const handleModalClose = () => {
    setOpenModal(false);

    if (onCloseCallback) onCloseCallback();
  };

  return {openModal, handleModalOpen, handleModalClose};
}
