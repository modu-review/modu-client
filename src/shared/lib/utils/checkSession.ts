import {cookies} from 'next/headers';
import {redirect} from 'next/navigation';

async function checkSession() {
  const cookieStore = await cookies();

  if (!cookieStore.has('accessToken') || !cookieStore.has('UserEmail')) {
    redirect('/');
  }
}

export default checkSession;
