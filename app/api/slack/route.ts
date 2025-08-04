import {NextResponse} from 'next/server';

export async function POST(request: Request) {
  const {name, email, message} = await request.json();

  if (!name || !email || !message) {
    return NextResponse.json(
      {
        errorCode: 'MISSING_REQUIRED_FIELDS',
        message: '이름, 이메일, 메시지 필드가 모두 필요합니다.',
      },
      {status: 400},
    );
  }

  const slackWebhookURL = process.env.NEXT_SLACK_WEBHOOK_URL;

  if (!slackWebhookURL) {
    return NextResponse.json(
      {
        errorCode: 'SLACK_WEBHOOK_URL_NOT_SET',
        message: '슬랙 웹훅 URL이 설정되지 않았어요. 관리자에게 문의해주세요.',
      },
      {status: 500},
    );
  }

  const slackMessage = {
    text: `📩 새 문의가 도착했습니다!📩 \n\n👤 이름: ${name}\n📧 이메일: ${email}\n💬 메시지: ${message}\n\n-----------------------------------------------------------`,
  };

  const res = await fetch(slackWebhookURL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(slackMessage),
  });

  if (!res.ok) {
    return NextResponse.json(
      {
        errorCode: 'SLACK_MESSAGE_SEND_ERROR',
        message: '슬랙 메시지 전송에 실패했습니다.',
      },
      {status: 500},
    );
  }

  return NextResponse.json({success: true});
}
