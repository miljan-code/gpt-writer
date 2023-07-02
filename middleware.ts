import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

export async function middleware(req: NextRequest) {
  const authPaths = ['/sign-in', '/sign-up'];
  const restrictedPaths = ['/dashboard'];
  const requestedPath = req.nextUrl.pathname;
  const token = await getToken({ req });

  if (token && authPaths.includes(requestedPath)) {
    const url = new URL('/', req.url);
    return NextResponse.redirect(url);
  }

  if (!token && restrictedPaths.includes(requestedPath)) {
    const url = new URL('/sign-in', req.url);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}
