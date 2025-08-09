import {useLogout} from '@/entities/auth';
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from '@/shared/shadcnComponent/ui/tooltip';
import {LucideIcon} from '@/shared/ui/icons';

export default function LogoutButton() {
  const {logout} = useLogout();

  const handleLogout = () => {
    logout();
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            type="button"
            onClick={handleLogout}
            aria-label="로그아웃"
            className="text-boldBlue hover:text-extraboldBlue hover:scale-105 transition-all"
          >
            <LucideIcon name="LogOut" size={24} />
          </button>
        </TooltipTrigger>
        <TooltipContent side="top">로그아웃</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
