"use client";

import { CardList } from "@/components/common/links/link-card/card-list";
import { CardListCard } from "@/components/common/links/link-card/card-list-card";
import TagBadge from "@/components/common/links/tag-badge";
import { useAddEditTagModal } from "@/components/common/modal/add-edit-tag-modal";
import { useDeleteTagModal } from "@/components/common/modal/delete-tag-modal";
import { SearchBoxPersisted } from "@/components/common/searchbox";
import { Button } from "@/components/ui/button";
import { Copy } from "@/components/ui/icons";
import ThreeDots from "@/components/ui/icons/three-dots";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useRouterStuff } from "@/hooks/use-router-stuff";
import { useTagsWithCount } from "@/lib/query/links/use-tags";
import { useWorkspace } from "@/lib/query/use-workspace";
import { cn } from "@/lib/utils";
import { nFormatter } from "@/lib/utils/nformatter";
import { TagProps } from "@/types/link";
import { Delete, PenLine } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { TagCardSkeleton } from "./tags-cards-skeleton";
import { FadeUpStagger } from "@/components/text-animation/fade-up-animation";

export default function Page() {
  const { searchParams } = useRouterStuff();

  const search = searchParams.get("search");

  const { data: tags, isLoading } = useTagsWithCount({
    search: search as string,
  });
  return (
    <div className="px-6 flex flex-col gap-3">
      <h1 className="text-2xl font-semibold">Tags</h1>
      <p>Organize and manage your link tags from here.</p>
      <Top loading={isLoading} />
      <TagList tags={tags} isLoading={isLoading} />
    </div>
  );
}

function Top({ loading }: { loading?: boolean }) {
  const { AddEditTagModal, setShowAddEditTagModal } = useAddEditTagModal();
  const { queryParams } = useRouterStuff();

  return (
    <div className="w-full flex justify-between">
      <AddEditTagModal />
      <SearchBoxPersisted
        loading={loading}
        onChangeDebounced={(t) => {
          if (t) {
            queryParams({ set: { search: t }, del: "page" });
          } else {
            queryParams({ del: "search" });
          }
        }}
      />
      <Button
        onClick={() => setShowAddEditTagModal(true)}
        className="w-fit px-4"
      >
        Create tag
      </Button>
    </div>
  );
}

interface TagListItemProps extends TagProps {
  count?: number;
}

function TagList({
  tags,
  isLoading,
}: {
  tags: TagListItemProps[] | undefined;
  isLoading?: boolean;
}) {
  return (
    <>
      {tags?.length === 0 && !isLoading ? (
        <div className="flex justify-center text-gray-500 py-5 text-lg relative">
          <FadeUpStagger>
            <p>No tags found.</p>
            <p>Create a tag to get started.</p>
          </FadeUpStagger>
          <div className="absolute bottom-0 right-3 ">
            <ArrowAnimation />
          </div>
        </div>
      ) : (
        <CardList variant={"compact"} loading={isLoading}>
          {tags?.length
            ? tags?.map((tag) => <TagListItem key={tag.id} tag={tag} />)
            : Array.from({ length: 5 }).map((_, i) => (
                <TagCardSkeleton key={i} />
              ))}
        </CardList>
      )}
    </>
  );
}

import React from "react";

