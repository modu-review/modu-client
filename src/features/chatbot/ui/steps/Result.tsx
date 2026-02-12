import {
  BotResponse,
  ChatBubble,
  FormattedSummary,
  Step,
  useChatStore,
  useGetAIReviewSummary,
} from '@/entities/ai-search';
import {useShallow} from 'zustand/react/shallow';

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
    </Step>
  );
}
