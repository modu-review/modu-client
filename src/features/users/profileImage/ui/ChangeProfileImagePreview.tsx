import {PopoverClose} from '@radix-ui/react-popover';
import Image from 'next/image';

type Props = {
  imageUrl: string;
  onSubmit: () => void;
  onCancel: () => void;
};

export default function ChangeProfileImagePreview({imageUrl, onSubmit, onCancel}: Props) {
  return (
    <section className="flex flex-col justify-center items-center w-full gap-5 mt-2">
      <div className="flex justify-center items-center rounded-full border-boldBlue border-[7px] overflow-hidden w-36 h-36 md:w-40 md:h-40 lg:w-48 lg:h-48 relative">
        <Image
          src={imageUrl}
          alt="프로필 이미지 미리보기"
          width={160}
          height={160}
          className="w-full h-full object-cover"
          priority
        />
      </div>
      <footer className="flex w-full items-center gap-2">
        <button
          className="w-full py-1.5 bg-gray-300 text-black rounded-md hover:bg-gray-300/80 transition-colors"
          onClick={onCancel}
          aria-label="프로필 이미지 다시 선택"
        >
          다시 선택
        </button>
        <PopoverClose asChild>
          <button
            className="w-full text-center py-1.5 bg-boldBlue text-white rounded-md hover:bg-boldBlue/80 transition-colors"
            onClick={onSubmit}
            aria-label="프로필 이미지 업로드"
          >
            업로드
          </button>
        </PopoverClose>
      </footer>
    </section>
  );
}
