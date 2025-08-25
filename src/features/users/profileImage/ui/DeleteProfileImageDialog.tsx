import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/shared/shadcnComponent/ui/dialog';
import {LucideIcon} from '@/shared/ui/icons';

export default function DeleteProfileImageDialog() {
  return (
    <Dialog>
      <DialogTrigger className="w-full flex items-center justify-between hover:bg-gray-100 py-1.5 px-3 rounded-xl transition-colors">
        <span>삭제</span>
        <LucideIcon name="Trash2" className="w-5 h-5 text-red-500" />
      </DialogTrigger>
      <DialogContent className="w-[370px]">
        <DialogHeader>
          <DialogTitle>프로필 이미지 삭제</DialogTitle>
          <DialogDescription>한 번 삭제한 프로필 이미지는 되돌릴 수 없어요.</DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
