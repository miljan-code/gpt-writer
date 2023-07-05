'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useLockBody } from '@/hooks/use-lock-body';
import { useWindowResize } from '@/hooks/use-window-resize';
import { cn } from '@/lib/utils';
import { siteConfig } from '@/config/site';
import { Icons } from '@/components/icons';
import { Button, buttonVariants } from '@/components/ui/button';
import type { Session } from 'next-auth';

interface HeaderProps {
  session: Session | null;
}

export const Header = ({ session }: HeaderProps) => {
  const [menuIsOpen, setMenuIsOpen] = useState(false);

  useLockBody(menuIsOpen);
  useWindowResize(() => setMenuIsOpen(false));

  const handleMenu = () => setMenuIsOpen(prev => !prev);

  return (
    <header className="fixed inset-0 h-nav-height backdrop-blur-md z-50">
      <div className="relative h-full container flex items-center justify-between after:absolute after:left-0 after:bottom-0 after:h-[1px] after:w-full max-md:after:bg-border/50 md:after:bg-border-gradient">
        <div className="flex-1">
          <Link href="/" className="inline-flex items-center gap-3">
            <div className="h-[40px] w-[40px] bg-logo-gradient rounded-md flex items-center justify-center">
              <div className="border border-border rounded-md w-fit h-fit bg-background/80">
                <Icons.logo />
              </div>
            </div>
            <span className="font-semibold inline-block">GPT Writer</span>
          </Link>
        </div>
        <div
          className={cn(
            'md:flex-1 flex items-center justify-center md:visible',
            menuIsOpen ? 'visible' : 'invisible delay-0'
          )}
        >
          <nav
            className={cn(
              'fixed top-nav-height flex flex-col w-full h-[calc(100vh-var(--nav-height))] overflow-auto bg-background delay-100 transition-[opacity,transform] md:delay-0 md:transition-none md:overflow-hidden md:border md:border-border/50 md:rounded-full md:py-2 md:px-4 md:items-center md:bg-border/5 md:relative md:flex-row md:top-auto md:h-auto md:translate-x-0 md:opacity-100',
              {
                'translate-x-0 opacity-100 duration-500': menuIsOpen,
                'translate-x-[100vw] opacity-0': !menuIsOpen,
              }
            )}
          >
            {siteConfig.mainNav.map(navItem => (
              <Link
                key={navItem.label}
                href={navItem.href}
                className="md:mx-2.5 text-2xl font-medium md:font-normal md:text-sm hover:text-muted transition-colors duration-300 px-10 md:px-0 py-5 md:py-0 border-b border-border/50 md:border-none"
              >
                {navItem.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex-1 flex items-center justify-end gap-4">
          {session ? (
            <Link
              href="/dashboard"
              className={cn(buttonVariants(), 'hidden sm:inline-block')}
            >
              Dashboard
            </Link>
          ) : (
            <>
              <Link
                href="/sign-in"
                className={buttonVariants({ variant: 'ghost' })}
              >
                Sign in
              </Link>
              <Link
                href="/sign-up"
                className={cn(buttonVariants(), 'hidden sm:inline-block')}
              >
                Sign up
              </Link>
            </>
          )}
          <Button
            onClick={handleMenu}
            variant="ghost"
            className="md:hidden p-0 hover:text-foreground"
          >
            {!menuIsOpen ? <Icons.menu /> : <Icons.close />}
          </Button>
        </div>
      </div>
    </header>
  );
};
