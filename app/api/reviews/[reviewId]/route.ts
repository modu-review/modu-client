import {readFileSync, writeFileSync} from 'fs';
import {revalidateTag} from 'next/cache';
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

export async function PATCH(req: NextRequest, {params}: {params: Promise<{reviewId: string}>}) {
  const {reviewId} = await params;
  const filePath = path.join(process.cwd(), 'public/data', `review_detail_${reviewId}.json`);

  try {
    const fileData = readFileSync(filePath, 'utf-8');
    const reviewData = JSON.parse(fileData);

    const updatedData = await req.json();

    const newReviewData = Object.assign(reviewData, updatedData);

    writeFileSync(filePath, JSON.stringify(newReviewData));
    revalidateTag(`review-${reviewId}`);

    return NextResponse.json({message: '리뷰가 성공적으로 수정되었습니다.'});
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

export async function DELETE() {
  return NextResponse.json({status: 204});
}

// TODO: 백엔드 API 구현 완료 후 주석 해제
// export async function PATCH(req: NextRequest, {params}: {params: Promise<{reviewId: string}>}) {
//   const {reviewId} = await params;

//   if (!reviewId) {
//     return NextResponse.json(
//       {
//         errorCode: 'REVIEW_ID_MISSING',
//         message: '리뷰 ID가 제공되지 않았습니다.',
//       },
//       {
//         status: 400,
//       },
//     );
//   }

//   const cookieStore = await cookies();
//   const accessToken = cookieStore.get('accessToken');

//   if (!accessToken) {
//     return NextResponse.json(
//       {
//         errorCode: 'UNAUTHORIZED',
//         message: '로그인이 필요합니다.',
//       },
//       {
//         status: 401,
//       },
//     );
//   }

//   const reviewData = await req.json();

//   const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/reviews/${reviewId}`, {
//     method: 'PATCH',
//     headers: {
//       'Content-Type': 'application/json',
//       Cookie: `accessToken=${accessToken.value}`,
//     },
//     body: JSON.stringify(reviewData),
//   });

//   if (!res.ok) {
//     const errorData = await res.json();
//     return NextResponse.json(
//       {
//         errorCode: errorData.errorCode || 'INTERNAL_SERVER_ERROR',
//         message: errorData.message || '서버 오류가 발생했습니다.',
//       },
//       {
//         status: res.status,
//       },
//     );
//   }

//   revalidateTag(`review-${reviewId}`);
//   return NextResponse.json({status: 201});
// }

// export async function DELETE(_: NextRequest, {params}: {params: Promise<{reviewId: string}>}) {
//   const {reviewId} = await params;

//   if (!reviewId) {
//     return NextResponse.json(
//       {
//         errorCode: 'REVIEW_ID_MISSING',
//         message: '리뷰 ID가 제공되지 않았습니다.',
//       },
//       {
//         status: 400,
//       },
//     );
//   }

//   const cookieStore = await cookies();
//   const accessToken = cookieStore.get('accessToken');

//   if (!accessToken) {
//     return NextResponse.json(
//       {
//         errorCode: 'UNAUTHORIZED',
//         message: '로그인이 필요합니다.',
//       },
//       {
//         status: 401,
//       },
//     );
//   }

//   const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/reviews/${reviewId}`, {
//     method: 'DELETE',
//     headers: {
//       'Content-Type': 'application/json',
//       Cookie: `accessToken=${accessToken.value}`,
//     },
//   });

//   if (!res.ok) {
//     const errorData = await res.json();
//     return NextResponse.json(
//       {
//         errorCode: errorData.errorCode || 'INTERNAL_SERVER_ERROR',
//         message: errorData.message || '서버 오류가 발생했습니다.',
//       },
//       {
//         status: res.status,
//       },
//     );
//   }

//   revalidateTag(`review-${reviewId}`);
//   return NextResponse.json({}, {status: 204});
// }
