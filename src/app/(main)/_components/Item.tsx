"use client";

import React from "react";
import { LucideIcon, ChevronDown, ChevronRight, Plus, MoreHorizontal, Trash } from "lucide-react";
import { Id } from "../../../../convex/_generated/dataModel";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { DropdownMenu,DropdownMenuSeparator,DropdownMenuTrigger,DropdownMenuContent,DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { useUser } from "@clerk/clerk-react";

interface IconProps {
  id?: Id<"documents">;
  document?: string;
  active?: boolean;
  expanded?: boolean;
  isSearch?: boolean;
  documentIcon?: string;
  onExpand?: () => void;
  level?: number;
  label: string;
  onClick?: () => void;
  icon: LucideIcon;
}

export const Item = ({
  id,
  label,
  onClick,
  icon: Icon,
  active,
  document,
  expanded,
  documentIcon,
  isSearch,
  level = 0,
  onExpand,
}: IconProps) => {
  const router = useRouter();
  const create = useMutation(api.document.create);
  const archive = useMutation(api.document.archives);
  const {user} = useUser();

  const onArchives = (event:React.MouseEvent<HTMLDivElement,MouseEvent>) => {
     event.stopPropagation();
      if(!id)return;

      const promise = archive({id}).then(()=>router.push("/documents"));

      toast.promise(promise,{
        loading:"Moving to trash...",
        success:"Note moved to trash",
        error:"Failed to trash note",
      });

  } 

  const handleExpand = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    event.stopPropagation();
    onExpand?.();
  };


  const onCreate = (event:React.MouseEvent<HTMLDivElement,MouseEvent>) =>{
    event.stopPropagation();
      if(!id)return;

     const promise = create({title:"Untitled",parentDocument:id}).then((documentId)=>{
      if(!expanded){
        onExpand?.();
      }
        router.push(`/documents/${documentId}`);
       });

      toast.promise(promise,{
        loading:"Creating a Newnote......",
        error:"Failed in creating note",
        success:"New Note Created!"
     })}

  const ChevronIcon = expanded ? ChevronDown : ChevronRight;
  return (
    <>
      <div
        onClick={onClick}
        role="button"
        style={{
          paddingLeft: level ? `${(level * 12)+12}px` : "12px",
        }}
        className={cn(
          "group min-h-[27px] text-sm py-1 pr-3 w-full hover:bg-primary/5 flex items-center text-muted-foreground font-medium",
          active && "bg-primary/5 text-primary"
        )}
      >
        {!!id && (
          <div
            role="button"
            className="h-full rounded-sm hover:bg-neutral-500 dark:hover:bg-neutral-600"
            onClick={handleExpand}
          >
            <ChevronIcon className="h-4 w-4 shrink-0 text-muted-foreground" />
          </div>
        )}
        {documentIcon ? (
          <div className="shrink-0 mr-2 text-[18px]">{documentIcon}</div>
        ) : (
          <Icon className="shrink-0 h-[18px] mr-2" />
        )}
        <span className="truncate">{label}</span>
        {isSearch && (
          <kbd className="ml-auto pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
            <span className="text-xs">CTRL</span>K
          </kbd>
        )}

        {!!id &&
          (<div className="ml-auto flex items-center gap-x-2">
             <DropdownMenu>
                 <DropdownMenuTrigger onClick={(e)=>e.stopPropagation()} asChild>
                      <div role="button" className="opacity-0 group-hover:opacity-100 h-full ml-auto rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600">
                          <MoreHorizontal className="h-4 w-4 text-muted-foreground"/>
                      </div>
                 </DropdownMenuTrigger>
                 <DropdownMenuContent className="w-60" align="start" side="right" forceMount>
                     <DropdownMenuItem onClick={onArchives}>
                          <Trash className="h-4 w-4 mr-2"/>Delete
                     </DropdownMenuItem>
                     <DropdownMenuSeparator/>
                         <div className="text-xs text-muted-foreground p-2">
                            Last Edited by: {user?.fullName}
                         </div>
                 </DropdownMenuContent>
             </DropdownMenu>
             <div className="opacity-0 group-hover:opacity-100 h-full ml-auto rounded-sm hover:bg-neutral-300 dark:hover "  role="button" onClick={onCreate}>
                <Plus className="h-4 w-4 text-muted-foreground"/>
             </div>
          </div>)
        }
      </div>
    </>
  );
};

Item.Skeleton = function ItemSkeleton({ level }: { level?: number }) {
  return (
    <>
      <div
        style={{
          paddingLeft: level ? `${(level * 12) + 12}px` : "12px",
        }}
        className="flex gap-x-2 py-[3px]"
      >
        <Skeleton className="h-4 w-4" />
        <Skeleton className="h-4 w-[30%]" />
      </div>
    </>
  );
};
