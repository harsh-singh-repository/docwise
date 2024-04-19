"use client";

import { CoverImageModal } from "@/components/modals/cover-image-model";
import { SettingsModel } from "@/components/modals/setting-dialog";
import { ReactNode, useEffect,useState } from "react";


export const ModalProvider = () => {
    const [isMounted,setIsMounted] = useState(false);

    useEffect(()=>{
        setIsMounted(true);
    },[])

    if(!isMounted){
        return null;
    }

    return(
        <>
           <SettingsModel/>
           <CoverImageModal/>
        </>
    )
}