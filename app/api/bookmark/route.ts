import {NextRequest, NextResponse} from 'next/server';

export async function POST(req: NextRequest) {
  const {user_id, review_id} = await req.json();

  if (!user_id) {
    return NextResponse.json({
      errorCode: 'USER_ID_NOT_PROVIDED',
      message: '사용자 ID가 제공되지 않았습니다.',
    });
  }

  if (!review_id) {
    return NextResponse.json({
      errorCode: 'REVIEW_ID_NOT_PROVIDED',
      message: '리뷰 ID가 제공되지 않았습니다.',
    });
  }

  return NextResponse.json({
    message: '북마크 성공',
  });
}
