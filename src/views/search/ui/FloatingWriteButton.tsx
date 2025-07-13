import {LucideIcon} from '@/shared/ui/icons';

export default function FloatingWriteButton() {
  return (
    <button className="fixed bottom-4 right-4 md:bottom-8 md:right-6 lg:right-8 bg-boldBlue text-white rounded-full p-3 shadow-lg hover:bg-extraboldBlue transition-colors">
      <LucideIcon name="Plus" size={24} />
    </button>
  );
}
