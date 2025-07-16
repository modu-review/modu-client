import {requestGet} from '@/shared/apis';

async function kakaoLogin(email: string) {
  await requestGet({
    endpoint: '/users/login',
    queryParams: {
      email,
    },
    withResponse: false,
  });
}

export default kakaoLogin;
