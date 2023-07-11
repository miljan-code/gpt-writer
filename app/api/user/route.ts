import * as z from 'zod';
import { currentUser } from '@clerk/nextjs';
import { eq } from 'drizzle-orm';
import { updateProfileSchema } from '@/lib/validations/profile';
import { db } from '@/db';
import { user as userTable } from '@/db/schema';

export async function POST(req: Request) {
  try {
    const user = await currentUser();

    if (!user) {
      return new Response('Not authorized', { status: 403 });
    }

    const data = updateProfileSchema.parse(await req.json());

    await db.update(userTable).set(data).where(eq(userTable.id, user.id));

    return new Response(null, { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 });
    }

    return new Response('Something went wrong', { status: 500 });
  }
}
