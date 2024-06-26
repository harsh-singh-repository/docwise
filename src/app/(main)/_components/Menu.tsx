"use client";

import React from "react";
import { Id } from "../../../../convex/_generated/dataModel";
import { DropdownMenu,DropdownMenuItem,DropdownMenuSeparator,DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/clerk-react";
import { useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Trash } from "lucide-react";
import { DropdownMenuContent } from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";


interface MenuProps {
    documentId:Id<"documents">;
}

export const Menu = ({documentId}:MenuProps) => {

    const router = useRouter();
    const {user} = useUser();
    const archive = useMutation(api.document.archives)
    
    const onArchive = () =>{
        const promise = archive({id:documentId});

        toast.promise(promise,{
            error:"Archive failed",
            success:"Archived",
            loading:"Archiving..."
        })

        router.push("/documents")
    }
     
     return (
        <>
          <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm">
            <MoreHorizontal className="h-4 w-4 dark:text-white"/>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-60" align="end" alignOffset={8} forceMount>
         <DropdownMenuItem onClick={onArchive} className="flex flex-row hover:focus-visible:none">
            <Trash className="h-4 w-4 mr-2"/>
            Delete
            </DropdownMenuItem>   
            <DropdownMenuSeparator />
            <div className="text-xs text-muted-foreground p-2">
                Last edited by : {user?.fullName}
            </div>
        </DropdownMenuContent>
    </DropdownMenu>
        </>
     )
};

Menu.Skeleton = function MenuSkeleton(){
    return(
        <>
          <Skeleton className="h-10 w-10"/>
        </>
    )
}