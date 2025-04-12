import {requestGet} from '@/shared/apis';

async function kakaoLogin(email: string) {
  await requestGet({
    endpoint: '/user/oauth2/login',
    queryParams: {
      user_email: email,
    },
    withResponse: false,
  });
}

export default kakaoLogin;
