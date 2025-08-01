type SlackForm = {
  name: string;
  email: string;
  message: string;
};

export async function sendSlackMessage(data: SlackForm) {
  const res = await fetch('/api/slack', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error('Slack 전송 실패');
  }
}
