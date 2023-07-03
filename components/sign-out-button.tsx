'use client';

import { signOut } from 'next-auth/react';
import { Icons } from '@/components/icons';

export const SignOutButton = () => {
  return (
    <button
      onClick={() => signOut()}
      className="group flex items-center gap-2 px-2 py-1 rounded-md hover:bg-border transition-colors duration-100 text-accent cursor-default"
    >
      <Icons.logout size={16} className="group-hover:text-white" />
      <p className="text-sm">Logout</p>
    </button>
  );
};
