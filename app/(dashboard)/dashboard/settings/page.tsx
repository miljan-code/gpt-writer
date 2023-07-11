import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/lib/session';
import { UpdateProfileForm } from '@/components/dashboard/update-profile-form';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Settings',
};

export default async function SettingsPage() {
  const currentUser = await getCurrentUser();

  if (!currentUser) redirect('/');

  // FIXME: TEMP!
  if (currentUser) redirect('/dashboard');

  return (
    <>
      <div className="mb-8 pb-4 border-b border-border/50">
        <h2 className="font-heading text-3xl">Settings</h2>
        <p className="text-muted">Manage your account settings.</p>
      </div>
      <div className="flex md:flex-row flex-col">
        <div className="flex-1">
          <UpdateProfileForm currentUser={currentUser} />
        </div>
        <div className="flex-1"></div>
      </div>
    </>
  );
}
