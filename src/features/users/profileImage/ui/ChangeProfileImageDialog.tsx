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
import ChangeProfileImagePreview from './ChangeProfileImagePreview';
import {useUserNickname} from '@/entities/auth';
import {usePostProfileImage} from '@/entities/users';

type ProfileImage = {
  file: File;
  url: string;
};

export default function ChangeProfileImageDialog() {
  const [profileImage, setProfileImage] = useState<ProfileImage | null>(null);

  const userNickname = useUserNickname();
  const {updateProfileImage} = usePostProfileImage();

  const handleSetFile = (file: File) => {
    const url = URL.createObjectURL(file);
    setProfileImage({file, url});
  };

  const handleSubmit = () => {
    if (!profileImage || !userNickname) return;

    const formData = new FormData();
    formData.append('profileImage', profileImage.file);

    updateProfileImage({
      imageData: formData,
      userNickname,
    });
  };

  const handleCancel = () => {
    if (profileImage) {
      URL.revokeObjectURL(profileImage.url);
      setProfileImage(null);
    }
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
          <ChangeProfileImagePreview imageUrl={profileImage.url} onSubmit={handleSubmit} onCancel={handleCancel} />
        ) : (
          <ChangeProfileImageSelector onSelectFile={handleSetFile} />
        )}
      </DialogContent>
    </Dialog>
  );
}
