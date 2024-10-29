"use client";

import { SettingsCard } from "../../account/settings/page-client";
import { Input } from "@/components/ui/input";
import {
  useUpdateWorkspaceName,
  useUpdateWorkspaceSlug,
  useWorkspace,
} from "@/lib/query/use-workspace";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";
import { useRouter } from "next/navigation";
import { useDeleteWorkspaceModal } from "@/components/common/modal/delete-workspace-modal";

export default function WorkspaceSettingsPageClient() {
  const { data, isLoading } = useWorkspace();
  const { DeleteWorkspaceModal, setShowDeleteWorkspaceModal } =
    useDeleteWorkspaceModal();
  const changeWNameMutation = useUpdateWorkspaceName();
  const changeWSlugMutation = useUpdateWorkspaceSlug();
  const [workspaceName, setWorkspaceName] = useState<string>("");
  const [workspaceSlug, setWorkspaceSlug] = useState<string>("");
  const [isNameUpdating, setIsNameUpdating] = useState<boolean>(false);
  const [isSlugUpdating, setIsSlugUpdating] = useState<boolean>(false);
  const [isNameChanged, setIsNameChanged] = useState<boolean>(false);
  const [isSlugChanged, setIsSlugChanged] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && data) {
      setWorkspaceName(data.name);
      setWorkspaceSlug(data.slug);
    }
  }, [data, isLoading]);

  const handleInputChange = (
    setter: React.Dispatch<React.SetStateAction<string>>,
    value: string,
    isSlug: boolean = false
  ) => {
    setter(value);
    isSlug ? setIsSlugChanged(true) : setIsNameChanged(true);
  };

  const handleWorkspaceNameChange = async () => {
    setIsNameUpdating(true);
    try {
      await changeWNameMutation.mutateAsync(
        {
          id: data?.id as string,
          name: workspaceName,
        },
        {
          onError: (error) => {
            console.error("Name Update Error:", error);
            toast.error(
              error.message.length < 30
                ? error.message
                : "An error occurred while updating your name"
            );
          },
          onSuccess: () => {
            toast.success("Name updated successfully");
            setIsNameChanged(false);
          },
        }
      );
    } catch (error) {
      console.error("Name Update Error:", error);
      toast.error("An error occurred while updating your name");
    } finally {
      setIsNameUpdating(false);
    }
  };

  const handleWorkspaceSlugChange = async () => {
    setIsSlugUpdating(true);
    try {
      await changeWSlugMutation.mutateAsync(
        {
          id: data?.id as string,
          newSlug: workspaceSlug,
        },
        {
          onError: (error) => {
            console.error("Slug Update Error:", error);
            toast.error(
              error.message.length < 30
                ? error.message
                : "An error occurred while updating your slug"
            );
          },
          onSuccess: () => {
            toast.success("Slug updated successfully");
            setShowDeleteWorkspaceModal(false);
            router.push(`/app/${workspaceSlug}/settings`);
            setIsSlugChanged(false);
          },
        }
      );
    } catch (error) {
      console.error("Slug Update Error:", error);
      toast.error("An error occurred while updating your slug");
    } finally {
      setIsSlugUpdating(false);
    }
  };

  return (
    <div className="grid gap-6">
      <DeleteWorkspaceModal />
      <SettingsCard
        title="Workspace Name"
        description="This is the name of your workspace"
        saving={isNameUpdating}
        isChanged={isNameChanged}
        buttonFn={handleWorkspaceNameChange} // Trigger the name change on button click
      >
        <div className="flex flex-col gap-4 px-6 py-4">
          {isLoading ? (
            <Skeleton className="h-10 w-full" />
          ) : (
            <Input
              type="text"
              value={workspaceName} // Bind to state for input value
              onChange={(e) =>
                handleInputChange(setWorkspaceName, e.target.value)
              } // Update state on change
              className="border shadow-none border-gray-200 rounded-lg p-3 text-sm text-gray-900"
              disabled={isNameUpdating} // Disable during updates/deletion
            />
          )}
        </div>
      </SettingsCard>

      <SettingsCard
        title="Workspace Slug"
        saving={isSlugUpdating}
        isChanged={isSlugChanged}
        description="This is the slug of your workspace"
        buttonFn={handleWorkspaceSlugChange} // Trigger the slug change on button click
      >
        <div className="flex flex-col gap-4 px-6 py-4">
          {isLoading ? (
            <Skeleton className="h-10 w-full" />
          ) : (
            <Input
              type="text"
              value={workspaceSlug} // Bind to state for input value
              onChange={(e) =>
                handleInputChange(setWorkspaceSlug, e.target.value, true)
              } // Update state on change
              className="border shadow-none border-gray-200 rounded-lg p-3 text-sm text-gray-900"
              disabled={isSlugUpdating} // Disable during updates/deletion
            />
          )}
        </div>
      </SettingsCard>

      <SettingsCard
        title="Delete Workspace"
        isDelete={true}
        buttonText="Delete Workspace"
        description="Permanently delete your workspace. Once you delete the workspace, all your links, tags and so on will be gone - Please be certain."
        buttonFn={() => setShowDeleteWorkspaceModal(true)} // Trigger the delete function on button click
      />
    </div>
  );
}
