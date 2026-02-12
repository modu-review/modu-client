import Input from './steps/Input';
import Ask from './steps/Ask';
import Search from './steps/Search';
import Loading from './steps/Loading';
import Result from './steps/Result';
import Error from './steps/Error';
import {useChatStore} from '@/entities/ai-search/model/chatStore';

export default function ChatWindow() {
  const step = useChatStore(state => state.step);

  return (
    <section className="relative w-[500px] h-[700px] overflow-y-auto flex flex-col rounded-2xl shadow-2xl bg-neutral-100">
      <header className="sticky top-0 py-3 bg-white border-b flex justify-center items-center">
        <h3 className="font-bold text-lg text-gray-800">모후봇</h3>
      </header>
      <section className="p-4 h-full">
        {step === 'input' && <Input />}
        {step === 'ask' && <Ask />}
        {step === 'search' && <Search />}
        {step === 'loading' && <Loading />}
        {step === 'result' && <Result />}
        {step === 'error' && <Error />}
      </section>
    </section>
  );
}
