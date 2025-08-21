import {NextResponse} from 'next/server';

export async function GET() {
  await new Promise(resolve => setTimeout(resolve, 2500));

  return NextResponse.json({
    profileImage: 'https://picsum.photos/seed/ee2/200/200',
  });
}
