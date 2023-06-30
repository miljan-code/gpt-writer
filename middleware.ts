import { NextRequest, NextResponse } from 'next/server';
import type { Session } from 'next-auth';

export async function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();

  const result = await fetch(`${url.origin}/api/auth/session`);
  const session = (await result.json()) as Session | null;

  console.log(session);

  const authPaths = ['/sign-in', '/sign-up'];
  const restrictedPaths = ['/dashboard'];
  const requestedPath = req.nextUrl.pathname;

  if (session && authPaths.includes(requestedPath)) {
    const url = new URL('/', req.url);
    return NextResponse.redirect(url);
  }

  if (!session && restrictedPaths.includes(requestedPath)) {
    const url = new URL('/sign-in', req.url);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}
