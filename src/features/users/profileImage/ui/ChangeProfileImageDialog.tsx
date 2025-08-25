'use client';

import {useEffect, useState} from 'react';
import ChangeProfileImageSelector from './ChangeProfileImageSelector';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/shared/shadcnComponent/ui/dialog';
import {LucideIcon} from '@/shared/ui/icons';

type ProfileImage = {
  file: File;
  url: string;
};

export default function ChangeProfileImageDialog() {
  const [profileImage, setProfileImage] = useState<ProfileImage | null>(null);

  const handleSetFile = (file: File) => {
    const url = URL.createObjectURL(file);
    setProfileImage({file, url});
  };

  const handleSubmit = () => {
    // TODO: 이미지 업로드 기능 연결
  };

  useEffect(() => {
    return () => {
      if (profileImage) {
        URL.revokeObjectURL(profileImage.url);
      }
    };
  }, [profileImage]);

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
        {profileImage ? (
          <div>{/* TODO: 프로필 이미지 프리뷰 구현 */}</div>
        ) : (
          <ChangeProfileImageSelector onSelectFile={handleSetFile} />
        )}
      </DialogContent>
    </Dialog>
  );
}
