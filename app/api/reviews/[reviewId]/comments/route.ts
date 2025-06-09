import {readFileSync} from 'fs';
import {NextRequest, NextResponse} from 'next/server';
import path from 'path';

export async function GET(req: NextRequest, {params}: {params: Promise<{reviewId: string}>}) {
  const {reviewId} = await params;
  const searchParams = req.nextUrl.searchParams;

  const page = searchParams.get('page');

  if (!page) {
    return NextResponse.json(
      {
        errorCode: 'PAGE_NOT_PROVIDED',
        message: '페이지 번호가 제공되지 않았습니다.',
      },
      {
        status: 400,
      },
    );
  }

  const filePath = path.join(process.cwd(), 'public/data', `review_comments_${reviewId}_${page}.json`);

  try {
    const fileData = readFileSync(filePath, 'utf-8');

    return NextResponse.json(JSON.parse(fileData));
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
      return NextResponse.json(
        {
          errorCode: 'COMMENTS_NOT_FOOUND',
          meesage: `리뷰 ID ${reviewId}에 대한 댓글을 찾을 수 없습니다.`,
        },
        {
          status: 404,
        },
      );
    }

    return NextResponse.json(
      {
        errorCode: 'INTERNAL_SERVER_ERROR',
        message: '서버 오류가 발생했습니다.',
      },
      {
        status: 500,
      },
    );
  }
}
