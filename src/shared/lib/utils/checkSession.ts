import {cookies} from 'next/headers';
import {redirect} from 'next/navigation';

async function checkSession() {
  const cookieStore = await cookies();

  if (!cookieStore.has('refreshToken')) {
    redirect('/');
  }
}

export default checkSession;
