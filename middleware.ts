import { authMiddleware } from '@clerk/nextjs';
import { NextResponse } from 'next/server';

export default authMiddleware({
  publicRoutes: [
    '/',
    '/sign-in(.*)',
    '/sign-up(.*)',
    '/api/webhooks(.*)',
    '/api/uploadthing(.*)',
  ],
  afterAuth(auth, req, evt) {
    if (!auth.userId && !auth.isPublicRoute) {
      const signInUrl = new URL('/sign-in', req.url);
      signInUrl.searchParams.set('redirect_url', req.url);
      return NextResponse.redirect(signInUrl);
    }

    const authRoutes = ['sign-in', 'sign-up'];
    const isAuthRoute = authRoutes.some(route => req.url.includes(route));

    if (auth.userId && isAuthRoute) {
      const indexUrl = new URL('/', req.url);
      return NextResponse.redirect(indexUrl);
    }
  },
});

export const config = {
  matcher: '/((?!_next/image|_next/static|favicon.ico).*)',
};
