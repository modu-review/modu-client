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
  const {keyword, category, goToInput, closeChat} = useChatStore(
    useShallow(state => ({
      keyword: state.keyword,
      category: state.category,
      goToInput: state.goToInput,
      closeChat: state.closeChat,
    })),
  );

  const {
    data: {summary, sources},
  } = useGetAIReviewSummary(keyword, category);

  return (
    <Step>
      <BotResponse>
        <ChatBubble>
          <FormattedSummary text={summary} />
        </ChatBubble>
      </BotResponse>

      {sources.length > 0 && (
        <div className="flex flex-col gap-2 mt-4">
          <span className="text-sm font-bold text-gray-500 ml-1">참고한 리뷰 출처 ({sources.length})</span>
          <SourceCarousel sources={sources} />
        </div>
      )}
    </Step>
  );
}
