import NextAuth, {NextAuthOptions} from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import {prisma} from '@/lib/prisma';
import bcrypt from 'bcrypt';
import {z} from 'zod';

const credentialsSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6)
});

const authOptions: NextAuthOptions = {
  session: {strategy: 'jwt'},
  providers: [
    Credentials({
      name: 'Credentials',
      credentials: {
        email: {label: 'Email', type: 'email'},
        password: {label: 'Password', type: 'password'}
      },
      async authorize(raw) {
        const parsed = credentialsSchema.safeParse(raw);
        if (!parsed.success) return null;
        const {email, password} = parsed.data;

        const user = await prisma.user.findUnique({where: {email}});
        if (!user || !user.passwordHash) return null;
        const ok = await bcrypt.compare(password, user.passwordHash);
        if (!ok) return null;
        return {id: user.id, email: user.email, name: user.name, role: user.role};
      }
    })
  ],
  pages: {
    signIn: '/id/login'
  },
  callbacks: {
    async jwt({token, user}) {
      if (user) {
        token.role = (user as any).role;
      }
      return token;
    },
    async session({session, token}) {
      (session as any).role = token.role;
      return session;
    }
  }
};

const handler = NextAuth(authOptions);
export {handler as GET, handler as POST};


