//server only
"use client"
import { BookOpen, Search, Library, Star } from "lucide-react";
import Link from "next/link"
import { Button } from "@/components/ui/Button";
import CardGrid from "@/components/ui/card";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import { redirect } from "next/navigation";
import { Providers } from "./(root)/sign-in/provider";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

export default function Home() {

  const { data: session } = useSession();

  useEffect(() => {
    if(!session){
      redirect("/sign-in")
    }
  }, [session])

  const cards = [
    {
      icon: "∞",
      title: "Books to Discover",
      description: "Books to Discover",
    },
    {
      icon: "3",
      title: "Reading Status",
      description: "Reading Status",
    },
    {
      icon: "1",
      title: "Personal Shelf",
      description: "Personal Shelf", 
    },
  ]; 
  
  return (
    <Providers>
      <div className="min-h-screen bg-background">

        <section>
          <div className="container mx-auto mt-[70px]">
            <div>
             <div className="text text-center">
             <h2 className="text-bold font-extrabold">Everything you need to manage your books</h2>
             <p> From discovering new reads to tracking your progress, ShelfWise makes book <br/> management simple and enjoyable </p>
            </div>

            </div>
          </div>
        </section>


        <section className="bg-card rounded-3xl p-8 lg:p-12 mt-[70px]">
        <div className="text-center">
          <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-8">
            Start Building Your Digital Library Today
          </h2>
          
          <CardGrid cards={cards} />

          <div className="mx-auto container flex justify-center">
            <Link href={"/search"} className="bg-amber-400 text-center hover:bg-amber-400 flex items-center px-[5px] rounded-sm">
              <Star/>
              <Button className="py-[15px] text-[12px] cursor-pointer">Get Started</Button>
            </Link>
          </div>
          
        </div>
      </section>


    </div>
    </Providers>
    
  );
}
