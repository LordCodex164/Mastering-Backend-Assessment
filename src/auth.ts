import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import { PrismaAdapter } from "@auth/prisma-adapter";
import db from "@/lib/db";
import { NextAuthOptions } from "next-auth";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const authOptions: NextAuthOptions = {
    providers: [
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID!,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      }),
      GithubProvider({
        clientId: process.env.GITHUB_CLIENT_ID!,
        clientSecret: process.env.GITHUB_CLIENT_SECRET!,
      }),
    ],
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: "jwt",
    },
    callbacks:{
            async signIn({ user, account, profile }: any) {
              // Only handle OAuth providers
              if (account.type === 'oauth') {
                const existingUser = await prisma.user.findUnique({
                  where: { email: profile.email },
                  include: { accounts: true },
                });
        
                // If user exists but the provider isn't linked, link the account
                if (existingUser && !existingUser.accounts.some(acc => acc.provider === account.provider && acc.providerAccountId === account.providerAccountId)) {
                  await prisma.account.create({
                    data: {
                      userId: existingUser.id,
                      type: account.type,
                      provider: account.provider,
                      providerAccountId: account.providerAccountId,
                      access_token: account.access_token,
                      refresh_token: account.refresh_token,
                      expires_at: account.expires_at,
                      token_type: account.token_type,
                      scope: account.scope,
                      id_token: account.id_token,
                      session_state: account.session_state,
                      //oauth_token_secret: account.oauth_token_secret!,
                      //oauth_token: account.oauth_token,
                    },
                  });
                  return true; // Allow sign-in
                }
              }
              return true; // Proceed with default behavior
            },
        async session({session, token}){
            try{
                if(token){
                    console.log(token, "token")
                    console.log(session, "session")
                    //session.user!.id = token.sub!;
                } else {
                    //session.user!.id = token.sub!; 
                }
                //return session;
            }catch(error){
                console.log(error, "error")
            }
            return session;
        }
    },
    adapter: PrismaAdapter(db),
  };
