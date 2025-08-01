import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authConfig } from "@/lib/auth.config";
import prisma from "@/lib/prisma";

export async function POST(request: Request){
    try {
        const session = await getServerSession(authConfig)
    
        const user = await prisma.user.findUnique({
            where: {
                email: session?.user?.email!
            }
        })

        const {googleId, title, author, imageUrl} = await request.json()

        const book = await prisma.book.create({
            data: {
                userId: user?.id! || "1234",
                googleId,
                title,
                author,
                imageUrl
            }
        })

        return NextResponse.json({message: "Book added to the shelf", book})

        
    } catch (error) {
        return NextResponse.json({error: "Failed to add Book to the shelf"})
    }
}

export async function GET(request: Request){
    try {
        const session = await getServerSession(authConfig)

        const user = await prisma.user.findUnique({
            where: {
                email: session?.user?.email!
            }
        })

        const books = await prisma.book.findMany({
            where: {
                userId: user?.id || "1234"
            }
        })
        
        return NextResponse.json({books, message: "Books fetched from the shelf"})

    } catch (error) {
        return NextResponse.json({error: "Failed to get books from the shelf"})
    }
}