import {cookies} from 'next/headers';
import {NextResponse} from 'next/server';

export async function GET() {
  const cookieStore = await cookies();

  if (!cookieStore.has('accessToken')) {
    return NextResponse.json({
      isLoggedIn: false,
      userEmail: null,
      userId: null,
    });
  }

  const userEmailCookie = cookieStore.get('userEmail');

  if (!userEmailCookie) {
    return NextResponse.json({errorCode: 'EMPTY_USER_EMAIL'}, {status: 400});
  }

  const userEmail = userEmailCookie.value;
  const userId = userEmail.split('@')[0];

  return NextResponse.json(
    {
      isLoggedIn: true,
      userEmail,
      userId,
    },
    {status: 200},
  );
}
