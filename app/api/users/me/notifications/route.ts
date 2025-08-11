import {readFileSync} from 'fs';
import {NextResponse} from 'next/server';
import path from 'path';

export async function GET() {
  const filePath = path.join(process.cwd(), 'public/data', 'notifications.json');

  const fileData = readFileSync(filePath, 'utf-8');

  return NextResponse.json(JSON.parse(fileData));
}
