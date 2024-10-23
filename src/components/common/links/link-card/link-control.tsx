/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button } from "@/components/ui/button";
import { Archive, CopyPlus, Delete, PenLine } from "lucide-react";
import { cn } from "@/lib/utils";
import { punycode } from "@/lib/utils/punycode";
import ThreeDots from "@/components/ui/icons/three-dots";
import { LinkWithTagsProps } from "@/types/link";
import { useParams } from "next/navigation";
import { useContext, useState } from "react";
import { CardListContext } from "./card-list";
import { LinksListContext } from "../link-container";
import { toast } from "sonner";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useAddEditLinkModal } from "../../modal/add-edit-link-modal.tsx";
import { useDeleteLinkModal } from "../../modal/delete-link-modal";

export function LinkControls({ link }: { link: LinkWithTagsProps }) {
  const { slug } = useParams() as { slug?: string };
  //   const { hovered } = useContext(CardListContext);
  const { openMenuLinkId, setOpenMenuLinkId } = useContext(LinksListContext);
  const openPopover = openMenuLinkId === link.id;
  const setOpenPopover = (open: boolean) => {
    setOpenMenuLinkId(open ? link.id : null);
  };

  const [copiedLinkId, setCopiedLinkId] = useState(false);

  const copyLinkId = () => {
    navigator.clipboard.writeText(link.id);
    setCopiedLinkId(true);
    toast.success("Link ID copied!");
    setTimeout(() => setCopiedLinkId(false), 3000);
  };

  const { AddEditLinkModal, setShowAddEditLinkModal } = useAddEditLinkModal({
    props: link,
  });
  const { DeleteLinkModal, setShowDeleteLinkModal } = useDeleteLinkModal({
    link,
  });

  return (
    <div className="flex justify-end">
      <AddEditLinkModal />
      <DeleteLinkModal />
      <Popover open={openPopover} onOpenChange={setOpenPopover}>
        <PopoverTrigger
          className={cn(
            "h-8 px-1.5 outline-none transition-all duration-200 hover:bg-gray-100  rounded-md border",
            "border-transparent data-[state=open]:border-gray-500 data-[state=open]:bg-gray-100 sm:group-hover/card:data-[state=closed]:border-gray-200"
          )}>
          <ThreeDots className="h-5 w-5 shrink-0" />
        </PopoverTrigger>
        <PopoverContent className="w-full sm:w-48 !p-0 ">
          <div className="grid gap-px p-2 text-gray-500">
            <Button
              variant={"ghost"}
              onClick={() => {
                setOpenPopover(false);
                setShowAddEditLinkModal(true);
              }}
              className="h-9 px-2 font-medium space-x-2 flex w-full justify-start border-0">
              <PenLine className="size-4" />
              Edit
            </Button>
            <Button
              variant={"ghost"}
              onClick={() => {
                copyLinkId();
              }}
              className="h-9 px-2 font-medium space-x-2 flex w-full justify-start border-0">
              <CopyPlus className="size-4" />
              Copy Link Id
            </Button>
            <Button
              variant={"ghost"}
              className="!h-9 px-2 font-medium space-x-2 flex w-full justify-start border-0 disabled:justify-start disabled:!h-9">
              <Archive className="size-4" />
              Archive
            </Button>
            <Button
              variant={"ghost"}
              onClick={() => {
                setOpenPopover(false);
                setShowDeleteLinkModal(true);
              }}
              className="h-9 px-2 font-medium space-x-2 flex w-full justify-start border-0 group hover:bg-red-600  hover:text-white text-red-400">
              <Delete className="size-4 text-red-400 group-hover:text-white" />
              Delete
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
