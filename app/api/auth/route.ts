import {cookies} from 'next/headers';
import {NextResponse} from 'next/server';

export async function GET() {
  const cookieStore = await cookies();

  if (!cookieStore.has('refreshToken')) {
    return NextResponse.json({
      isLoggedIn: false,
      userNickname: null,
    });
  }

  const userNicknameCookie = cookieStore.get('userNickname');

  if (!userNicknameCookie) {
    return NextResponse.json({errorCode: 'EMPTY_USER_NICKNAME'}, {status: 400});
  }

  const userNickname = userNicknameCookie.value;

  return NextResponse.json(
    {
      isLoggedIn: true,
      userNickname,
    },
    {status: 200},
  );
}
