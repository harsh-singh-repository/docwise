"use client";

import { ReactNode } from "react";
import { useConvexAuth } from "convex/react";
import { Spinner } from "@/components/ui/Spinner";
import { redirect } from "next/navigation";
import { SearchCommand } from "@/components/modals/search-command";
import { Navigation } from "./_components/Navigation";

const mainLayout = ({children}:{children:ReactNode})=>{

    const {isAuthenticated,isLoading} = useConvexAuth();
    
    if(isLoading){
        return(
            <>
              <div className="h-full flex items-center justify-center">
                 <Spinner size={"lg"}/>
              </div>
            </>
        )
    }
    
    if(!isAuthenticated){
        return redirect("/")
    }
    
    return(
        <>
          <div className="h-[100vh] flex dark:bg-[#1F1F1F]">
                <Navigation/>
              <main className="flex-1 h-full overflow-y-auto">
                <SearchCommand/>
                 {children}
              </main>
          </div>
        </>
    )
}

export default mainLayout;