export default function ContactUs() {
  return (
    <section className="flex justify-center items-center py-24 px-4 bg-[#f9fafb]">
      <div className="w-full max-w-4xl rounded-[2rem] shadow-xl bg-white text-center py-20 px-6">
        {/* Badge */}
        <div className="inline-flex items-center justify-center px-4 py-1 rounded-full bg-[#ecfdf5] mb-6">
          <span className="h-2 w-2 bg-green-500 rounded-full mr-2" />
          <span className="text-sm font-medium text-[#065f46]">항시 대기중</span>
        </div>

        {/* Headline */}
        <h2 className="text-2xl sm:text-xl font-bold text-gray-900 mb-6 leading-tight">
          💬 후기는 모였고, 이제 아이디어 차례! <br />
          사이트에 바라는 점이나 번뜩이는 의견이 있다면, <br />
          여기 <span className=" inline-block animate-bounce mt-2">👇🏻</span> 살포시 남겨주세요.
        </h2>

        {/* Button */}
        <button className="mt-6 px-6 py-3 rounded-full border border-gray-400 hover:border-black transition text-lg font-medium">
          Contact Us
        </button>
      </div>
    </section>
  );
}
