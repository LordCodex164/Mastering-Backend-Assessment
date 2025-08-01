"use client"
import { ChangeEvent, ChangeEventHandler, useEffect, useState } from "react";
//add a loading spinner that appears when the search is loading and aligns with my color design
import { Check, Loader2 } from "lucide-react";
import Image from "next/image"
import { IBook } from "@/types/book"
import { NextResponse } from "next/server";
import toast from "react-hot-toast";
import { redirect } from "next/navigation";
import { useSession } from "next-auth/react";


export default function Search() {

    const { data: session } = useSession();

    useEffect(() => {
        if(!session){
        redirect("/sign-in")
        }
    }, [session])

    const [searchQuery, setSearchQuery] = useState<string>("")
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const[books, setBooks] = useState<IBook[]>([])
    const [addedBooks, setAddedBooks] = useState<Set<string>>(new Set());


    const fetchUrl = async (title: string) => {
        try {
            setIsLoading(true)
            const response = await fetch(`/api/search?q=${searchQuery}`,{
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            })
            const data = await response.json()
            setBooks(data)
            return data

        } catch (error) {
            setIsLoading(false)
            return NextResponse.json({error: "Failed to search books"}, {status: 500})
        }
        finally{
            setIsLoading(false)
        }
    }

    const addToShelf = async (googleId: string, title: string, author: string, imageUrl: string) => {
        try {
            const response = await fetch("/api/shelf", {
                method: "POST",
                body: JSON.stringify({googleId, title, author, imageUrl}),
                headers: {
                    "Content-Type": "application/json",
                },
            })
            const data = await response.json()
            if(data){
            toast.success(`"${title}" added to shelf!`);
            setAddedBooks((prev) => new Set(prev).add(googleId));
            }
        } catch (error) {
            return NextResponse.json({error: "Failed to add to shelf"}, {status: 500})
        }
    }

    const fetchDb = async () => {
        try {
            const response = await fetch("/api/db", {
                method: "GET",
            })
            const data = await response.json()
        } catch (error) {
            return NextResponse.json({error: "Failed to fetch books"}, {status: 500})
        }
    }

    useEffect(() => {
        fetchUrl(searchQuery)
        fetchDb()
    }, [searchQuery])

    const handleSearchTerm = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value)
    }
    
    return (
        <>
        <div className="container mx-auto px-[20px] lg:px-[40px]"   >
            <div className="pt-[10em] pb-[40px]">
                <div className="flex flex-col gap-[20px] text-center">
                    <p className="text-[14px] font-extrabold">Discover Your Next Great Read</p>
                    <p>Search millions of books and add them to your personal shelf</p>
                </div>
            </div>

            <div className="mx-auto justify-center">

             <div className="lg:px-[10em] xl:px-[25em]">
                <div className="bg-[#c8cbd0] rounded-[12px] py-[2px] lg:mx-[0em]">
                <div className="flex flex-col md:flex-row gap-[10px] justify-between pl-[10px] py-[5px] pr-[20px]">
                   <input onChange={handleSearchTerm} type="text" placeholder="Search for a book" className="pl-[20px] w-full outline-none rounded-md" />
                   <button className="bg-amber-300 px-[20px] py-[12px] rounded-[6px] text-black hover:text-[#23292a] cursor-pointer my-[10px]" onClick={() => fetchUrl(searchQuery)}>Search</button> 
                </div>
            </div> 
             </div>
              


            {isLoading && (
            <div className="flex justify-center items-center mt-[30px]">
                <Loader2 className="animate-spin" />
            </div>
             )}
             
             <div className="pt-[40px]">
              {books.length > 0 && 
              <p>Search Results {books?.length} </p>
              }

             <div className="mx-auto grid grid-cols-2 space-x-[10px] md:grid-cols-3 text-center mt-[40px] gap-[10px]">
                
                {books.length > 0 ? books.map((b) => {
                    const isAdded = addedBooks.has(b.id);
                    return (
                        <div className="px-[10px] py-[20px] border border-gray-300 rounded-md">
                            <div className="flex flex-col gap-[25px]">
                             <div className="flex flex-row items-center gap-[15px]">
                                <div>
                                    <span>
                                        <Image src={b.imageUrl} width={200} height={100} alt=""/>
                                    </span>
                                </div>
                                <div className="flex flex-col">
                                    <h1 className="text-[10px]">{b.title}</h1>
                                </div>
                            </div>
                            <div className="flex flex-row justify-center">
                   
                            {isAdded ? (
                                <button
                                disabled
                                className="bg-green-500 text-white px-4 py-2 rounded flex items-center gap-2 cursor-pointer"
                                >
                                <Check className="w-4 h-4" /> Added
                                </button>
                            ) : (
                                <button
                                onClick={() => addToShelf(b.id, b.title, b.author, b.imageUrl)}
                                className="bg-amber-300 px-4 py-2 rounded text-black hover:text-[#23292a]"
                                >
                                Add to Shelf
                                </button>
                            )}

                            </div>
                            </div>
                            
                        </div>
                    )
                }) : 
                   <div>
                    No Products Found
                   </div>
               }
             </div>  
             </div>
             

            </div>
            
        </div>
        </>
    )
}