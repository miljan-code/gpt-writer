'use client';

import { useClerk } from '@clerk/clerk-react';
import { Icons } from '@/components/icons';

export const SignOutButton = () => {
  const { signOut } = useClerk();

  return (
    <button
      onClick={() => signOut()}
      className="group flex items-center gap-3 sm:gap-2 px-2 py-1 rounded-md hover:bg-border transition-colors duration-100 text-accent cursor-default"
    >
      <Icons.logout className="group-hover:text-white sm:h-4 sm:w-4" />
      <p className="text-lg sm:text-sm">Logout</p>
    </button>
  );
};
