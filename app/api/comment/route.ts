import {readFileSync, writeFileSync} from 'fs';
import {NextRequest, NextResponse} from 'next/server';
import path from 'path';

export async function POST(req: NextRequest) {
  const {user_id, board_id, category, content} = await req.json();

  if (!user_id || !board_id || !category || !content) {
    return NextResponse.json(
      {
        errorCode: 'INVALID_COMMENT_PARAMETERS',
        message: '필수 파라미터가 누락되었습니다.',
      },
      {status: 400},
    );
  }

  const filePath = path.join(process.cwd(), 'public/data', `review_comments_${board_id}_3.json`);
  const fileData = readFileSync(filePath, 'utf-8');

  const commentsData = JSON.parse(fileData);

  commentsData.comments.push({
    id: commentsData.comments.at(-1).id + 1,
    author: user_id,
    profile_image: 'https://picsum.photos/seed/picsum/200/200',
    content,
    created_at: new Date().toISOString(),
  });

  writeFileSync(filePath, JSON.stringify(commentsData));

  return NextResponse.json(
    {
      message: '댓글이 성공적으로 등록되었습니다.',
    },
    {
      status: 201,
    },
  );
}
