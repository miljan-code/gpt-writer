import { authOptions } from '@/lib/auth/auth-options';
import { getServerSession } from 'next-auth';

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    return new Response(JSON.stringify(session), { status: 200 });
  } catch (error) {
    return new Response('Something went wrong!', { status: 500 });
  }
}
