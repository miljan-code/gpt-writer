import * as z from 'zod';
import bcrypt from 'bcrypt';
import { createId } from '@paralleldrive/cuid2';
import { DrizzleError } from 'drizzle-orm';
import { signUpSchema } from '@/lib/validations/auth';
import { db } from '@/db';
import { users } from '@/db/schema';

export async function POST(req: Request) {
  try {
    const userData = signUpSchema.parse(await req.json());

    const hashedPassword = await bcrypt.hash(userData.password, 12);

    await db.insert(users).values({
      id: createId(),
      name: userData.fullName,
      email: userData.email,
      password: hashedPassword,
    });

    return new Response(null, { status: 201 });
  } catch (error) {
    if (error instanceof DrizzleError) {
      return new Response('Email address is already in use', { status: 409 });
    }

    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 });
    }

    return new Response('Something went wrong', { status: 500 });
  }
}
