import {User} from '../model/types';
import {requestGet} from '@/shared/apis';

export function getSession() {
  return requestGet<User>({
    endpoint: '/api/auth',
    baseUrl: process.env.NEXT_PUBLIC_CLIENT_URL,
    errorHandlingType: 'toast',
  });
}

export async function login(email: string) {
  await requestGet({
    endpoint: '/users/login',
    queryParams: {
      email,
    },
    withResponse: false,
  });
}

export async function logout() {
  await requestGet({
    endpoint: '/users/logout',
    withResponse: false,
    errorHandlingType: 'toast',
  });
}
