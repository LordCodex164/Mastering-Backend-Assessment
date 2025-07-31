import { BookOpen, Search, Library } from "lucide-react";
import Link from "next/link"
import { Button } from "@/components/ui/Button";

export default function Header() {
    return (
        <header className="">
          <div className="container mx-auto px-[20px] lg:px-[40px]">
            <div className="flex items-center justify-between pt-[20px]">
                <div className="flex items-center gap-[10px]">

                  <Link href={"/"} className="flex items-center gap-[5px]">
                    <BookOpen className="h-8 w-8 text-primary"/>
                    <span>Book Shelf</span>
                  </Link>
                </div>

                <div className="flex items-center gap-[5px] justify-center px-[5px]">

                  <Link href={"/search"} className="bg-amber-300 hover:bg-amber-400 text-[12px] px-[5px] flex items-center rounded-sm">
                    <Search className="text-sm"/>
                    <Button className="hover:bg-amber-400 py-[15px] text-[12px] cursor-pointer">Search Books</Button>
                  </Link>

                  <Link href={"/shelf"} className="bg-amber-400 hover:bg-amber-400 flex items-center px-[5px] rounded-sm">
                   <Library/>
                   <Button className="py-[15px] text-[12px] cursor-pointer">My Shelf </Button>
                  </Link>
                  
                </div>

            </div>
          </div>   
        </header>
    )
}