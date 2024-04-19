"use client";

import { useParams,useRouter } from "next/navigation";
import { useState } from "react";
import { Id,Doc } from "../../../../convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { Item } from "./Item";
import { cn } from "@/lib/utils";
import { FileIcon } from "lucide-react";

interface DocumentListProps{
    parentDocumentId?: Id<"documents">;
    level?:number;
    data?:Doc<"documents">[];
}

export const DocumentList = ({
    parentDocumentId,
    level = 0,
}:DocumentListProps) =>{
    const params = useParams();
    const router = useRouter();
    const [expanded,setExpanded] = useState<Record<string,boolean>>({});

    const onExpand = (documentId:string) =>
    {
        setExpanded(prevExpanded => ({
           ...prevExpanded,
           [documentId]: !prevExpanded[documentId]
        }));
    };

    const document = useQuery(api.document.getSideBar,{
        parentDocument : parentDocumentId
    });

    const Redirect = (documentId:string)=>{
        router.push(`/documents/${documentId}`);
    };

    if(document === undefined){
        return(
            <>
              <Item.Skeleton level={level}/>
              {level === 0 && (
                <>
                  <Item.Skeleton level={level}/>
                  <Item.Skeleton level={level}/>
                </>
              )}
            </>
        )
    };

    return (
        <>
           <p style={{paddingLeft: level ?  `${(level*12)+25}px` : undefined }}
           className={cn('hidden text-sm font-medium text-muted-foreground/80',expanded && "last:block" , level === 0 && "hidden")}
           >
            No Pages Inside
           </p>
           {document.map((documents)=>(
            <div key={documents._id}>
                <Item id={documents._id} 
                onClick={()=> Redirect(documents._id)}
                label={documents.title}
                icon={FileIcon}
                active={params.documentId === documents._id}
                level={level}
                documentIcon={documents.icon}
                onExpand={()=>onExpand(documents._id)}
                expanded={expanded[documents._id]}
                />
                {expanded[documents._id] && (
                    <DocumentList parentDocumentId={documents._id} level={level+1}/>
                )}
            </div>
        ))}
        </>
    )
}