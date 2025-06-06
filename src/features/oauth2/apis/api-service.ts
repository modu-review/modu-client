import {requestGet} from '@/shared/apis';

async function kakaoLogin(email: string) {
  await requestGet({
    endpoint: '/login/result',
    queryParams: {
      email,
    },
    withResponse: false,
  });
}

export default kakaoLogin;
