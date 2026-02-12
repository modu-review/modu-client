import {ChatBubble, BotResponse} from '@/entities/ai-search';

export function AISearchTestPage() {
  return (
    <section className="flex flex-col w-full h-full justify-center items-center">
      <h2 className="text-lg font-semibold mb-4">AI 검색 기능 UI 테스트 페이지</h2>
      <section className="w-[520px] h-[700px] flex flex-col bg-neutral-50 shadow-xl p-4 gap-6">
        {/* 케이스 1: 말풍선 1개 */}
        <BotResponse>
          <ChatBubble>
            안녕하세요! <strong>모후봇</strong>입니다.
          </ChatBubble>
        </BotResponse>

        {/* 케이스 2: 말풍선 2개 */}
        <BotResponse>
          <ChatBubble>
            혹시 <strong>"프레드피자"</strong>에 대한 후기를 못 찾으셨나요?
          </ChatBubble>
          <ChatBubble>제가 대신 검색해서 요약해 드릴 수 있어요!</ChatBubble>
        </BotResponse>
      </section>
    </section>
  );
}
