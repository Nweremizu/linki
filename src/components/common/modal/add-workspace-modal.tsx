/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogOverlay,
  DialogTitle,
} from "@/components/ui/dialog";
import { Logo } from "@/components/ui/icons/logo";
import { useRouter } from "next/navigation";
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { InfoTooltip } from "../tooltips";
import { useMediaQuery } from "@/hooks/use-media-query";
import { Button } from "../../ui/button";
import slugify from "slugify";
import { useSession } from "next-auth/react";
import AlertCircleFill from "@/components/ui/icons/alert-circle-fill";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import HideCom from "../visually-hide-component";

function AddWorkspaceModalHelper({
  showAddWorkspaceModal,
  setShowAddWorkspaceModal,
  trigger,
}: {
  showAddWorkspaceModal: boolean;
  setShowAddWorkspaceModal: Dispatch<SetStateAction<boolean>>;
  trigger?: any;
}) {
  const queryClient = useQueryClient();
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const { isMobile } = useMediaQuery();
  const [slugError, setSlugError] = useState<string | null>(null);
  const [data, setData] = useState<{
    name: string;
    slug: string;
  }>({
    name: "",
    slug: "",
  });
  const { data: session } = useSession();
  const { name, slug } = data;

  useEffect(() => {
    setData((prev) => ({
      ...prev,
      slug: slugify(name, {
        lower: true,
      }),
    }));
  }, [name]);

  // check if slug exists using the backend api
  function handleCheckSlug() {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/workspaces/${slug}/exists`).then(
      async (res) => {
        if (res.status === 200) {
          const exists = await res.json();
          console.log(exists);
          setSlugError(
            exists.message === "Slug exists"
              ? `The slug "${slug}" is already in use.`
              : null
          );
        }
      }
    );
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSaving(true);
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/workspaces`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${session?.user?.accessToken}`,
        credentials: "include",
      },
      body: JSON.stringify({
        name,
        slug,
        userId: session?.user?.id,
        userRole: "owner",
      }),
    })
      .then(async (res) => {
        if (res.status === 201) {
          const { responseObject: workspace } = await res.json();
          // console.log(workspace);
          setShowAddWorkspaceModal(false);
          toast.success(`${workspace?.name} workspace created successfully`);
          queryClient.invalidateQueries({
            queryKey: ["workspaces", session?.user?.id],
          });
          router.push(`/app/${workspace.slug}`);
        }
      })
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      .catch((_err) => {
        toast.error("An error occurred. Please try again.");
      })
      .finally(() => {
        setSaving(false);
      });
  }

  return (
    <Dialog
      open={showAddWorkspaceModal}
      onOpenChange={setShowAddWorkspaceModal}
    >
      <DialogOverlay className="fixed inset-0 z-40 bg-gray-100 bg-opacity-10 backdrop-blur" />
      {trigger && <DialogTrigger>{trigger}</DialogTrigger>}
      <DialogContent className="bg-white">
        <HideCom>
          <DialogTitle>Add Workspace modal</DialogTitle>
        </HideCom>
        <div className="flex flex-col items-center justify-center space-y-3 border-b border-gray-200 px-4 py-4 pt-8 sm:px-16">
          <Logo className="size-4" />
          <h3 className="text-lg font-medium">Create a new workspace</h3>
          <a
            href=""
            target="_blank"
            className="-translate-y-2 text-center text-xs text-gray-500 underline underline-offset-4 hover:text-gray-800"
          >
            What is a workspace?
          </a>
        </div>
        <form className="space-y-2 " onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name" className="flex items-center space-x-2">
              <p className="block text-sm font-medium text-gray-700">
                Workspace Name
              </p>
              <InfoTooltip
                content={`This is the name of your workspace on ${process.env.NEXT_PUBLIC_APP_NAME}.`}
              />
            </label>
            <div className="mt-2 flex rounded-md shadow-sm">
              <input
                name="name"
                id="name"
                type="text"
                required
                autoFocus={!isMobile}
                autoComplete="off"
                className="block w-full border p-2 rounded-md border-gray-300 text-gray-900 placeholder-gray-400 focus:!border-gray-500 focus:outline-none focus:ring-gray-500 sm:text-sm"
                placeholder="Acme, Inc."
                value={name}
                onChange={(e) => {
                  setData({ ...data, name: e.target.value });
                }}
                aria-invalid="true"
              />
            </div>
          </div>
          <div>
            <label htmlFor="slug" className="flex items-center space-x-2">
              <p className="block text-sm font-medium text-gray-700">
                Workspace Slug
              </p>
              <InfoTooltip
                content={`This is your workspace's unique slug on ${process.env.NEXT_PUBLIC_APP_NAME}.`}
              />
            </label>
            <div className="relative mt-2 flex rounded-md shadow-sm">
              <span className="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-5 py-2 text-gray-500 sm:text-sm">
                app.{process.env.NEXT_PUBLIC_APP_DOMAIN}
              </span>
              <input
                name="slug"
                id="slug"
                type="text"
                required
                autoComplete="off"
                pattern="[a-zA-Z0-9\-]+"
                className={`${
                  slugError
                    ? "border-red-300 pr-10 text-red-900 placeholder-red-300 focus:border-red-500 focus:ring-red-500"
                    : "border-gray-300 text-gray-900 placeholder-gray-400 focus:border-gray-500 focus:ring-gray-500"
                } block w-full rounded-r-md focus:outline-none border sm:text-sm p-2`}
                placeholder="acme"
                value={slug}
                minLength={3}
                maxLength={48}
                onChange={(e) => {
                  setSlugError(null);
                  setData({ ...data, slug: e.target.value });
                }}
                onBlur={handleCheckSlug}
                aria-invalid="true"
              />
              {slugError && (
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                  <AlertCircleFill
                    className="h-5 w-5 text-red-500"
                    aria-hidden="true"
                  />
                </div>
              )}
            </div>
            {slugError && (
              <p className="mt-2 text-sm text-red-600" id="email-error">
                {slugError}
              </p>
            )}
          </div>

          <Button disabled={slugError ? true : false} loading={saving}>
            Create workspace
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export function useAddWorkspaceModal({ trigger }: { trigger?: any }) {
  const [showAddWorkspaceModal, setShowAddWorkspaceModal] = useState(false);

  const AddWorkspaceModal = useCallback(() => {
    return (
      <AddWorkspaceModalHelper
        showAddWorkspaceModal={showAddWorkspaceModal}
        setShowAddWorkspaceModal={setShowAddWorkspaceModal}
        trigger={trigger}
      />
    );
  }, [showAddWorkspaceModal, setShowAddWorkspaceModal, trigger]);

  return useMemo(
    () => ({ setShowAddWorkspaceModal, AddWorkspaceModal }),
    [setShowAddWorkspaceModal, AddWorkspaceModal]
  );
}
