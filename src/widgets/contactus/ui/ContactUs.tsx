//white mode
// export default function ContactUs() {
//   return (
//     // <section className="flex justify-center items-center py-20 md:py-24 lg:py-24 px-4 bg-[#f9fafb]">
//     <section className="flex justify-center items-center py-20 md:py-24 lg:py-24 px-4 bg-boldBlue">
//       <div className="w-full max-w-4xl rounded-[2rem] shadow-2xl bg-white text-center py-20 px-6">
//         {/* Badge */}
//         <div className="inline-flex items-center justify-center px-4 py-1 rounded-full bg-[#ecfdf5] mb-10">
//           <span className="h-2 w-2 bg-green-500 rounded-full mr-2 animate-pulse" />
//           <span className="text-sm font-medium text-[#065f46]">항시 대기중</span>
//         </div>

//         {/* Headline */}
//         <h2 className="text-medium md:text-xl lg:text-xl font-bold text-gray-900 mb-6 leading-tight">
//           💬 후기는 모였고, 이제 아이디어 차례! <br />
//           사이트에 바라는 점이나 번뜩이는 의견이 있다면, <br />
//           여기 <span className=" inline-block animate-bounce mt-2">👇🏻</span> 살포시 남겨주세요.
//         </h2>

//         {/* Button */}
//         <button className="mt-6 px-6 md:px-8 lg:px-8 py-3 rounded-full bg-boldBlue text-white hover:bg-black hover:shadow-lg transition text-lg font-medium">
//           Contact Us
//         </button>
//       </div>
//     </section>
//   );
// }
import Link from 'next/link';

// blue mode
export default function ContactUs() {
  return (
    <section className="flex justify-center items-center py-24 px-4 bg-white border-t-[0.3rem] border-t-[#F1F3F5] border-dashed">
      <div className="w-full max-w-4xl rounded-[2rem] shadow-2xl bg-boldBlue text-center py-20 px-6">
        {/* Badge */}
        <div className="inline-flex items-center justify-center px-4 py-1 rounded-full bg-[#ecfdf5] mb-6">
          <span className="h-2 w-2 animate-pulse bg-green-500 rounded-full mr-2" />
          <span className="text-sm font-medium text-[#065f46]">항시 대기중</span>
        </div>

        {/* Content */}
        <h2 className="text-xl md:text-2xl lg:text-2xl font-semibold text-white mb-6 leading-tight">
          {/* 후기는 모였고, 이제 아이디어 차례! <br /> */}
          사이트에 바라는 점이나 <br /> 번뜩이는 의견이 있다면, 여기 남겨주세요.
          {/* 여기 <span className=" inline-block animate-bounce mt-2">👇🏻</span> 살포시 남겨주세요. */}
        </h2>

        {/* Button */}
        <Link href="/contact">
          <button className="mt-6 px-6 py-3 rounded-full  bg-white shadow-2xl text-black hover:bg-lightBlue transition text-lg font-bold">
            Contact us
          </button>
        </Link>
      </div>
    </section>
  );
}
