import {create} from 'zustand';
import {User} from './types';

type State = User;

type Action = {
  updateUser: (user: User) => void;
};

const userStore = create<State & Action>(set => ({
  isLoggedIn: false,
  userNickname: null,
  userEmail: null,

  updateUser: user => set({...user}),
}));

const useIsLoggedIn = () => userStore(state => state.isLoggedIn);
const useUserNickname = () => userStore(state => state.userNickname);
const useUserEmail = () => userStore(state => state.userEmail);
const useUpdateUser = () => userStore(state => state.updateUser);

export {useIsLoggedIn, useUserNickname, useUserEmail, useUpdateUser};
