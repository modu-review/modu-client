import {createPortal} from 'react-dom';
import {LucideIcon} from '../../icons';

type Props = {
  children: React.ReactNode;
  onClose: () => void;
};

export default function Modal({children, onClose}: Props) {
  if (typeof window === 'undefined') {
    return null;
  }

  const modal = document.getElementById('modal-root') as HTMLDivElement;

  return (
    <>
      {createPortal(
        <section className="fixed top-0 left-0 w-full h-full z-20 flex flex-col justify-center items-center">
          <button className="fixed z-50 top-4 right-3" onClick={onClose} aria-label="창닫기">
            <LucideIcon name="X" className="w-6 h-6 md:w-8 md:h-8 md:text-gray-300" />
          </button>
          <div className="fixed top-0 left-0 w-full h-full bg-black/60" onClick={onClose} />
          {children}
        </section>,
        modal,
      )}
    </>
  );
}
