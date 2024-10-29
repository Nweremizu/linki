"use client";

import { useDeleteAccountModal } from "@/components/common/modal/delete-user-account-modal";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import {
  useUpdateUserDefaultWorkspace,
  useUpdateUserName,
  useUser,
} from "@/lib/query/user/useUser";
import { useWorkspaces } from "@/lib/query/useWorkspaces";
import { cn } from "@/lib/utils";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface SettingsCardProps {
  title: string;
  description?: string;
  isDelete?: boolean;
  buttonFn?: () => void;
  children?: React.ReactNode;
  buttonText?: string;
  isChanged?: boolean;
  saving?: boolean;
}

export default function SettingsPageClient() {
  const { data: session } = useSession();
  const {
    data: userData,
    isLoading: isUserLoading,
    error: userError,
  } = useUser();
  const {
    data: workspaces,
    error: workspacesError,
    isLoading: isWorkspaceLoading,
  } = useWorkspaces(session?.user?.id ?? "");

  const [name, setName] = useState<string>("");
  const [defaultWorkspace, setDefaultWorkspace] = useState<string>("");
  const [isNameUpdating, setIsNameUpdating] = useState<boolean>(false);
  const [isWorkspaceUpdating, setIsWorkspaceUpdating] =
    useState<boolean>(false);
  const [isChanged, setIsChanged] = useState<boolean>(false);
  const [isWorkspaceChanged, setIsWorkspaceChanged] = useState<boolean>(false);

  const { DeleteAccountModal, setShowDeleteUserAccountModal } =
    useDeleteAccountModal();
  const nameChangeMutation = useUpdateUserName();
  const defaultWorkspaceChangeMutation = useUpdateUserDefaultWorkspace();

  useEffect(() => {
    if (!isUserLoading && userData) {
      setName(userData.name);
      setDefaultWorkspace(userData.defaultWorkspace);
    }
  }, [userData, isUserLoading]);

  const handleNameChange = async () => {
    setIsNameUpdating(true);
    try {
      await nameChangeMutation.mutateAsync(name, {
        onError: (error) => {
          toast.error(
            error.message.length < 30
              ? error.message
              : "An error occurred while updating your name"
          );
        },
        onSuccess: () => {
          toast.success("Name updated successfully");
        },
      });
      setIsChanged(false);
    } catch {
      toast.error("An error occurred while updating your name");
    } finally {
      setIsNameUpdating(false);
    }
  };

  const handleDefaultWorkspaceChange = async () => {
    setIsWorkspaceUpdating(true);
    try {
      await defaultWorkspaceChangeMutation.mutateAsync(defaultWorkspace, {
        onError: (error) => {
          toast.error(
            error.message.length < 30
              ? error.message
              : "An error occurred while updating your default workspace"
          );
        },
        onSuccess: () => {
          toast.success("Default workspace updated successfully");
        },
      });
      setIsWorkspaceChanged(false);
    } catch {
      toast.error("An error occurred while updating your default workspace");
    } finally {
      setIsWorkspaceUpdating(false);
    }
  };

  const handleInputChange = (
    setter: React.Dispatch<React.SetStateAction<string>>,
    value: string,
    isWorkspace: boolean = false
  ) => {
    setter(value);
    isWorkspace ? setIsWorkspaceChanged(true) : setIsChanged(true);
  };

  if (userError || workspacesError) {
    return <div>Error loading data</div>;
  }

  return (
    <div className="grid gap-8">
      <DeleteAccountModal />
      <SettingsCard
        title="Your Personal Information"
        description="This information will be displayed publicly on your profile."
        buttonFn={handleNameChange}
        isChanged={isChanged}
        saving={isNameUpdating}
      >
        <div className="flex flex-col gap-4 px-6 py-4">
          <div className="flex flex-col gap-2">
            <h3 className="text-md font-semibold text-gray-900">Name</h3>
            {isUserLoading ? (
              <Skeleton className="h-10 w-full" />
            ) : (
              <Input
                type="text"
                value={name}
                disabled={isNameUpdating}
                onChange={(e) => handleInputChange(setName, e.target.value)}
                className="border shadow-none border-gray-200 rounded-lg p-3 text-sm text-gray-900"
              />
            )}
          </div>
        </div>
      </SettingsCard>
      <SettingsCard
        title="Your Default Workspace"
        description="This is the workspace you will be redirected to when you log in."
        buttonFn={handleDefaultWorkspaceChange}
        isChanged={isWorkspaceChanged}
        saving={isWorkspaceUpdating}
      >
        <div className="flex flex-col gap-4 px-6 py-4">
          <div className="flex flex-col gap-2">
            <h3 className="text-md font-semibold text-gray-900">
              Default Workspace
            </h3>
            {isUserLoading || isWorkspaceLoading ? (
              <Skeleton className="h-10 w-full" />
            ) : (
              <Select
                defaultValue={defaultWorkspace || userData?.defaultWorkspace}
                onValueChange={(value) =>
                  handleInputChange(setDefaultWorkspace, value, true)
                }
              >
                <SelectTrigger className=" shadow-none">
                  <SelectValue placeholder="Select a workspace" />
                </SelectTrigger>
                <SelectContent>
                  {workspaces?.map((workspace) => (
                    <SelectItem
                      key={workspace.project.id}
                      value={workspace.project.slug}
                    >
                      {workspace.project.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          </div>
        </div>
      </SettingsCard>
      <SettingsCard
        title="Delete Account"
        buttonText="Delete Account"
        description="Permanently delete your account. Once you delete your account, there is no going back. Please be certain."
        isDelete
        buttonFn={() => setShowDeleteUserAccountModal(true)}
        saving={false}
      />
    </div>
  );
}

export const SettingsCard = ({
  title,
  description,
  isDelete = false,
  buttonFn,
  children,
  isChanged,
  buttonText = "Save changes",
  saving,
}: SettingsCardProps) => (
  <div
    className={cn(
      "bg-white rounded-lg shadow-sm border border-gray-100 pt-6",
      isDelete && "border-red-400"
    )}
  >
    <div className="px-6 space-y-3">
      <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
      {description && <p className="text-sm text-gray-500">{description}</p>}
    </div>
    {children}
    <div
      className={cn(
        "p-6 mt-4 bg-gray-50 border-t border-gray-200 rounded-b-lg text-end",
        isDelete && "bg-red-100 border-red-200"
      )}
    >
      <button
        onClick={buttonFn}
        disabled={saving || (!isChanged && !isDelete)}
        className={cn(
          "bg-gray-950 text-white rounded-lg px-4 py-2 text-sm font-semibold",
          isDelete && "bg-red-600",
          !isChanged && !isDelete && "opacity-50 cursor-not-allowed"
        )}
      >
        {buttonText}
      </button>
    </div>
  </div>
);
