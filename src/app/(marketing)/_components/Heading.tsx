"use client"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { Imprima } from "next/font/google"
import {useConvexAuth } from "convex/react"
import { Spinner } from "@/components/ui/Spinner"
import { SignInButton } from "@clerk/clerk-react"
import Link from "next/link"

export const Heading=()=>{
    const {isLoading,isAuthenticated} = useConvexAuth();
    return(
        <div className="max-w-3xl space-y-4">
            <h1 className="text-3xl sm:text-5xl md:text-5xl font-bold">Plan your Idea,Documents and Learning.Welcome to <span className="underline">DocWise.</span></h1>

            <h3 className="text-base sm:text-xl md:text-2xl font-medium">Docwise is the place where the works happens in a collaborative and faster manner.</h3>

            {
             isLoading &&  (
                <div className="w-full flex justify-center items-center">
                    <Spinner/>
                </div>
             )
            }
            {
              isAuthenticated && !isLoading && (
                     <Button>
                        <Link href = "/documents">Enter Docwise</Link>
                         <ArrowRight className="h-4 w-4 ml-2"/>    
                     </Button>
              )
            }
            {
              !isAuthenticated && !isLoading && (
                <SignInButton>
                <Button>Get Docwise Free
                <ArrowRight className="h-4 w-4 ml-2"/>
                 </Button>
                </SignInButton>
              )
            }

        </div>
    )
}