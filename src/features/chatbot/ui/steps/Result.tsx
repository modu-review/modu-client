import {
  BotResponse,
  ChatBubble,
  FormattedSummary,
  Step,
  useChatStore,
  useGetAIReviewSummary,
} from '@/entities/ai-search';
import {useShallow} from 'zustand/react/shallow';
import SourceCarousel from './SourceCarousel';

export default function Result() {
  const {keyword, category, goToInput} = useChatStore(
    useShallow(state => ({
      keyword: state.keyword,
      category: state.category,
      goToInput: state.goToInput,
    })),
  );

  const {
    data: {summary, sources},
  } = useGetAIReviewSummary(keyword, category);

  return (
    <Step className="gap-6 h-fit min-h-full">
      <BotResponse>
        <ChatBubble>
          <FormattedSummary text={summary} />
        </ChatBubble>
      </BotResponse>

      {sources.length > 0 && (
        <div className="flex flex-col gap-2">
          <span className="text-sm font-bold text-gray-500 ml-1">참고한 리뷰 출처 ({sources.length})</span>
          <SourceCarousel sources={sources} />
        </div>
      )}

      <button
        onClick={goToInput}
        className="bg-mediumBlue text-white py-2.5 w-full rounded-full font-semibold hover:bg-boldBlue transition-colors"
      >
        다른 검색하기
      </button>
    </Step>
  );
}
