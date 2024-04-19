"use client";

import { useMutation } from "convex/react";
import { Id } from "../../../../convex/_generated/dataModel";
import { api } from "../../../../convex/_generated/api";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { ConfirmModal } from "@/components/modals/confirm-dialog";

interface BannerProps{
    documentId:Id<"documents">
}


export const Banner = ({documentId}:BannerProps) =>{

    const router = useRouter();
    const remove = useMutation(api.document.remove);
    const restore = useMutation(api.document.restore);

    const onRemove = () => {
        const promise = remove({id : documentId});
        toast.promise(promise,{
            success:"Banner Romoved",
            loading:"Banner Removing",
            error:"Failed to Remove"
        })
        router.push("/documents");
    }

    const onRestore = () =>{
        const promise = restore({id : documentId});

        toast.promise(promise,{
            success:"Banner Restored",
            loading:"Banner Restoring",
            error:"Failed to Restore"
        })
    }

    return (
        <>
          <div className="w-full bg-rose-500 text-center text-sm p-2 text-white flex items-center gap-x-2 justify-center">
            <p>
                This page is a Tarsh.
            </p>
             <Button size={'sm'} onClick={onRestore} variant="outline" className="border-white bg-transparent hover:bg-primary/5 text-white hover:text-white p-1 px-2 h-auto font-normal">
                  Restore Page
             </Button>
             <ConfirmModal onConfirm={onRemove}>
             <Button size={'sm'} variant="outline" className="border-white bg-transparent hover:bg-primary/5 text-white hover:text-white p-1 px-2 h-auto font-normal">
                  Delete Forever
             </Button>
             </ConfirmModal>
          </div>
        </>
    )
}