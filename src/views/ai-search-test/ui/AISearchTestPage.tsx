import {BotAvatar, ChatBubble} from '@/entities/ai-search';

export function AISearchTestPage() {
  return (
    <section className="flex flex-col w-full h-full justify-center items-center">
      <h2 className="text-lg font-semibold mb-4">AI 검색 기능 UI 테스트 페이지</h2>
      <section className="w-[520px] h-[700px] flex flex-col bg-neutral-50 shadow-xl p-4 gap-6">
        <div>
          <BotAvatar />
        </div>
        <div className="max-w-[80%]">
          <ChatBubble>
            <p>
              혹시 <strong>"프레드피자"</strong>에 대한 후기를 못 찾으셨나요?
            </p>
          </ChatBubble>
        </div>
      </section>
    </section>
  );
}
