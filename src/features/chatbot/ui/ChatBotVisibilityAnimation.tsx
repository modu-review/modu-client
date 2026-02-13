'use client';

import {useEffect, useState} from 'react';

type Props = {
  isVisible: boolean;
  children: React.ReactNode;
};

export default function ChatBotVisibilityAnimation({isVisible, children}: Props) {
  const [shouldRender, setShouldRender] = useState(isVisible);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    if (isVisible) {
      setShouldRender(true);
    } else {
      timeoutId = setTimeout(() => {
        setShouldRender(false);
      }, 200);
    }

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [isVisible]);

  if (!shouldRender) return null;

  return (
    <section
      className={`absolute bottom-[4.5rem] right-0 z-50
        ${isVisible ? 'animate-fade-up' : 'animate-fade-out'}
      `}
    >
      {children}
    </section>
  );
}
