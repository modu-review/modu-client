import {readFileSync} from 'fs';
import {NextRequest, NextResponse} from 'next/server';
import path from 'path';

export async function GET(_: NextRequest, {params}: {params: Promise<{reviewId: string}>}) {
  const {reviewId} = await params;

  const filePath = path.join(process.cwd(), 'public/data', `review_detail_${reviewId}.json`);

  try {
    const fileData = readFileSync(filePath, 'utf-8');

    return NextResponse.json(JSON.parse(fileData));
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
      return NextResponse.json(
        {
          errorCode: 'REVIEW_NOT_FOOUND',
          meesage: '리뷰를 찾을 수 없습니다.',
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
