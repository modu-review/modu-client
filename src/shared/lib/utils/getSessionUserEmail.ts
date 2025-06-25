import {cookies} from 'next/headers';

export default async function getSessionUserEmail() {
  const cookieStore = await cookies();
  const sessionUserEmail = cookieStore.get('userEmail');

  return sessionUserEmail ? sessionUserEmail.value : null;
}
