// src/lib/auth.ts
import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import prisma from "@/lib/prisma";
import { PrismaAdapter } from "@next-auth/prisma-adapter";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user, account }: { user: any; account: any }) {
        let existing = undefined;
        try{
            existing = await prisma.user.findUnique({
           where: { email: user.email! },
        });
      } catch (error) {
        console.error(error);
      }
      if (!existing) {
        existing = await prisma.user.create({
          data: {
            name: user.name,
            email: user.email,
          },
        });
      }
      return true;
    },
    async session({ session, token }: { session: any; token: any }) {
      session.user.id = token.sub;
      return session;
    },
  },
  adapter: PrismaAdapter(prisma),
};
