import {NextResponse} from 'next/server';

export async function POST() {
  return NextResponse.json({
    message: '프로필 이미지 변경 성공!',
  });
}

export async function DELETE() {
  return NextResponse.json({
    message: '프로필 이미지 삭제 성공!',
  });
}
