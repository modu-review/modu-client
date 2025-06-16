import {readFileSync} from 'fs';
import {NextRequest, NextResponse} from 'next/server';
import path from 'path';

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;

  const page = searchParams.get('page');

  if (!page) {
    return NextResponse.json({errorCode: 'EMPTY_PAGE_PARAM'}, {status: 400});
  }

  const filePath = path.join(process.cwd(), `public/data`, `search_result_page_${page}.json`);
  const searchResult = readFileSync(filePath, 'utf-8');

  return NextResponse.json(JSON.parse(searchResult));
}
