import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from '@/shared/shadcnComponent/ui/tooltip';

type Props = {
  children: React.ReactNode;
  text: string;
};

export default function ToolbarTooltip({children, text}: Props) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent side="bottom">{text}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
