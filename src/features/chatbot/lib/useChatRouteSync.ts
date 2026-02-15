import {useEffect} from 'react';
import {usePathname} from 'next/navigation';
import {useShallow} from 'zustand/react/shallow';
import {useChatStore} from '@/entities/ai-search';

export function useChatRouteSync() {
  const pathname = usePathname();

  const {setKeyword, setStep, goToInput} = useChatStore(
    useShallow(state => ({
      setKeyword: state.setKeyword,
      setStep: state.setStep,
      goToInput: state.goToInput,
    })),
  );

  useEffect(() => {
    if (pathname.startsWith('/search/')) {
      const segments = pathname.split('/');
      const rawKeyword = segments[2];

      if (rawKeyword) {
        const decodedKeyword = decodeURIComponent(rawKeyword);
        setKeyword(decodedKeyword);
        setStep('ask');
      }
    } else {
      goToInput();
    }
  }, [pathname, setKeyword, setStep, goToInput]);
}
