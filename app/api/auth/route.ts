import {cookies} from 'next/headers';
import {NextResponse} from 'next/server';
import {getSearchLimitStatus} from '@/features/chatbot';

export async function GET() {
  const cookieStore = await cookies();
  const limitCookie = cookieStore.get('search_limit');
  if (!cookieStore.has('refreshToken')) {
    return NextResponse.json({
      isLoggedIn: false,
      userNickname: null,
      userEmail: null,
    });
  }

  const userNicknameCookie = cookieStore.get('userNickname');
  const userEmailCookie = cookieStore.get('userEmail');

  if (!userNicknameCookie) {
    return NextResponse.json({errorCode: 'EMPTY_USER_NICKNAME'}, {status: 400});
  }

  if (!userEmailCookie) {
    return NextResponse.json({errorCode: 'EMPTY_USER_EMAIL'}, {status: 400});
  }

  const userNickname = userNicknameCookie.value;
  const userEmail = userEmailCookie.value;

  return NextResponse.json(
    {
      isLoggedIn: true,
      userNickname,
      userEmail,
    },
    {status: 200},
  );
}
