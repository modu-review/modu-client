import {LucideIcon} from '@/shared/ui/icons';

type Props = {
  message: string;
  onCancel: () => void;
  onConfirm: () => void;
};

export default function AlertModal({message, onCancel, onConfirm}: Props) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full text-center z-50">
      <div className="flex justify-center mb-4 text-boldBlue text-4xl">
        <LucideIcon name="CircleAlert" size={25} />
      </div>
      <p className="text-gray-800 font-medium mb-6">{message}</p>
      <div className="flex justify-center gap-12">
        <button onClick={onCancel} className="px-4 py-2 rounded-md border border-gray-300 hover:bg-gray-100">
          취소
        </button>
        <button onClick={onConfirm} className="px-4 py-2 rounded-md bg-boldBlue text-white hover:bg-black">
          확인
        </button>
      </div>
    </div>
  );
}
