import {createPortal} from 'react-dom';

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
          <div className="fixed top-0 left-0 w-full h-full bg-black/60" onClick={onClose} />
          {children}
        </section>,
        modal,
      )}
    </>
  );
}
