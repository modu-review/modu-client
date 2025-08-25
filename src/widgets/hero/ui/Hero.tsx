// import WriteReviewButton from './WriteReviewButton';
// import {SearchBar} from '@/features/reviews/search-bar';

// export default function Hero() {
//   return (
//     <section className="flex flex-col justify-center items-center mt-20">
//       <article className="text-center font-semibold mb-8 text-[20px] md:text-[26px] lg:text-[32px]">
//         <p className="mb-3 md:mb-0">
//           내가 경험하지 못한 것을 누군가는 <br className="md:hidden" /> 먼저 경험했습니다.
//         </p>
//         <p>세상의 모든 후기를</p>
//         <p>
//           바로 여기 <span className="text-boldBlue">{"'모두의 : 후기'"}</span>에서 확인하세요.
//         </p>
//       </article>
//       {/* <WriteReviewButton /> */}
//       <SearchBar />
//     </section>
//   );
// }
'use client';

import {motion} from 'framer-motion';
import WriteReviewButton from './WriteReviewButton';
import {SearchBar} from '@/features/reviews/search-bar';

const textItems = [
  '내가 경험하지 못한 것을 누군가는 먼저 경험했습니다.',
  '세상의 모든 후기를',
  "바로 여기 '모두의 : 후기'에서 확인하세요.",
];

export default function Hero() {
  return (
    <section className="flex flex-col justify-center items-center mt-20">
      <article className="text-center font-semibold mb-5 md:mb-8 lg:mb-8 text-[18px] md:text-[26px] lg:text-[32px]">
        {textItems.map((text, index) => (
          <motion.p
            key={index}
            initial={{opacity: 0, y: 10}}
            animate={{opacity: 1, y: 0}}
            transition={{
              delay: index * 1,
              duration: 0.6,
              ease: 'easeOut',
            }}
            className="mb-1 md:mb-0"
          >
            {index === 2 ? (
              <>
                바로 여기 <span className="text-boldBlue font-bold">모두의 : 후기</span>에서 확인하세요.
              </>
            ) : (
              text
            )}
          </motion.p>
        ))}
      </article>
      <WriteReviewButton />
      <SearchBar />
    </section>
  );
}
