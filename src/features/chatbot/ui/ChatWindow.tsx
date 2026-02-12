export default function ChatWindow() {
  return (
    <section className="relative w-[500px] h-[700px] overflow-y-auto flex flex-col rounded-2xl shadow-2xl bg-neutral-100">
      <header className="sticky top-0 py-3 bg-white border-b flex justify-center items-center">
        <h3 className="font-bold text-lg text-gray-800">모후봇</h3>
      </header>
    </section>
  );
}
