import { currentUser } from '@clerk/nextjs';
import { eq } from 'drizzle-orm';
import { db } from '@/db';
import { user as userTable } from '@/db/schema';
import type { User } from '@/types/db';

export const getCurrentUser = async () => {
  const user = await currentUser();

  if (!user) return null;

  const [userDB] = await db
    .select()
    .from(userTable)
    .where(eq(userTable.id, user.id));

  return {
    id: userDB.id,
    accountId: userDB.accountId,
    email: userDB.email,
    firstName: userDB.firstName,
    lastName: userDB.lastName,
    imageUrl: userDB.imageUrl,
    credits: userDB.credits,
    createdAt: userDB.createdAt,
    updatedAt: userDB.updatedAt,
  } satisfies User;
};
