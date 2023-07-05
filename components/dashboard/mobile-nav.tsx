'use client';

import { useState } from 'react';
import { useLockBody } from '@/hooks/use-lock-body';
import { useWindowResize } from '@/hooks/use-window-resize';
import { cn } from '@/lib/utils';
import { Icons } from '@/components/icons';
import {
  Navigation,
  NavigationFooter,
} from '@/components/dashboard/navigation';

export const MobileNav = () => {
  const [menuIsOpen, setMenuIsOpen] = useState(false);

  useLockBody(menuIsOpen);
  useWindowResize(() => setMenuIsOpen(false));

  const handleMenu = () => setMenuIsOpen(prev => !prev);

  return (
    <>
      {menuIsOpen ? (
        <Icons.close onClick={handleMenu} className="cursor-pointer" />
      ) : (
        <Icons.menu onClick={handleMenu} className="cursor-pointer" />
      )}
      <aside
        className={cn(
          'absolute z-50 top-[73px] left-0 w-full sm:w-[13.75rem] h-[calc(100vh-73px)] px-6 py-4 bg-background/90 backdrop-blur-md border-r border-border/50 duration-300 flex flex-col gap-4 overflow-auto',
          {
            'translate-x-0 opacity-100': menuIsOpen,
            '-translate-x-full opacity-0': !menuIsOpen,
          }
        )}
      >
        <Navigation />
        <div className="mt-auto">
          <NavigationFooter />
        </div>
      </aside>
    </>
  );
};
