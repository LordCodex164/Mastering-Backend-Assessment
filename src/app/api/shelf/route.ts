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
                userId: user?.id!,
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
                userId: user?.id
            }
        })
        
        return NextResponse.json({books, message: "Books fetched from the shelf"})

    } catch (error) {
        return NextResponse.json({error: "Failed to get books from the shelf"})
    }
}

export async function DELETE(request: Request){
    try{
        const {bookId} = await request.json()
        const session = await getServerSession(authConfig)

        const user = await prisma.user.findUnique({
            where: {
                email: session?.user?.email!
            }
        })
        
        const book = await prisma.book.delete({
            where: {
                id: bookId
            }
        })

        return NextResponse.json({book, message: "Book deleted from the shelf"})

        
    }catch(err){

    }
}