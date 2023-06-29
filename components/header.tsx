import { Icons } from '@/components/icons';

export const Header = () => {
  return (
    <header className="fixed inset-0 h-nav-height backdrop-blur-md">
      <div className="h-full container flex items-center justify-between">
        <div className="flex-1 flex items-center gap-3">
          <div className="border border-border rounded-md w-fit h-fit bg-image-gradient">
            <Icons.logo />
          </div>
          <span>GPT Writer</span>
        </div>
      </div>
    </header>
  );
};
