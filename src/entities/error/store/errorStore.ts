import {RequestError} from '@/shared/apis/request-error';
import {ClientError} from '@/shared/lib/utils/client-error';
import {create} from 'zustand';

type State = {
  error: RequestError | ClientError | null;
};

type Action = {
  updateError: (error: State['error']) => void;
};

const globalErrorStore = create<State & Action>(set => ({
  error: null,
  updateError: error => set({error}),
}));

export const useGlobalError = () => globalErrorStore(state => state.error);
export const useUpdateGlobalError = () => globalErrorStore(state => state.updateError);
