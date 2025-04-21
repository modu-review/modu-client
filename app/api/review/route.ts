import {readFileSync, writeFileSync} from 'fs';
import {NextRequest, NextResponse} from 'next/server';
import path from 'path';

export async function POST(req: NextRequest) {
  const data = await req.json();

  const filePath = path.join(process.cwd(), 'public', 'save_test.json');

  const fileData = readFileSync(filePath, 'utf-8');
  const parsedData = JSON.parse(fileData);

  parsedData.push(data);

  writeFileSync(filePath, JSON.stringify(parsedData));

  await new Promise(resolve => setTimeout(resolve, 3000));

  return NextResponse.json({message: '저장 성공!'});
}
