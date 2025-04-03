import {readFileSync} from 'fs';
import {NextRequest, NextResponse} from 'next/server';
import path from 'path';

export async function GET(req: NextRequest) {
  const searchParms = req.nextUrl.searchParams;
  //   const categoryId = searchParms.get('categoryId');
  const cursor = searchParms.get('cursor');
  console.log('cursor', cursor);
  const filePath = path.join(process.cwd(), 'public/data', `search_result_${cursor}.json`);
  const searchResult = readFileSync(filePath, 'utf-8');

  return NextResponse.json(JSON.parse(searchResult));
}
