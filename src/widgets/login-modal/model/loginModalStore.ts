import {create} from 'zustand';

type State = {
  isOpen: boolean;
};

type Action = {
  openLoginModal: () => void;
  closeLoginModal: () => void;
};

const loginModalStore = create<State & Action>(set => ({
  isOpen: false,
  openLoginModal: () => set({isOpen: true}),
  closeLoginModal: () => set({isOpen: false}),
}));

export const useIsOpenLoginModal = () => loginModalStore(state => state.isOpen);
export const useOpenLoginModal = () => loginModalStore(state => state.openLoginModal);
export const useCloseLoginModal = () => loginModalStore(state => state.closeLoginModal);
