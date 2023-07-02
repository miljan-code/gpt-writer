'use client';

import { Button } from '@/components/ui/button';
import { signOut } from 'next-auth/react';

export default function DashboardPage() {
  return (
    <>
      <div className="">
        <Button onClick={() => signOut()}>Sign out</Button>
      </div>
    </>
  );
}
