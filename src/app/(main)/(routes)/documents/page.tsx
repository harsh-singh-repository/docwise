"use client";

import React from 'react';
import Image from 'next/image';
import { useUser } from '@clerk/clerk-react';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import { useMutation, useQueries } from 'convex/react';
import { toast } from 'sonner';
import { api } from '../../../../../convex/_generated/api';
import { useParams, useRouter } from 'next/navigation';

const Page = () => {
    const {user} = useUser();
    const params = useParams();
    const create = useMutation(api.document.create);
    const router = useRouter()

    const onCreate = () =>{
        const promise = create({title:"Untitled"}).then((documentId) => router.push(`/documents/${documentId}`));
        toast.promise(promise,{
            loading:"Creating a new note",
            success:"New Note created",
            error:"Failed to create Note"
        });
    }

  return (
    <>
      <div className='h-full flex flex-col items-center justify-center space-y-4'>
         <Image
         src="/Empty-light.svg"
         alt='Empty'
         height={300}
         width={300}
         className='block dark:hidden'
         />
         <Image
         src="/Empty-dark.png"
         alt='Empty'
         height={300}
         width={300}
         className='hidden dark:block'
         />

         <h2 className='text-lg font-medium'>
            Welcome to {user?.firstName}&apos;s docwise
         </h2>

         <Button onClick={onCreate}>
            <PlusCircle className='h-4 w-4 mr-2'/>
              Create a Note
         </Button>
      </div>
    </>
  )
}

export default Page;