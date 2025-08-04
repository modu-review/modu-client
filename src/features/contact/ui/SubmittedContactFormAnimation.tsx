import {AnimatePresence, motion} from 'framer-motion';

export default function SubmittedContactFormAnimation() {
  return (
    <AnimatePresence>
      <motion.div
        key="submitted"
        initial={{y: 50, opacity: 0}}
        animate={{y: 0, opacity: 1}}
        exit={{y: -50, opacity: 0}}
        transition={{duration: 0.5}}
        className="absolute inset-0 z-10 bg-white/80 backdrop-blur-sm flex items-center justify-center text-center rounded-3xl"
      >
        <motion.h2
          className="text-3xl font-bold text-gray-800 mb-2"
          initial={{scale: 0.8}}
          animate={{scale: 1}}
          transition={{delay: 0.3}}
        >
          문의가 성공적으로 전송되었습니다! 🎉
          <br />
          <span className="text-base text-gray-500 mt-2 block">곧 답변드리겠습니다! 감사합니다 ☺️</span>
        </motion.h2>
      </motion.div>
    </AnimatePresence>
  );
}
