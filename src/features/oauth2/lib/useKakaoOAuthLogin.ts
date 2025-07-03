import {createClientError} from '@/shared/lib/utils/client-error';
import {useSearchParams} from 'next/navigation';
import {useEffect} from 'react';
import kakaoLogin from '../apis/api-service';

function useKakaoOAuthLogin() {
  const searchParams = useSearchParams();

  useEffect(() => {
    const email = searchParams.get('user_email');

    if (!email) {
      throw createClientError('EMPTY_USER_EMAIL');
    }

    const login = async () => {
      await kakaoLogin(email);

      window.location.replace('/');
    };

    login();
  }, [searchParams]);
}

export default useKakaoOAuthLogin;
