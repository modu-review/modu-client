import {create} from 'zustand';
import {AISearchCategory, AISearchResult} from './types';
import {Category} from '@/entities/review';

type ChatStep = 'input' | 'ask' | 'search' | 'result';

type State = {
  isOpen: boolean;
  step: ChatStep;
  keyword: string;
  category: Category;
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
  keyword: '',
  category: 'all',
  result: null,

  openChat: keyword => {
    if (keyword && keyword.trim() !== '') {
      set({isOpen: true, keyword, step: 'ask'});
    } else {
      set({isOpen: true, keyword: '', step: 'input'});
    }
  },
  closeChat: () => set({isOpen: false, category: 'all'}),

  goToInput: () => set({step: 'input', keyword: '', result: null, category: 'all'}),
  setStep: step => set({step}),
  setCategory: category => set({category}),
  setKeyword: keyword => set({keyword}),
  setResult: result => set({result, step: 'result'}),
}));
