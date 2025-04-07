import {create} from 'zustand';
import {User} from './types';

type State = User;

type Action = {
  updateUser: (user: User) => void;
};

const userStore = create<State & Action>(set => ({
  isLoggedIn: false,
  userEmail: null,
  userId: null,

  updateUser: user => set({...user}),
}));

const useIsLoggedIn = () => userStore(state => state.isLoggedIn);
const useUserEmail = () => userStore(state => state.userEmail);
const useUserId = () => userStore(state => state.userId);
const useUpdateUser = () => userStore(state => state.updateUser);

export {useIsLoggedIn, useUserEmail, useUserId, useUpdateUser};
