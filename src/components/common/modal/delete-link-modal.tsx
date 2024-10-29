"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogOverlay,
  DialogTitle,
} from "@/components/ui/dialog";
import { Logo } from "@/components/ui/icons/logo";
import { useDeleteLink } from "@/lib/query/links/use-link";
import { linkConstructor } from "@/lib/utils/link-constructor";
import { LinkWithTagsProps } from "@/types/link";
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useMemo,
  useState,
} from "react";
import { toast } from "sonner";
import HideCom from "../visually-hide-component";

function DeleteLinkModalHelper({
  link,
  showDeleteLinkModal,
  setShowDeleteLinkModal,
}: {
  link: LinkWithTagsProps;
  showDeleteLinkModal: boolean;
  setShowDeleteLinkModal: Dispatch<SetStateAction<boolean>>;
}) {
  const shortLink = linkConstructor({
    key: link.key,
    pretty: true,
  });
  const deleteMutation = useDeleteLink();

  const [inputValue, setInputValue] = useState("");
  const [deleting, setDeleting] = useState(false);

  async function handleDeleteLink(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setDeleting(true);
    try {
      await deleteMutation.mutateAsync(link.id, {
        onError: (error) => {
          toast.error(
            error.message.length < 30
              ? error.message
              : "An error occurred while deleting the link"
          );
          setDeleting(false);
        },
        onSuccess: () => {
          setDeleting(false);
          toast.success("Link deleted successfully");
          setShowDeleteLinkModal(false);
        },
      });
    } catch (error) {
      setDeleting(false);
      toast.error("An error occurred while deleting the link");
    }
  }

  return (
    <Dialog
      open={showDeleteLinkModal}
      onOpenChange={setShowDeleteLinkModal}
      key={"delete-link"}
    >
      <DialogOverlay className="fixed inset-0 bg-gray-100 backdrop-blur-lg bg-opacity-10" />
      <DialogContent
        onClick={(e) => e.stopPropagation()}
        className="bg-white !p-0"
      >
        <HideCom>
          <DialogTitle>Delete link modal</DialogTitle>
        </HideCom>
        <div className="flex flex-col items-center justify-center space-y-3  px-4 py-4 pt-8 sm:px-16">
          <Logo className="size-8" />
          <h3 className="text-lg font-medium">Delete link</h3>
          <p className="text-sm text-gray-600 text-center">
            Are you sure you want to delete the link{" "}
            <span className="font-medium">{link.key}</span> ? This action cannot
            be undone.
          </p>
        </div>
        <form
          className="flex flex-col space-y-3 bg-gray-50 px-4 py-8 text-left sm:px-16 rounded-b-md border border-gray-200"
          onSubmit={handleDeleteLink}
        >
          <div>
            <label htmlFor="workspace-shortLink" className="flex items-center">
              <p className="block text-sm font-medium text-gray-700">
                To verify, type{" "}
                <span className="font-semibold">{shortLink}</span> below
              </p>
            </label>
            <div className="mt-2 flex rounded-md shadow-sm">
              <input
                name="workspace-shortLink"
                id="workspace-shortLink"
                type="text"
                pattern={shortLink}
                required
                autoFocus
                autoComplete="off"
                className="block w-full border p-2 rounded-md border-gray-300 text-gray-900 placeholder-gray-400 focus:!border-gray-500 focus:outline-none focus:ring-gray-500 sm:text-sm"
                placeholder={""}
                value={inputValue}
                onChange={(e) => {
                  setInputValue(e.target.value);
                }}
                aria-invalid="true"
              />
            </div>
          </div>
          <Button type="submit" loading={deleting}>
            Delete Link
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export function useDeleteLinkModal({ link }: { link: LinkWithTagsProps }) {
  const [showDeleteLinkModal, setShowDeleteLinkModal] = useState(false);

  const DeleteLinkModal = useCallback(() => {
    return link ? (
      <DeleteLinkModalHelper
        link={link}
        showDeleteLinkModal={showDeleteLinkModal}
        setShowDeleteLinkModal={setShowDeleteLinkModal}
      />
    ) : null;
  }, [showDeleteLinkModal, setShowDeleteLinkModal]);

  return useMemo(
    () => ({ DeleteLinkModal, setShowDeleteLinkModal }),
    [DeleteLinkModal, setShowDeleteLinkModal]
  );
}
