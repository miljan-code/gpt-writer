'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useLockBody } from '@/hooks/use-lock-body';
import { useWindowResize } from '@/hooks/use-window-resize';
import { cn } from '@/lib/utils';
import { dashboardConfig } from '@/config/dashboard';
import { Icons } from '@/components/icons';
import { SignOutButton } from '@/components/auth/sign-out-button';

export const NavigationFooter = () => {
  return (
    <>
      {/* <Link href="#" className="flex items-center gap-2 w-fit">
        <Icons.book size={14} className="text-muted" />
        <span className="text-xs text-muted">Help & Support</span>
      </Link> */}
      <span className="text-xs text-muted">GPT Writer &copy; 0.1.0</span>
    </>
  );
};

interface NavigationProps {
  onNavLinkClick?: () => void;
}

export const Navigation = ({ onNavLinkClick }: NavigationProps) => {
  const handleNavLinkClick = () => {
    if (!onNavLinkClick) return null;
    onNavLinkClick();
  };

  return dashboardConfig.nav.map(column => (
    <nav key={column.title} className="flex flex-col gap-1">
      <h3 className="text-base sm:text-xs mb-1 text-muted">{column.title}</h3>
      {column.links.map(link => {
        const Icon = Icons[link.icon];

        return (
          <Link
            href={link.href}
            key={link.label}
            className="group flex items-center gap-3 sm:gap-2 px-2 py-1 rounded-md hover:bg-border transition-colors duration-100 text-accent cursor-default"
            onClick={handleNavLinkClick}
          >
            <Icon className="group-hover:text-white sm:h-4 sm:w-4" />
            <p className="text-lg sm:text-sm">{link.label}</p>
          </Link>
        );
      })}
      {column.title === 'Account' && <SignOutButton />}
    </nav>
  ));
};

export const MobileNavigation = () => {
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
        <Navigation onNavLinkClick={() => setMenuIsOpen(false)} />
        <div className="mt-auto">
          <NavigationFooter />
        </div>
      </aside>
    </>
  );
};
