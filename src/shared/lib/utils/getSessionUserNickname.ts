import {cookies} from 'next/headers';

export default async function getSessionUserNickname() {
  const cookieStore = await cookies();
  const sessionUserNickname = cookieStore.get('userNickname');

  return sessionUserNickname ? sessionUserNickname.value : null;
}
