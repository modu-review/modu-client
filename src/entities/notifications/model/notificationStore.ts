import {create} from 'zustand';

type State = {
  hasNotifications: boolean;
};

type Action = {
  setHasNotifications: (hasNotifications: boolean) => void;
};

const notificationStore = create<State & Action>(set => ({
  hasNotifications: false,

  setHasNotifications: (hasNotifications: boolean) => set({hasNotifications}),
}));

const useHasNotifications = () => notificationStore(state => state.hasNotifications);
const useSetHasNotifications = () => notificationStore(state => state.setHasNotifications);

export {useHasNotifications, useSetHasNotifications};
