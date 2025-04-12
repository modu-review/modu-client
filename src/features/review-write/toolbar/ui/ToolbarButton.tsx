import {cn} from '@/shared/lib/utils/cn';
import {LucideIcon} from '@/shared/ui/icons';
import {cva, VariantProps} from 'class-variance-authority';
import {icons} from 'lucide-react';

const variants = cva('', {
  variants: {
    iconType: {
      node: 'w-[22px] h-[22px]',
      marks: 'w-[18px] h-[18px]',
      image: 'w-[20px] h-[20px]',
    },
    active: {
      true: 'bg-gray-200',
      false: 'bg-white',
    },
  },
});

type Props = VariantProps<typeof variants> & {
  icon: keyof typeof icons;
  onClick: () => void;
};

function ToolbarButton({icon, active, onClick, iconType}: Props) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'w-[35px] h-[35px] flex items-center justify-center hover:bg-gray-100 cursor-pointer',
        variants({active}),
      )}
    >
      <LucideIcon name={icon} className={variants({iconType})} />
    </button>
  );
}

export default ToolbarButton;
