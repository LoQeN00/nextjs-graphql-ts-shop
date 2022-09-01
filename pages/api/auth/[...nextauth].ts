import {
  FindAccountByEmailDocument,
  FindAccountByEmailQuery,
  FindAccountByEmailQueryVariables,
} from './../../../generated/graphql';
import NextAuth from 'next-auth/next';
import CredentialsProvider from 'next-auth/providers/credentials';
import { authorizedClient } from '../../../graphql/apolloClient';
import { compare } from 'bcryptjs';

export default NextAuth({
  secret: process.env.NEXT_AUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'jsmith@example.com' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req) {
        if (!credentials?.email || !credentials.password) return null;

        const user = await authorizedClient.query<FindAccountByEmailQuery, FindAccountByEmailQueryVariables>({
          query: FindAccountByEmailDocument,
          variables: {
            email: credentials?.email,
          },
        });

        if (!user.data?.account?.email) return null;

        const match = await compare(credentials.password, user.data.account?.password!);

        if (!match) return null;

        return {
          id: user.data.account?.id,
          email: user.data.account?.email,
        };
      },
    }),
  ],
  callbacks: {
    async session({ session, user, token }) {
      session.user.id = token.sub!;

      return session;
    },
  },
});
