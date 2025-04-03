'use client';

import {useEffect} from 'react';
import {useRouter, useSearchParams} from 'next/navigation';
import {requestGet} from '@/shared/apis';
import {createClientError} from '@/shared/lib/utils/client-error';
import {LucideIcon} from '@/shared/ui/icons';

export default function OAuth2RedirectPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const email = searchParams.get('user_email');

    if (!email) {
      throw createClientError('EMPTY_USER_EMAIL');
    }

    const kakaoLogin = async () => {
      requestGet({
        endpoint: '/user/oauth2/login',
        queryParams: {
          user_email: email,
        },
        withResponse: false,
      });

      router.push('/');
    };

    kakaoLogin();
  }, [router, searchParams]);

  return (
    <section className="w-full h-full flex flex-col justify-center items-center">
      <LucideIcon name="ScanFace" className="w-32 h-32 md:w-40 md:h-40 mb-6 animate-pulse" />
      <h2 className="text-2xl md:text-3xl mb-4">로그인 중이에요..</h2>
      <p>로그인이 완료될 때까지</p>
      <p>잠시만 기다려주세요.</p>
    </section>
  );
}
