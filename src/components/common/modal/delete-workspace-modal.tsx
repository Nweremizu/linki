"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogOverlay,
  DialogTitle,
} from "@/components/ui/dialog";
import { Logo } from "@/components/ui/icons/logo";
import { toast } from "sonner";
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useMemo,
  useState,
} from "react";
import HideCom from "../visually-hide-component";
import { useDeleteWorkspace, useWorkspace } from "@/lib/query/use-workspace";

function DeleteWorkspaceModalHelper({
  showDeleteWorkspaceModal,
  setShowDeleteWorkspaceModal,
}: {
  showDeleteWorkspaceModal: boolean;
  setShowDeleteWorkspaceModal: Dispatch<SetStateAction<boolean>>;
}) {
  const deleteAccMutation = useDeleteWorkspace();
  const { data: workspace } = useWorkspace();

  const [inputValue, setInputValue] = useState("");
  const [deleting, setDeleting] = useState(false);

  async function handleDeleteWorkspace(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setDeleting(true);
    try {
      await deleteAccMutation.mutateAsync(
        {
          id: workspace?.id as string,
        },
        {
          onError: (error) => {
            console.log(error);
            toast.error(
              error.message.length < 30
                ? error.message
                : "An error occurred while deleting the account"
            );
            setDeleting(false);
          },
          onSuccess: () => {
            setDeleting(false);
            toast.success("Account deleted successfully");
            setShowDeleteWorkspaceModal(false);
          },
        }
      );
    } catch (error) {
      setDeleting(false);
      // toast.error("An error occurred while deleting the account");
    }
  }

  return (
    <Dialog
      open={showDeleteWorkspaceModal}
      onOpenChange={setShowDeleteWorkspaceModal}
      key={"delete-user-account-modal"}
    >
      <DialogOverlay className="fixed inset-0 bg-gray-100 backdrop-blur-lg bg-opacity-10" />
      <DialogContent
        onClick={(e) => e.stopPropagation()}
        className="bg-white !p-0"
      >
        <HideCom>
          <DialogTitle>Edit link modal</DialogTitle>
        </HideCom>
        <div className="flex flex-col items-center justify-center space-y-3  px-4 py-4 pt-8 sm:px-16">
          <Logo className="size-8" />
          <h2 className="text-lg font-medium">Delete Account</h2>
          <p className="text-sm text-center text-gray-500">
            Are you sure you want to delete your account? This action is
            irreversible.
          </p>
        </div>
        <form
          className="flex flex-col space-y-3 bg-gray-50 px-4 py-8 text-left sm:px-16 rounded-b-md border border-gray-200"
          onSubmit={handleDeleteWorkspace}
        >
          <div>
            <label htmlFor="delete-account" className="text-sm text-gray-600">
              Type &quot;DELETE Workspace {workspace?.name}&quot; to confirm
            </label>
            <div className="mt-2 flex rounded-md shadow-sm">
              <input
                name="delete-workspace"
                id="delete-workspace"
                type="text"
                required
                pattern={`DELETE Workspace ${workspace?.name}`}
                autoFocus
                autoComplete="off"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="block w-full border p-2 rounded-md border-gray-300 text-gray-900 placeholder-gray-400 focus:!border-gray-500 focus:outline-none focus:ring-gray-500 sm:text-sm"
              />
            </div>
          </div>
          <Button type="submit" loading={deleting}>
            Delete Workspace
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export function useDeleteWorkspaceModal() {
  const [showDeleteWorkspaceModal, setShowDeleteWorkspaceModal] =
    useState(false);

  const DeleteWorkspaceModal = useCallback(() => {
    return (
      <DeleteWorkspaceModalHelper
        showDeleteWorkspaceModal={showDeleteWorkspaceModal}
        setShowDeleteWorkspaceModal={setShowDeleteWorkspaceModal}
      />
    );
  }, [showDeleteWorkspaceModal, setShowDeleteWorkspaceModal]);

  return useMemo(
    () => ({ DeleteWorkspaceModal, setShowDeleteWorkspaceModal }),
    [DeleteWorkspaceModal, setShowDeleteWorkspaceModal]
  );
}
