import {ChatBubble, BotResponse, SourceCard, FormattedSummary} from '@/entities/ai-search';
import {ChatBot} from '@/features/chatbot';

export function AISearchTestPage() {
  return (
    <section className="flex flex-col w-full h-full justify-center items-center">
      <h2 className="text-lg font-semibold mb-4">AI 검색 기능 UI 테스트 페이지</h2>
      <section className="w-[520px] h-[700px] overflow-auto flex flex-col bg-neutral-50 shadow-xl p-4 gap-6">
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

        {/* 케이스 3: 참고한 게시글 표시 */}
        <article className="grid grid-cols-3 gap-1">
          <SourceCard
            source={{
              title: '바질버터관자피자 맛집 프레드피자 - 세상이리뷰다',
              snippet: "평점 맛 양 가격 친절 '프레드피자 잠실점' 어때요? 배달의민족 앱에서 확인해보세요.",
              url: 'https://worldrview.tistory.com/entry/%EB%B0%94%EC%A7%88%EB%B2%84%ED%84%B0%EA%B4%80%EC%9E%90%ED%94%BC%EC%9E%90-%EB%A7%9B%EC%A7%91-%ED%94%84%EB%A0%88%EB%93%9C%ED%94%BC%EC%9E%90',
            }}
          />
          <SourceCard
            source={{
              title: '[서울/관악] 프레드 피자 추천 메뉴! (바질버터관자/쉬림플렉스 ...',
              snippet:
                '크리미한 바질버터관자와 매콤한 쉬림플렉스 조합. 말해 뭐해... 진짜 진짜 추천 조합. 아낌없이 푸짐한 토핑... 먹음직스럽다.',
              url: 'https://blog.naver.com/tndus_insta/223419947127?viewType=pc',
            }}
          />
          <SourceCard
            source={{
              title: '프레드 피자(FRED PIZZA) 솔직후기 _ 바질버터관자 ...',
              snippet:
                '오늘 먹은 메뉴들 중에서 제일 맛있었고,. 저는 이 메뉴는 강력추천할 수 있습니다! ​. 재구매의사 상당히 높고. 청년피자 매드쉬림프에서 살짝 매콤하되.',
              url: 'https://blog.naver.com/sangyun1106/223306898901',
            }}
          />
        </article>

        {/* 케이스 4: 요약 내용 표시 */}
        <BotResponse>
          <ChatBubble>
            <FormattedSummary text="프레드피자 바질버터관자 피자는 부드러운 바질버터 소스에 버터에 구운 관자를 듬뿍 올려 풍부하고 고소한 맛을 내며, 감자와 베이컨이 함께 어우러져 씹는 재미와 짭짤함을 더한다. 크리미하면서도 약간 매콤한 풍미가 조화를 이루고, 토핑이 넉넉해 양도 충분해 1인 식사로 충분히 만족스럽다. 가격대는 일반 피자와 비슷하거나 약간 높지만, 관자와 고급 재료가 들어가고 양·맛·가성비 모두 높은 편이라 재구매 의사가 높으며, 특히 반반 주문 시 쉬림프 피자와의 조합도 강력히 추천한다." />
          </ChatBubble>
        </BotResponse>
      </section>
      <div className="fixed bottom-20 right-8">
        <ChatBot />
      </div>
    </section>
  );
}
