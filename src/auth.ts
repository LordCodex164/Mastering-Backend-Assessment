import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import db from "@/lib/db";
import NextAuth, { NextAuthOptions } from "next-auth";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(db),
    providers: [
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID!,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      }),
    ],
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60, // 30 days
        updateAge: 24 * 60 * 60, // 24 hours
    },
    callbacks:{
        async signIn({user}){
            console.log(user, "user")
            let user_ = await prisma.user.findUnique({
                where: {
                    email: user?.email!,
                }
            })
            if(!user_){
             user_ = await prisma.user.create({
                data: {
                    email: user?.email!,
                }
            })
            }
            return true;
        }
    }
  };
