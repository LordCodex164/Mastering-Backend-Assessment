"use client";

import { signIn } from "next-auth/react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function SignInPage() {
  const router = useRouter();
  const handleGoogleSignIn = async () => {
    try {
      const result = await signIn("google", { redirect: false });
      console.log(result)
      if(result?.error){
        toast.error(result.error)
      }
      if(result?.ok){
        toast.success("Signed in successfully")
        router.push("/")
      }
    } catch (error) {
       toast.error("Something went wrong")
    }
    
  };

  const { data: session } = useSession();

  console.log("session", session)
  if(session){
    router.push("/")
  }

  

  return (
    
    <div className="flex min-h-screen items-center justify-center">
      <div className="p-[10em] bg-white shadow-md rounded">
        <h1 className="text-2xl font-bold mb-4">Sign In</h1>
        <button
          onClick={handleGoogleSignIn}
          className="px-4 py-2 bg-amber-300 text-black rounded hover:bg-amber-400 cursor-pointer"
        >
          Sign in with Google
        </button>
      </div>
    </div>
  );
}