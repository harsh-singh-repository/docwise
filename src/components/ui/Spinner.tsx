import { Loader } from "lucide-react";

import {cva,type VariantProps} from "class-variance-authority";
import { cn } from "@/lib/utils";

const spinnerVarient = cva("text-muted-foreground animate-spin",{
    variants:{
        size:{
            sm:"h-2 w-2",
            default:"h-4 w-4",
            lg:"h-6 w-6",
            icons:"h-10 w-10"
        }
    },
    defaultVariants:{
        size:"default"
    }
});

interface SpinnerProps extends VariantProps<typeof spinnerVarient>{}

export const Spinner = ({
    size,
}:SpinnerProps)=>{
    return (
        <>
         <Loader className={cn(spinnerVarient({size}))}/>
        </>
    )
}