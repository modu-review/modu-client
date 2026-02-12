import {create} from 'zustand';
import {AISearchCategory, AISearchResult} from './types';

type ChatStep = 'input' | 'ask' | 'search' | 'loading' | 'result' | 'error';

type State = {
  isOpen: boolean;
  step: ChatStep;
  keyword: string | null;
  category: AISearchCategory | null;
  result: AISearchResult | null;
};

type Action = {
  openChat: (keyword?: string) => void;
  closeChat: () => void;

  goToInput: () => void;
  setStep: (step: ChatStep) => void;
  setCategory: (category: AISearchCategory) => void;
  setKeyword: (keyword: string) => void;
  setResult: (result: AISearchResult) => void;
};

export const useChatStore = create<State & Action>(set => ({
  isOpen: false,
  step: 'ask',
  keyword: null,
  category: null,
  result: null,

  openChat: keyword => {
    if (keyword && keyword.trim() !== '') {
      set({isOpen: true, keyword, step: 'ask'});
    } else {
      set({isOpen: true, keyword: null, step: 'input'});
    }
  },
  closeChat: () => set({isOpen: false, keyword: null, category: null}),

  goToInput: () => set({step: 'input', keyword: null, result: null}),
  setStep: step => set({step}),
  setCategory: category => set({category}),
  setKeyword: keyword => set({keyword}),
  setResult: result => set({result, step: 'result'}),
}));
