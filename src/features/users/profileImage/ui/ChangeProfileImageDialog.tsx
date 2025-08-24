import {useUpdateGlobalError} from '@/entities/error';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/shared/shadcnComponent/ui/dialog';
import {ImageUploadDragArea} from '@/shared/ui/components';
import {LucideIcon} from '@/shared/ui/icons';

export default function ChangeProfileImageDialog() {
  const updateGlobalError = useUpdateGlobalError();

  const handleFileUpload = (file: File) => {
    // TODO: 파일 업로드 로직 구현
  };

  return (
    <Dialog>
      <DialogTrigger className="w-full flex items-center justify-between hover:bg-gray-100 py-1.5 px-3 rounded-xl transition-colors">
        <span>사진 선택</span>
        <LucideIcon name="Image" className="w-5 h-5" />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>프로필 이미지 수정</DialogTitle>
          <DialogDescription>사진을 선택하거나 드래그해 업로드할 수 있어요.</DialogDescription>
        </DialogHeader>
        <ImageUploadDragArea onFile={handleFileUpload} onError={updateGlobalError}>
          {/* TODO: 클릭을 통한 이미지 업로드 구현 */}
        </ImageUploadDragArea>
      </DialogContent>
    </Dialog>
  );
}
