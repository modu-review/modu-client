import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/shared/shadcnComponent/ui/dialog';
import {LucideIcon} from '@/shared/ui/icons';
import {PopoverClose} from '@radix-ui/react-popover';

export default function DeleteProfileImageDialog() {
  return (
    <Dialog>
      <DialogTrigger className="w-full flex items-center justify-between hover:bg-gray-100 py-1.5 px-3 rounded-xl transition-colors">
        <span>삭제</span>
        <LucideIcon name="Trash2" className="w-5 h-5 text-red-500" />
      </DialogTrigger>
      <DialogContent className="w-[370px] pb-5 rounded-lg">
        <DialogHeader>
          <DialogTitle>프로필 이미지 삭제</DialogTitle>
          <DialogDescription>한 번 삭제한 프로필 이미지는 되돌릴 수 없어요.</DialogDescription>
        </DialogHeader>
        <DialogFooter className="gap-2">
          <DialogClose asChild>
            <button
              className="w-full py-1.5 bg-gray-300 text-black rounded-md hover:bg-gray-300/80 transition-colors"
              aria-label="프로필 이미지 삭제 취소"
            >
              취소
            </button>
          </DialogClose>
          <PopoverClose asChild>
            <button
              className="w-full text-center py-1.5 bg-boldBlue text-white rounded-md hover:bg-boldBlue/80 transition-colors"
              aria-label="프로필 이미지 삭제"
            >
              삭제
            </button>
          </PopoverClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
