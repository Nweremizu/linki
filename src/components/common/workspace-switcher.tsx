"use client";

import { useWorkspaces, Workspace } from "@/lib/query/useWorkspaces";
import { Check, ChevronsUpDown, PlusCircle } from "lucide-react";
import { useParams } from "next/navigation";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { useMemo, useState } from "react";
import { BlurImage } from "../ui/blur-image";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { useAddWorkspaceModal } from "./modal/add-workspace-modal";
import { useUser } from "@/lib/query/user/useUser";

export default function WorkspaceSwitcher() {
  const { slug } = useParams() as { slug?: string };
  const { data: session } = useSession();
  const { data: user } = useUser();
  const { data: workspaces } = useWorkspaces(session?.user?.id as string);
  const [openPopover, setOpenPopover] = useState(false);
  const { setShowAddWorkspaceModal, AddWorkspaceModal } = useAddWorkspaceModal({
    trigger: undefined,
  });

  const selected = useMemo(() => {
    const selectedWorkspace = workspaces?.find(
      (w) => w?.project?.slug === slug
    );

    if (!slug || !workspaces || !selectedWorkspace) {
      return {
        id: "new",
        name: (user?.name as string) || (user?.email as string),
        logo: "",
        slug: "/",
        plan: "free",
      };
    }

    return selectedWorkspace.project;
  }, [slug, workspaces, user]);

  if (!workspaces) {
    return <WorkspaceSwitcherPlaceholder />;
  }

  return (
    <div>
      <AddWorkspaceModal />
      <Popover open={openPopover} onOpenChange={setOpenPopover}>
        <PopoverTrigger className="flex items-center justify-between rounded-lg bg-white p-1.5 text-left text-sm transition-all duration-75 hover:bg-gray-100 focus:outline-none active:bg-gray-200">
          <div className="flex items-center space-x-3 pr-2">
            {selected.logo ? (
              <BlurImage
                src={selected.logo as string}
                referrerPolicy="no-referrer"
                width={20}
                height={20}
                alt={selected.id || (selected.name as string)}
                className="h-8 w-8 flex-none overflow-hidden rounded-full"
              />
            ) : (
              <Avatar>
                <AvatarFallback className="capitalize text-lg">
                  {selected.name[0]}
                </AvatarFallback>
              </Avatar>
            )}
            <div className="items-center space-x-3 sm:flex">
              <span className="inline-block max-w-[100px] truncate text-sm font-medium sm:max-w-[200px] capitalize">
                {selected.name}
              </span>
            </div>
          </div>
          <ChevronsUpDown
            className="h-4 w-4 text-gray-400"
            aria-hidden="true"
          />
        </PopoverTrigger>
        <PopoverContent className="relative mt-1 max-h-72 w-full space-y-0.5 overflow-auto rounded-md bg-white p-2 text-base sm:w-60 sm:text-sm sm:shadow-lg">
          <WorkspaceList
            selected={selected}
            workspaces={workspaces}
            setShowAddWorkspaceModal={setShowAddWorkspaceModal}
            setOpenPopover={setOpenPopover}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}

function WorkspaceSwitcherPlaceholder() {
  return (
    <div className="flex animate-pulse items-center space-x-1.5 rounded-lg px-1.5 py-2 sm:w-60">
      <div className="h-8 w-8 animate-pulse rounded-full bg-gray-200" />
      <div className="hidden h-8 w-28 animate-pulse rounded-md bg-gray-200 sm:block sm:w-40" />
      <ChevronsUpDown className="h-4 w-4 text-gray-400" aria-hidden="true" />
    </div>
  );
}

function WorkspaceList({
  selected,
  workspaces,
  setOpenPopover,
  setShowAddWorkspaceModal,
}: {
  selected: {
    id: string;
    name: string;
    slug: string;
    logo?: string | undefined;
  };
  setShowAddWorkspaceModal: (show: boolean) => void;
  workspaces: Workspace[];
  setOpenPopover: (open: boolean) => void;
}) {
  return (
    <div className="p-2">
      <div className="flex items-center justify-between px-2 pb-1">
        <p className="text-xs text-gray-500">My Workspaces</p>
        {workspaces.length > 0 && (
          <Link
            href="/app/workspaces"
            onClick={() => setOpenPopover(false)}
            className="rounded-md border border-gray-200 px-2 py-1 text-xs transition-colors hover:bg-gray-100"
          >
            View All
          </Link>
        )}
      </div>
      {workspaces.map((workspace) => (
        <Link
          key={workspace?.project?.slug}
          className={`relative flex w-full items-center space-x-2 rounded-md px-2 py-1.5 hover:bg-gray-100 active:bg-gray-200 ${
            selected.slug === workspace?.project?.slug ? "font-medium" : ""
          } transition-all duration-75`}
          href={`/app/${workspace?.project?.slug}`}
          shallow={false}
          onClick={() => setOpenPopover(false)}
        >
          {workspace?.project?.logo ? (
            <BlurImage
              src={workspace?.project?.logo || ""}
              width={20}
              height={20}
              alt={workspace?.project?.id}
              className="h-7 w-7 shrink-0 overflow-hidden rounded-full"
            />
          ) : (
            <Avatar>
              <AvatarFallback className="capitalize text-lg">
                {workspace?.project?.name[0]}
              </AvatarFallback>
            </Avatar>
          )}
          <span
            className={`block truncate text-sm sm:max-w-[140px] capitalize ${
              selected.slug === workspace?.project?.slug
                ? "font-medium"
                : "font-normal"
            }`}
          >
            {workspace?.project?.name}
          </span>
          {selected.slug === workspace?.project?.slug && (
            <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-black">
              <Check className="h-5 w-5" aria-hidden="true" />
            </span>
          )}
        </Link>
      ))}

      <button
        key="add"
        onClick={() => {
          setShowAddWorkspaceModal(true);
          setOpenPopover(false);
        }}
        className="flex w-full cursor-pointer items-center space-x-2 rounded-md p-2 transition-all duration-75 hover:bg-gray-100"
      >
        <PlusCircle className="h-6 w-6 text-gray-500" />
        <span className="block truncate">Add a new workspace</span>
      </button>
    </div>
  );
}
