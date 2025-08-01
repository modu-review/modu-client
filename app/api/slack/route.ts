import {NextResponse} from 'next/server';

export async function POST(request: Request) {
  const {name, email, message} = await request.json();

  const slackWebhookURL = process.env.SLACK_WEBHOOK_URL!;

  const slackMessage = {
    text: `📩 새 문의가 도착했습니다!\n\n👤 이름: ${name}\n📧 이메일: ${email}\n💬 메시지: ${message}`,
  };

  const res = await fetch(slackWebhookURL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(slackMessage),
  });

  if (!res.ok) {
    return NextResponse.json({success: false, error: 'Slack 전송 실패'}, {status: 500});
  }

  return NextResponse.json({success: true});
}
