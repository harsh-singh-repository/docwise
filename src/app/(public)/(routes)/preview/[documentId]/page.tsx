"use client";

import React, { useMemo } from 'react';
import { api } from '../../../../../../convex/_generated/api';
import { useMutation, useQuery } from 'convex/react';
import { Id } from '../../../../../../convex/_generated/dataModel';
import { Toolbar } from '@/components/ui/Toolbar';
import { Cover } from '@/components/ui/Cover';
import { Skeleton } from '@/components/ui/skeleton';
import dynamic from 'next/dynamic';

interface DocumentIdPageProps {
  params:{
    documentId:Id<"documents">;
  }
};

const page = ({params}:DocumentIdPageProps) => {

  const Editor = useMemo(()=> dynamic(()=> import("@/components/ui/Editor"),{ssr:false}),[])

  const document = useQuery(api.document.getById,{documentId:params.documentId});

  const update = useMutation(api.document.update);

  const onChange = (content:string) => {
    update({
      id:params.documentId,
      content
    })
  }
   
  if(document === undefined){
    return(
      <>
          <Cover.Skeleton/>
               <div className="md:max-w-3xl lg:max-w-4xl mx-auto mt-10">
                  <div className="space-y-4 pl-8m pt-4">
                      <Skeleton className='h-14 w-[50%]'/>
                      <Skeleton className='h-4 w-[80%]'/>
                      <Skeleton className='h-4 w-[40%]'/>
                      <Skeleton className='h-4 w-[60%]'/>
                  </div>                                                 
                </div>
      </>
    )
  }

  if(document === null){
    return (
      <p>Not Found</p>
    )
  }

  return (
    <>
       <div className="pb-40 mt-[20vh]">
           <Cover preview url={document.coverImage}/>
          <div className="md:max-w-3xl lg:max-w-4xl mx-auto">
               <Toolbar initialData={document}/>
               <Editor onChange={onChange} initialContent={document.content} editable={false}/>
          </div>
      </div>
    </>
  )
}


export default page;