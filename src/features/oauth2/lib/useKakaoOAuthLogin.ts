import {createClientError} from '@/shared/lib/utils/client-error';
import {useRouter, useSearchParams} from 'next/navigation';
import {useEffect} from 'react';
import kakaoLogin from '../apis/api-service';

function useKakaoOAuthLogin() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const email = searchParams.get('user_email');

    if (!email) {
      throw createClientError('EMPTY_USER_EMAIL');
    }

    kakaoLogin(email);

    router.push('/');
  }, [router, searchParams]);
}

export default useKakaoOAuthLogin;