const ArrowAnimation = () => {
  return (
    <motion.svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 100 125"
      className="w-24 h-24 text-gray-800"
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ pathLength: [0, 0.25, 0.5, 0.75, 1], opacity: 1 }}
      transition={{
        duration: 2,
        ease: "easeInOut",
      }}
    >
      <motion.path
        d="M15.8,64.5c9.1,6.6,20.9,8.4,31.6,5.2C58,66.5,67.3,59,73.8,50.3c3.3-4.3,5.9-9,8-14c-0.3,4.1-0.1,8.2,0.7,12.3  c0.1,0.6,0.5,2,1.4,1.6c0.8-0.4,0.9-2.1,0.8-2.8c-0.9-4.7-1-9.4-0.2-14.1c0-0.1,0-0.2,0-0.3c1-1,0.4-5.3-1.2-3.9  c-2.2,2-4.6,3.8-7.2,5.3c-1.3,0.7-2.7,1.4-4,2c-1.4,0.6-2.8,1.2-4.3,1c-0.9-0.1-1.1,1.7-1.1,2.3c0,0.7,0.2,2.2,1.1,2.3  c1.6,0.2,3.2-0.4,4.7-1c1.5-0.6,2.9-1.3,4.3-2.1c0.4-0.2,0.9-0.5,1.3-0.8c-3.6,7.1-8.8,13.5-14.9,18.4c-4.3,3.5-9,6.4-14.2,8.3  c-5.1,1.9-10.6,2.5-16,1.9c-5.9-0.7-11.6-2.9-16.5-6.4c-0.8-0.6-1.3,1.1-1.4,1.6C14.9,62.6,15,63.9,15.8,64.5z"
        className="fill-current"
        strokeWidth="2"
        stroke="currentColor"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 2, ease: "easeInOut" }}
      />
    </motion.svg>
  );
};

function TagListItem({ tag }: { tag: TagListItemProps }) {
  const { AddEditTagModal, setShowAddEditTagModal } = useAddEditTagModal(tag);
  const { data } = useWorkspace();
  const { DeleteTagModal, setShowDeleteTagModal } = useDeleteTagModal(tag);

  return (
    <>
      <AddEditTagModal />
      <DeleteTagModal />
      <CardListCard
        onClick={() => {}}
        innerClassName={cn(
          "flex items-center justify-between gap-5 sm:gap-8 md:gap-12 text-sm transition-opacity"
        )}
      >
        <div className="flex min-w-0 grow items-center gap-3">
          <TagBadge color={tag.color} withIcon className="sm:p-1.5" />
          <span className="min-w-0 truncate whitespace-nowrap text-gray-800">
            {tag.name}
          </span>
        </div>

        <div className="flex items-center gap-5 sm:gap-8 md:gap-12">
          <Link
            href={`/app/${data?.slug}?tagIds=${tag.id}`}
            className="whitespace-nowrap rounded-md border border-gray-200 bg-gray-50 px-2 py-0.5 text-sm text-gray-800 transition-colors hover:bg-gray-100"
          >
            {nFormatter(tag.count || 0)} link{tag.count !== 1 && "s"}
          </Link>
        </div>

        <Popover>
          <PopoverTrigger
            className={cn(
              "h-8 px-1.5 rounded-md shadow-none border border-gray-100 w-fit outline-none transition-all duration-200",
              " data-[state=open]:border-gray-500 sm:group-hover/card:data-[state=closed]:border-gray-200"
            )}
          >
            <ThreeDots className="size-5 shrink-0" />
          </PopoverTrigger>
          <PopoverContent className="grid w-full gap-px p-2 sm:w-48">
            <Button
              onClick={() => setShowAddEditTagModal(true)}
              className="shadow-none border-0 bg-transparent hover:bg-gray-50 text-gray-800 h-9 px-2 font-medium flex justify-start items-center gap-4"
            >
              <PenLine className="size-4" />
              Edit
            </Button>
            <Button className="shadow-none border-0 bg-transparent hover:bg-gray-50 text-gray-800 h-9 px-2 font-medium flex justify-start items-center gap-4">
              <Copy className="size-4" />
              Copy Tag ID
            </Button>
            <Button
              onClick={() => setShowDeleteTagModal(true)}
              className="shadow-none border-0 bg-transparent hover:bg-gray-50 text-red-700 h-9 px-2 font-medium flex justify-start items-center gap-4"
            >
              <Delete className="size-4" />
              Delete
            </Button>
          </PopoverContent>
        </Popover>
      </CardListCard>
    </>
  );
}
