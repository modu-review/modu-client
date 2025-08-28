'use client';

import {useEffect, useState} from 'react';
import {useUserNickname} from '@/entities/auth';
import {usePostProfileImage} from '@/entities/users';

type ProfileImage = {
  file: File;
  url: string;
};

export function useChangeProfileImage() {
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

  return {
    profileImage,
    handleSetFile,
    handleSubmit,
    handleCancel,
  };
}
