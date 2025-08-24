'use client';

import {ChangeEvent, useState} from 'react';
import {useUpdateGlobalError} from '@/entities/error';
import {createClientError} from '@/shared/lib/utils/client-error';
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

const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png'];
const MAX_SIZE_EXCEEDED = 5 * 1024 * 1024;

export default function ChangeProfileImageDialog() {
  const [file, setFile] = useState<File | null>(null);

  const updateGlobalError = useUpdateGlobalError();

  const validateFile = (file: File) => {
    if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
      updateGlobalError(createClientError('NOT_SUPPORTED_FILE'));

      return false;
    }

    if (file.size > MAX_SIZE_EXCEEDED) {
      updateGlobalError(createClientError('FILE_SIZE_EXCEEDED'));

      return false;
    }

    return true;
  };

  const handleDropImage = (file: File) => {
    if (validateFile(file)) {
      setFile(file);
    }
  };

  const handleChangeImage = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();

    const files = event.target.files;
    if (files && files[0] && validateFile(files[0])) {
      setFile(files[0]);
    }
  };

  const handleSubmit = () => {
    // TODO: 이미지 업로드 기능 연결
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
          <DialogDescription>사진을 드래그하거나 클릭해 업로드할 수 있어요.</DialogDescription>
        </DialogHeader>
        {file ? (
          <div>{/* TODO: 프로필 이미지 프리뷰 구현 */}</div>
        ) : (
          <ImageUploadDragArea onFile={handleDropImage} onError={updateGlobalError}>
            <input
              className="hidden"
              id="profile-image"
              type="file"
              size={MAX_SIZE_EXCEEDED}
              accept={ACCEPTED_IMAGE_TYPES.join(',')}
              onChange={handleChangeImage}
            />
            <label
              htmlFor="profile-image"
              className="w-full h-full flex flex-col items-center justify-center select-none cursor-pointer py-6"
            >
              <LucideIcon name="FileImage" className="w-12 h-12 md:w-14 md:h-14 mb-2 text-gray-600" />
              <div className="text-center">
                <p className="text-sm md:text-base text-gray-600 mb-1">
                  사진을 드래그하거나 클릭해 업로드할 수 있어요.
                </p>
                <p className="text-xs md:text-sm text-gray-500">최대 크기: {MAX_SIZE_EXCEEDED / 1024 / 1024}MB</p>
                <p className="text-xs md:text-sm text-gray-500">지원되는 파일 형식: JPEG, JPG, PNG</p>
              </div>
            </label>
          </ImageUploadDragArea>
        )}
      </DialogContent>
    </Dialog>
  );
}
