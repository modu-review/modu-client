import {LOGIN_URL, REDIRECT_STORAGE_KEY} from '@/entities/auth';

export default function useGoLoginPage() {
  const goLoginPage = (previousPath?: string) => {
    if (previousPath) {
      sessionStorage.setItem(REDIRECT_STORAGE_KEY, previousPath);
    }

    window.location.href = LOGIN_URL;
  };

  return {goLoginPage};
}
