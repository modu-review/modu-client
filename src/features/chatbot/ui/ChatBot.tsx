'use client';

import {useShallow} from 'zustand/react/shallow';
import ChatBotTrigger from './ChatBotTrigger';
import ChatBotVisibilityAnimation from './ChatBotVisibilityAnimation';
import ChatWindow from './ChatWindow';
import {useChatStore} from '@/entities/ai-search';

type Props = {
  keyword?: string;
};

export function ChatBot({keyword}: Props) {
  const {isOpen, openChat, closeChat} = useChatStore(
    useShallow(state => ({
      isOpen: state.isOpen,
      openChat: state.openChat,
      closeChat: state.closeChat,
    })),
  );

  const toogleChatBot = () => {
    if (isOpen) closeChat();
    else openChat(keyword);
  };

  return (
    <div className="relative">
      <ChatBotVisibilityAnimation isVisible={isOpen}>
        <ChatWindow />
      </ChatBotVisibilityAnimation>
      <ChatBotTrigger isOpen={isOpen} toogleChatBot={toogleChatBot} />
    </div>
  );
}
