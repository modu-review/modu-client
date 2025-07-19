import {useEffect} from 'react';
import {useSearchParams} from 'next/navigation';
import {login, REDIRECT_STORAGE_KEY} from '@/entities/auth';
import {createClientError} from '@/shared/lib/utils/client-error';

export default function useKakaoOAuthLogin() {
  const searchParams = useSearchParams();

  useEffect(() => {
    const email = searchParams.get('user_email');

    if (!email) {
      throw createClientError('EMPTY_USER_EMAIL');
    }

    const kakaoLogin = async () => {
      await login(email);

      const previousPath = sessionStorage.getItem(REDIRECT_STORAGE_KEY);
      sessionStorage.removeItem(REDIRECT_STORAGE_KEY);

      if (previousPath) {
        window.location.replace(previousPath);
      } else {
        window.location.replace('/');
      }
    };

    kakaoLogin();
  }, [searchParams]);
}
