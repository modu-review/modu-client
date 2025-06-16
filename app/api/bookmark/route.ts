import {readFileSync, writeFileSync} from 'fs';
import {NextRequest, NextResponse} from 'next/server';
import path from 'path';

export async function POST(req: NextRequest) {
  const {user_id, board_id} = await req.json();

  if (!user_id) {
    return NextResponse.json({
      errorCode: 'USER_ID_NOT_PROVIDED',
      message: '사용자 ID가 제공되지 않았습니다.',
    });
  }

  if (!board_id) {
    return NextResponse.json({
      errorCode: 'REVIEW_ID_NOT_PROVIDED',
      message: '리뷰 ID가 제공되지 않았습니다.',
    });
  }

  const filePath = path.join(process.cwd(), 'public/data', `review_bookmarks_${board_id}.json`);

  const fileData = readFileSync(filePath, 'utf-8');
  const bookmarksData = JSON.parse(fileData);

  const newBookmarksData = {
    hasBookmarked: !bookmarksData.hasBookmarked,
    bookmarks: bookmarksData.hasBookmarked ? bookmarksData.bookmarks - 1 : bookmarksData.bookmarks + 1,
  };

  writeFileSync(filePath, JSON.stringify(newBookmarksData));

  return NextResponse.json({
    message: '북마크 성공',
  });
}
