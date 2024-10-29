import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogOverlay,
  DialogTitle,
} from "@/components/ui/dialog";
import { useCallback, useMemo, useState } from "react";
import HideCom from "../visually-hide-component";
import { Logo } from "@/components/ui/icons/logo";
import { useDeleteTag } from "@/lib/query/links/use-tags";
import { TagProps } from "@/types/link";
import { toast } from "sonner";

function DeleteTagModalHelper({
  tag,
  showDeleteTagModal,
  setShowDeleteTagModal,
}: {
  tag: TagProps;
  showDeleteTagModal: boolean;
  setShowDeleteTagModal: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const deleteTagMutation = useDeleteTag();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeleteTag = async () => {
    try {
      setIsDeleting(true);
      await deleteTagMutation.mutateAsync(tag.id, {
        onSuccess: () => {
          toast.success("Tag deleted successfully");
          setIsDeleting(false);
          setShowDeleteTagModal(false);
        },
        onError: (error) => {
          console.error(error);
          setIsDeleting(false);
          toast.error("An error occurred while deleting the tag");
        },
      });
    } catch (error) {
      setIsDeleting(false);
      console.error(error);
      // toast.error("An error occurred while deleting the tag");
    }
  };

  return (
    <Dialog open={showDeleteTagModal} onOpenChange={setShowDeleteTagModal}>
      <DialogOverlay className="fixed inset-0 bg-gray-100 backdrop-blur-lg bg-opacity-10" />
      <DialogContent
        onClick={(e) => e.stopPropagation()}
        className="bg-white !p-0"
      >
        <HideCom>
          <DialogTitle>Delete tag</DialogTitle>
        </HideCom>
        <div className="flex flex-col items-center justify-center space-y-3  px-4 py-4 pt-8 sm:px-16">
          <Logo className="size-8" />
          <h3 className="text-lg font-medium">Delete Tag</h3>
          <p className="text-sm text-gray-600 text-center">
            Are you sure you want to delete this tag?
          </p>
        </div>
        <div className="flex flex-row space-x-3 bg-gray-50 px-4 py-8 text-left sm:px-16 rounded-b-md border border-gray-200">
          <Button
            variant="outline"
            onClick={() => setShowDeleteTagModal(false)}
          >
            Cancel
          </Button>
          <Button
            loading={isDeleting}
            onClick={handleDeleteTag}
            variant={"destructive"}
          >
            Delete
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export function useDeleteTagModal(tag: TagProps) {
  const [showDeleteTagModal, setShowDeleteTagModal] = useState(false);

  const DeleteTagModal = useCallback(() => {
    return (
      <DeleteTagModalHelper
        tag={tag}
        showDeleteTagModal={showDeleteTagModal}
        setShowDeleteTagModal={setShowDeleteTagModal}
      />
    );
  }, [showDeleteTagModal, setShowDeleteTagModal]);

  return useMemo(
    () => ({ DeleteTagModal, setShowDeleteTagModal }),
    [DeleteTagModal, setShowDeleteTagModal]
  );
}
