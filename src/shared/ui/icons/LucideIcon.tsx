import {HTMLAttributes} from 'react';
import {icons} from 'lucide-react';
import {cn} from '@/shared/lib/utils';

type LucideIconProps = HTMLAttributes<HTMLOrSVGElement> & {
  name: keyof typeof icons;
  size: number;
  color?: string;
};

const LucideIcon = ({name, size, color, ...props}: LucideIconProps) => {
  const Icon = icons[name];
  const isClickEvent = !!props.onClick; // 클릭이벤트가 있으면(!!) 참으로 만들기
  const pointerStyle = isClickEvent ? 'cursor-pointer' : '';

  return <Icon color={color} size={size} className={cn(pointerStyle, props.className)} {...props} />;
};

export default LucideIcon;
