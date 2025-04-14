import {useState} from 'react';
import {ReviewContent} from '../../shared/model/type';
import {useModal} from '@/shared/ui/modal';

function usePreview() {
  const [preview, setPreview] = useState<ReviewContent | null>(null);
  const {openModal, handleModalOpen, handleModalClose} = useModal(() => setPreview(null));

  const openPreview = (data: ReviewContent) => {
    setPreview(data);
    handleModalOpen();
  };

  return {
    preview,
    openModal,
    handleModalClose,
    openPreview,
  };
}

export default usePreview;
