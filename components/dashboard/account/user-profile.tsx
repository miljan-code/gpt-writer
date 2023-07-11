import Link from 'next/link';
import { generateFallback } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import type { User } from '@/types/session';

interface UserProfileProps {
  currentUser: User;
}

export const UserProfile = ({ currentUser }: UserProfileProps) => {
  return (
    <div className="flex items-center gap-2">
      <Link href="/dashboard/settings">
        <Avatar className="cursor-pointer">
          <AvatarImage
            src={currentUser.imageUrl || ''}
            alt={
              `${currentUser.firstName} ${currentUser.lastName}` ||
              'Unknown user'
            }
          />
          <AvatarFallback>
            {generateFallback(
              `${currentUser.firstName} ${currentUser.lastName}` || ''
            )}
          </AvatarFallback>
        </Avatar>
      </Link>
      <div className="flex flex-col">
        <Link href="/dashboard/settings" className="text-sm">
          {`${currentUser.firstName} ${currentUser.lastName}`}
        </Link>
        <Link
          href="/dashboard/credits"
          className="text-xs text-muted hover:underline hover:underline-offset-2"
        >
          {currentUser.credits} credits
        </Link>
      </div>
    </div>
  );
};
