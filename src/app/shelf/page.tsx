
"use client"
import { Button } from "@/components/ui/Button";
import { Check, Clock, Heart, Library, Loader2, Search } from "lucide-react";
import { useEffect } from "react";
import { NextResponse } from "next/server";
import { useState } from "react";
import Image from "next/image";
import clsx from "clsx";
import toast from "react-hot-toast";
import { CategoryKey, statusOptions } from "@/types/shelf";

 
export default function Page() {
    
   const [books, setBooks] = useState<any[]>([])
   const [activeCategory, setActiveCategory] = useState<CategoryKey>("ALL");
   const [showModal, setShowModal] = useState(false);
   const [selectedBook, setSelectedBook] = useState<any | null>(null);
   const [isLoading, setIsLoading] = useState(false);

   const fetchBooks = async () => {
    try {
      setIsLoading(true)
        const response = await fetch("/api/shelf")
        const data = await response.json()
        setBooks(data.books)
    } catch (error) {
        return NextResponse.json({error: "Failed to fetch books"}, {status: 500})
    }
    finally{
      setIsLoading(false)
    }
   }

   const changeBookStatus = async (newStatus: CategoryKey, bookId:string) => {
      if (!selectedBook) return;
    
      try {
        const response = await fetch(`/api/shelf/status`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: newStatus, bookId }),
        });
    
        if (!response.ok) {
          throw new Error("Failed to update book status");
        }

        toast.success(`"${selectedBook.title}" status updated to ${newStatus}`);
    
        // Update local UI
        setBooks((prevBooks) =>
          prevBooks.map((book) =>
            book.id === selectedBook.id ? { ...book, status: newStatus } : book
          )
        );
    
        setShowModal(false);
      } catch (error) {
        console.error("Status update error:", error);
        toast.error("Failed to update book status.");
      }
    };
    


   useEffect(() => {
      fetchBooks()
   }, [])

   const booksCategories = [
      {
         title: "All Books",
         books: books,
         color: "bg-amber-300"
      },
      {
         title: "Currently Reading",
         books: books.filter((book) => book.status === "CURRENTLY_READING"),
         color: "bg-blue-300"
      },
      {
         title: "Want to Read",
         books: books.filter((book) => book.status === "WANT_TO_READ"),
         color: "bg-green-300"
      },
      {
         title: "Read",
         books: books.filter((book) => book.status === "READ"),
      },
   ]

   const categoryButtons = [
      { label: "All Books", key: "ALL", color: "bg-amber-300" },
      { label: "Currently Reading", key: "CURRENTLY_READING", color: "bg-blue-300" },
      { label: "Want to Read", key: "WANT_TO_READ", color: "bg-green-300" },
      { label: "Read", key: "READ", color: "bg-purple-300" },
   ] as const;

   const getStatusIcon = (status: string) => {
      switch (status) {
        case '"WANT_TO_READ"':
          return <Check className="h-4 w-4" />;
        case 'CURRENTLY_READING':
          return <Clock className="h-4 w-4" />;
        case 'READ':
          return <Heart className="h-4 w-4" />;
        default:
          return null;
      }
    };
  

    const filteredBooks =
    activeCategory === "ALL"
      ? books
      : books.filter((book) => book.status === activeCategory);
   
    return (
      <>
      {isLoading && (
            <div className="flex justify-center items-center mt-[30px]">
                <Loader2 className="animate-spin" />
            </div>
      )}
      <div className="container mx-auto">
         <div className="min-h-screen text-center mt-[70px]">
               <h1 className="text-center text-2xl font-bold">Personal Library</h1>
               <p className="text-center text-sm">Manage your bookshelf and track your reading progress</p>

            {books.length > 0 ? (
               <>
               {/* Category Buttons */}
          <div className="flex flex-wrap justify-center gap-4 mt-10">
            {categoryButtons.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setActiveCategory(cat.key)}
                className={clsx(
                  "px-4 py-2 rounded-md font-medium text-sm transition-all",
                  cat.color,
                  activeCategory === cat.key
                    ? "ring-2 ring-black scale-105"
                    : "opacity-80 hover:opacity-100"
                )}
              >
                {cat.label} ({cat.key === "ALL" ? books.length : books.filter((b) => b.status === cat.key).length})
              </button>
            ))}
          </div>
               <div className="my-[50px] px-[45px]">
                  <div className="grid grid-cols-4 gap-[35px]">
                     {booksCategories.map((category) => (
                        <div key={category.title} className="border border-gray-300 rounded-md px-[20px] py-[30px]">
                           <h2 className="text-lg font-extrabold">{category.title}</h2>
                           <p>{category.books.length}</p>
                        </div>
                     ))}
                  </div>
               <div className="grid grid-cols-3 mt-[40px] gap-[30px] ">
                  {filteredBooks?.map((book) => (
                     <div key={book.id} className="flex flex-col items-start py-[25px] px-[40px] border-[1px] border-amber-600">
                        <Image src={book.imageUrl} alt={book.title} width={100} height={100} />
                        <p>{book.title}</p>
                        <p>{book.author}</p>
                        {getStatusIcon(book.status)}
                        <button
                           onClick={() => {
                              setSelectedBook(book);
                              setShowModal(true);
                           }}
                           className="mt-3 text-xs bg-amber-400 rounded-[4px] cursor-pointer px-[10px] py-[10px] hover:underline"
                        >
                           Change Status
                        </button>
                     </div>
                  ))}
               </div>
               </div></>
               
            ) : (
               <div className="flex flex-col items-center justify-center mt-[40px] gap-[30px]">
                  <span className="text-4xl">
                     <Library/>
                  </span>

                  <div className="flex flex-col gap-[10px]">
                     <p>Your shelf is empty</p>
                     <p>Search for books to add to your shelf</p>
                     <Button className="hover:bg-amber-400 py-[15px] text-[12px] cursor-pointer">Search Books</Button>
                  </div>
               
               </div>
            )}
         </div>
      </div>
      {showModal && selectedBook && (
         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded shadow-md w-[90%] max-w-md">
               <h2 className="text-lg font-bold mb-4">Change Status for "{selectedBook.title}"</h2>
               <div className="flex flex-col gap-2">
               {statusOptions.map((status) => (
                  <button
                     key={status}
                     onClick={() => changeBookStatus(status, selectedBook.id)}
                     className="border px-4 py-2 rounded hover:bg-gray-100 text-left"
                  >
                     {status.replace("_", " ").toLowerCase()}
                  </button>
               ))}
               </div>
               <button
               onClick={() => setShowModal(false)}
               className="mt-6 text-sm text-gray-600 hover:underline"
               >
               Cancel
               </button>
            </div>
         </div>
      )}

      </>
      
    )
  }