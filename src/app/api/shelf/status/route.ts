//change the status of the shelf
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import { NextResponse } from "next/server";

export async function PUT(request: Request){
    try {
        const session = await getServerSession(authOptions)
        const user = await prisma.user.findUnique({ 
            where: {
                email: session?.user?.email!
            }
        }) || {id: "1234"}

        if(user){
        const {status, bookId} = await request.json()

        const book = await prisma.book.update({
            where: {
                id: bookId
            },
            data: {
                status
            }
        })

        return NextResponse.json({message: "Book status updated", book})
        }

        return NextResponse.json({error: "User not found"})

        
    } catch (error) {
        return NextResponse.json({error: "Failed to add Book to the shelf"})
    }
}