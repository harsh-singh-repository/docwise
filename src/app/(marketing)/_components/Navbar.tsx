"use client";

import { cn } from '@/lib/utils';
import {useScrollTop} from '../../../../hooks/use-scroll-top'
import { Logo } from './Logo';
import { ModeToggle } from '@/components/ui/moddle-toggle';
import { useConvexAuth } from 'convex/react';
import { SignInButton, UserButton } from '@clerk/clerk-react';
import { Button } from '@/components/ui/button';
import { Spinner } from "@/components/ui/Spinner"
import Link from 'next/link';

export const Navbar = () =>{
     const {isAuthenticated,isLoading} = useConvexAuth();
    const scrolled = useScrollTop();
    return (
        <>
          <div className={cn("z-50 bg-background dark:bg-[#1F1F1F] fixed top-0 flex items-center w-full p-6", scrolled && "border-b shadow-sm")}>
             <Logo/>
             <div className="flex justify-end items-center w-full gap-x-5">
                {isLoading && (
                  <Spinner/>
                )}
                {
                  !isAuthenticated && !isLoading &&(
                   <>
                     <SignInButton mode='modal'>
                        <Button variant={"ghost"} size={"sm"}>
                            Login
                        </Button>
                     </SignInButton>
                     <SignInButton mode='modal'>
                        <Button size={"sm"}>
                            Get Docwise
                        </Button>
                     </SignInButton>
                   </>
                  )
                }
                {isAuthenticated && !isLoading && (
                  <>
                    <Button variant={"ghost"} size={"sm"} asChild>
                       <Link href={"/documents"}>
                         Get Started
                       </Link>
                    </Button>
                    <UserButton/>
                  </>
                )}
                  <ModeToggle/>
             </div>
          </div>
        </>
    )
}