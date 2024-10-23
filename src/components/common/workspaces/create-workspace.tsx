"use client";

import { Button } from "@/components/ui/button";
import { useAddWorkspaceModal } from "../modal/add-workspace-modal";

export default function CreateWorkspace() {
  const { setShowAddWorkspaceModal, AddWorkspaceModal } = useAddWorkspaceModal({
    trigger: undefined,
  });
  return (
    <>
      <AddWorkspaceModal />
      <Button
        onClick={() => setShowAddWorkspaceModal(true)}
        className="hidden md:flex w-fit px-4">
        <span>Create Workspace</span>
      </Button>
    </>
  );
}
