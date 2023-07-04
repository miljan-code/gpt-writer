'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Icons } from '@/components/icons';

export const MobileNav = () => {
  const [menuIsOpen, setMenuIsOpen] = useState(false);

  const handleMenu = () => setMenuIsOpen(prev => !prev);

  return (
    <>
      <div>
        {menuIsOpen ? (
          <Icons.close onClick={handleMenu} className="cursor-pointer" />
        ) : (
          <Icons.menu onClick={handleMenu} className="cursor-pointer" />
        )}
      </div>
      <nav
        className={cn(
          'absolute z-50 top-[80px] left-0 w-[13.75rem] h-[calc(100vh-80px)] px-6 py-4 bg-background/95 backdrop-blur-md border-r border-border/50',
          {
            'translate-x-0 opacity-100 duration-300': menuIsOpen,
            '-translate-x-[100vw] opacity-0': !menuIsOpen,
          }
        )}
      >
        Hello
      </nav>
    </>
  );
};
