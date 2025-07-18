import {createClientError} from '@/shared/lib/utils/client-error';
import {useSearchParams} from 'next/navigation';
import {useEffect} from 'react';
import kakaoLogin from '../apis/api-service';
import {REDIRECT_STORAGE_KEY} from '@/entities/auth';

function useKakaoOAuthLogin() {
  const searchParams = useSearchParams();

  useEffect(() => {
    const email = searchParams.get('user_email');

    if (!email) {
      throw createClientError('EMPTY_USER_EMAIL');
    }

    const login = async () => {
      await kakaoLogin(email);

      const previousPath = sessionStorage.getItem(REDIRECT_STORAGE_KEY);
      sessionStorage.removeItem(REDIRECT_STORAGE_KEY);

      if (previousPath) {
        window.location.replace(previousPath);
      } else {
        window.location.replace('/');
      }
    };

    login();
  }, [searchParams]);
}

export default useKakaoOAuthLogin;
