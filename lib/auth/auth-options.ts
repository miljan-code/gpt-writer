import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import { eq } from 'drizzle-orm';
import bcrypt from 'bcrypt';
import { DrizzleAdapter } from '@/lib/auth/drizzle-adapter';
import { db } from '@/db';
import { users } from '@/db/schema';
import type { NextAuthOptions } from 'next-auth';

export const authOptions: NextAuthOptions = {
  adapter: DrizzleAdapter(db),
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/sign-in',
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'email', type: 'text' },
        password: { label: 'password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email) {
          throw new Error('Please enter your email address');
        }
        if (!credentials?.password) {
          throw new Error('Please enter your password');
        }

        const [user] = await db
          .select()
          .from(users)
          .where(eq(users.email, credentials.email))
          .limit(1);

        if (!user || !user.password) {
          throw new Error('Invalid email address');
        }

        const isCorrectPassword = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!isCorrectPassword) {
          throw new Error('Invalid password');
        }

        return user;
      },
    }),
  ],
  callbacks: {
    async session({ token, session }) {
      if (token) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.image = token.picture;
      }

      return session;
    },
    async jwt({ token, user }) {
      const [dbUser] = await db
        .select()
        .from(users)
        .where(eq(users.email, token.email || ''))
        .limit(1);

      if (!dbUser) {
        if (user) {
          token.id = user?.id;
        }
        return token;
      }

      return {
        id: dbUser.id,
        name: dbUser.name,
        email: dbUser.email,
        picture: dbUser.image,
      };
    },
    async redirect({ baseUrl }) {
      return `${baseUrl}/dashboard`;
    },
  },
};
