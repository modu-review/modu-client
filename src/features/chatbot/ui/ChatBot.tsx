'use client';

import {useState} from 'react';
import ChatBotTrigger from './ChatBotTrigger';

export function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);

  const toogleChatBot = () => {
    setIsOpen(prev => !prev);
  };

  return (
    <div className="relative">
      {isOpen && <section className="absolute bottom-[4.5rem] right-0">챗봇 열림</section>}
      <ChatBotTrigger isOpen={isOpen} toogleChatBot={toogleChatBot} />
    </div>
  );
}
