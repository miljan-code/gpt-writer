import * as z from 'zod';
import { clerkClient, currentUser } from '@clerk/nextjs';
import { updateProfileSchema } from '@/lib/validations/profile';

type FormData = z.infer<typeof updateProfileSchema>;

export async function POST(req: Request) {
  try {
    const user = await currentUser();

    if (!user) {
      return new Response('Not authorized', { status: 403 });
    }

    const data = updateProfileSchema.parse(await req.json());

    const filteredData: FormData = {};
    const skipKeys = ['oldPassword', 'newPassword', 'email'];

    Object.entries(data).forEach(([key, value]) => {
      if (value && !skipKeys.includes(key)) {
        filteredData[key as keyof FormData] = value;
      }
    });

    if (user.passwordEnabled && data.newPassword) {
      if (!data.oldPassword) {
        return new Response('Old password is missing', { status: 403 });
      } else {
        const { verified } = await clerkClient.users.verifyPassword({
          userId: user.id,
          password: data.oldPassword,
        });

        if (!verified) return new Response('Not authorized', { status: 403 });

        await clerkClient.users.updateUser(user.id, {
          password: data.newPassword,
          ...filteredData,
        });
      }
    } else if (data.email) {
      await clerkClient.users.updateUser(user.id, {
        primaryEmailAddressID: data.email,
        ...filteredData,
      });
    } else {
      await clerkClient.users.updateUser(user.id, {
        ...filteredData,
        profileImageID: data.imageUrl,
      });
    }

    return new Response(null, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 });
    }

    return new Response('Something went wrong', { status: 500 });
  }
}
