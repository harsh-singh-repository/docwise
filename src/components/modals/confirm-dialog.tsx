"use client";

import { AlertDialog,AlertDialogAction,AlertDialogCancel,AlertDialogContent,AlertDialogHeader,AlertDialogDescription,AlertDialogFooter,AlertDialogTitle } from "@/components/ui/alert-dialog";
import { AlertDialogTrigger } from "@radix-ui/react-alert-dialog";
import React from "react";

interface confirmModalProps{
   children:React.ReactNode;
   onConfirm:()=>void,
}

export const ConfirmModal = ({children,onConfirm}:confirmModalProps) => {

    const handleConfirm = (event:React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.stopPropagation();

        onConfirm();
    }
       return(
           <>
              <AlertDialog>
                <AlertDialogTrigger onClick={(e)=> e.stopPropagation()} asChild>
                    {children}
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                         <AlertDialogAction onClick={handleConfirm}>Confirm</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
           </>
       )
}