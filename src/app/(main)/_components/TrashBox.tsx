"use client";

import { useMutation, useQuery } from "convex/react";
import { useParams, useRouter } from "next/navigation";
import { api } from "../../../../convex/_generated/api";
import { useState } from "react";
import { Id } from "../../../../convex/_generated/dataModel";
import { toast } from "sonner";
import { Spinner } from "@/components/ui/Spinner";
import { Search, Trash, Undo } from "lucide-react";
import { Input } from "@/components/ui/input";
import { ConfirmModal } from "@/components/modals/confirm-dialog";

export const TrashBox = () => {
  const router = useRouter();
  const params = useParams();
  const document = useQuery(api.document.getTrash);
  const restore = useMutation(api.document.restore);
  const remove = useMutation(api.document.remove);

  const [search, setSearch] = useState("");

  const filterDocuments = document?.filter((documents) => {
    return documents.title.toLowerCase().includes(search.toLowerCase());
  });

  const onClick = (documentId: string) => {
    router.push(`/document/${documentId}`);
  };

  const onRestore = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    documentId: Id<"documents">
  ) => {
    event.stopPropagation();

    const promise = restore({ id: documentId });

    toast.promise(promise, {
      success: "Notes Restored",
      loading: "Restoring....",
      error: "Failed to restore",
    });
  };

  const onRemove = (documentId: Id<"documents">) => {
    const promise = remove({ id: documentId });

    toast.promise(promise, {
      success: "Note Deleted",
      loading: "Deleting....",
      error: "Failed to Delete",
    });

    if (params.documentId === documentId) {
      router.push("/document");
    }
  };

  if (document === undefined) {
    return (
      <>
        <div className="h-full flex items-center justify-center p-4">
          <Spinner size={"lg"} />
        </div>
      </>
    );
  }

  return (
    <>
      <div>
        <div className="text-sm">
          <div className="flex items-center gap-x-1 p-2">
            <Search className="h-4 w-4" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search notes..."
              className="h-7 focus-visible:ring-transparent bg-secondary"
            />
          </div>
          <div className="mt-2 px-1 pb-1">
            <p className="hidden last:block text-xs text-center text-muted-foreground pb-2">
              No Documents Found.
            </p>
            {filterDocuments?.map((document) => (
              <div
                key={document._id}
                role="button"
                onClick={() => onClick(document._id)}
                className="text-sm roounded-sm w-full hover:bg-primary/5 flex items-center text-primary justify-between"
              >
                <span className="truncate pl-2">{document.title}</span>
                <div className="flex items-center">
                  <div
                    onClick={(e) => onRestore(e, document._id)}
                    role="button"
                    className="rounded-sm p-2 hover:bg-neutral-400"
                  >
                    <Undo className="h-4 w-4" />
                  </div>
                <ConfirmModal onConfirm={()=>onRemove(document._id)}>
                  <div
                    role="button"
                    className="rounded-sm p-2 hover:bg-neutral-400"
                    >
                    <Trash className="h-4 w-4" />
                  </div>
                </ConfirmModal>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
