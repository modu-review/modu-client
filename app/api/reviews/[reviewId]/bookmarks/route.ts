import {readFileSync} from 'fs';
import {NextRequest, NextResponse} from 'next/server';
import path from 'path';

export async function GET(_: NextRequest, {params}: {params: Promise<{reviewId: string}>}) {
  const {reviewId} = await params;

  const filePath = path.join(process.cwd(), 'public/data', `review_bookmarks_${reviewId}.json`);

  try {
    const fileData = readFileSync(filePath, 'utf-8');

    return NextResponse.json(JSON.parse(fileData));
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
      return NextResponse.json(
        {
          errorCode: 'BOOKMARKS_NOT_FOOUND',
          meesage: `리뷰 ID ${reviewId}에 대한 북마크 정보를 찾을 수 없습니다.`,
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
