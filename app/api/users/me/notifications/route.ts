import {Notifications} from '@/entities/notifications';
import {readFileSync} from 'fs';
import {NextResponse} from 'next/server';
import path from 'path';

export async function GET() {
  const filePath = path.join(process.cwd(), 'public/data', 'notifications.json');

  const fileData = readFileSync(filePath, 'utf-8');
  const notificationData: Notifications = JSON.parse(fileData);

  const notifications = notificationData.results.filter(notification => !notification.isDeleted);

  return NextResponse.json(Object.assign(notificationData, {results: notifications}));
}
