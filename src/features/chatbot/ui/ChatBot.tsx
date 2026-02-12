'use client';

import {useState} from 'react';
import ChatBotTrigger from './ChatBotTrigger';
import ChatBotVisibilityAnimation from './ChatBotVisibilityAnimation';
import ChatWindow from './ChatWindow';

export function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);

  const toogleChatBot = () => {
    setIsOpen(prev => !prev);
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
