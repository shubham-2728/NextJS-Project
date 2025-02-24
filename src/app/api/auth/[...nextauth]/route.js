import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const authOptions = {
  debug: true,
  adapter: PrismaAdapter(prisma),
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      // Check if a user with this email already exists in the database
      const existingUser = await prisma.user.findUnique({
        where: { email: user.email }
      });
  
      if (existingUser) {
        // Ensure account is linked to the existing user
        await prisma.account.upsert({
          where: {
            provider_providerAccountId: {
              provider: account.provider,
              providerAccountId: account.providerAccountId
            }
          },
          update: {},
          create: {
            userId: existingUser.id,
            provider: account.provider,
            providerAccountId: account.providerAccountId
          }
        });
  
        return true;
      }
  
      // If user does not exist, create it
      return true;
    }
  },
  
  secret: process.env.NEXTAUTH_SECRET, // Ensure this is correct
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
