import {RefObject} from 'react';
import {cn} from '@/shared/lib/utils/cn';
import {LucideIcon} from '@/shared/ui/icons';
import {icons} from 'lucide-react';
import {cva, VariantProps} from 'class-variance-authority';

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

type Props = VariantProps<typeof variants> &
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    icon: keyof typeof icons;
    ref?: RefObject<HTMLButtonElement>;
  };

function ToolbarButton({icon, iconType, active, ref, ...props}: Props) {
  return (
    <button
      ref={ref}
      className={cn(
        'w-[35px] h-[35px] flex items-center justify-center hover:bg-gray-100 cursor-pointer',
        variants({active}),
      )}
      {...props}
    >
      <LucideIcon name={icon} className={variants({iconType})} />
    </button>
  );
}

ToolbarButton.displayName = 'ToolbarButton';
export default ToolbarButton;
