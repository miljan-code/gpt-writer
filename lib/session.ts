import { currentUser } from '@clerk/nextjs';
import type { User } from '@/types/session';

export const getCurrentUser = async () => {
  const user = await currentUser();

  if (!user) return null;

  return {
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.emailAddresses[0].emailAddress,
    imageUrl: user.imageUrl,
    createdAt: user.createdAt,
    credits: user.publicMetadata.credits as number,
    passwordEnabled: user.passwordEnabled,
  } satisfies User;
};
