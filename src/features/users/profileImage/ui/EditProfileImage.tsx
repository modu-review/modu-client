import {Popover, PopoverContent, PopoverTrigger} from '@/shared/shadcnComponent/ui/popover';
import {LucideIcon} from '@/shared/ui/icons';

export default function EditProfileImage() {
  return (
    <Popover>
      <PopoverTrigger className="absolute bottom-2 right-3 md:right-4 lg:right-6 flex items-center justify-center rounded-full w-7 md:w-8 h-7 md:h-8 bg-gray-100 border-boldBlue border-[3px] hover:bg-boldBlue hover:text-white transition-colors">
        <LucideIcon name="PencilLine" className="w-4 md:w-5 h-4 md:h-5" />
      </PopoverTrigger>
      <PopoverContent className="flex flex-col items-start w-[160px] gap-2 rounded-2xl px-3">
        <button className="w-full flex items-center justify-between hover:bg-gray-100 py-1.5 px-3 rounded-xl transition-colors">
          <span>사진 선택</span>
          <LucideIcon name="Image" className="w-5 h-5" />
        </button>
        <button className="w-full flex items-center justify-between hover:bg-gray-100 py-1.5 px-3 rounded-xl transition-colors">
          <span>삭제</span>
          <LucideIcon name="Trash2" className="w-5 h-5 text-red-500" />
        </button>
      </PopoverContent>
    </Popover>
  );
}
