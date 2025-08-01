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
        async signIn({user}){
            try{
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
            }catch(error){
                console.log(error, "error")
                return false;
            }
        },
        async session({session, token}){
            try{
                if(token){
                    console.log(token, "token")
                }
            }catch(error){
                console.log(error, "error")
            }
            return session;
        }
    },
    adapter: PrismaAdapter(db),
  };
