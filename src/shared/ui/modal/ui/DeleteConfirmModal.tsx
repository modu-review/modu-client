type Props = {
  onDelete: () => void;
  onDeleteCancel: () => void;
  text?: string;
};

export default function DeleteConfirmModal({onDelete, onDeleteCancel, text}: Props) {
  return (
    <section className="w-[300px] md:w-[330px] h-[170px] md:h-[190px] bg-white z-30 rounded-lg flex flex-col items-center animate-fade-up">
      <div className="flex flex-1 flex-col items-center justify-center">
        <h3 className="text-xl md:text-2xl font-bold mb-2">정말 삭제하시겠어요?</h3>
        <p className="text-sm md:text-base text-gray-500">{text}</p>
      </div>
      <div className="w-full flex items-center gap-4 px-4 mb-4 md:mb-5">
        <button
          className="w-full py-1.5 bg-gray-300 text-black rounded-md hover:bg-gray-300/80 transition-colors"
          aria-label="취소"
          onClick={onDeleteCancel}
        >
          취소
        </button>
        <button
          className="w-full text-center py-1.5 bg-boldBlue text-white rounded-md hover:bg-boldBlue/80 transition-colors"
          aria-label="삭제"
          onClick={onDelete}
        >
          삭제
        </button>
      </div>
    </section>
  );
}
