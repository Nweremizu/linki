"use client";

import { useWorkspaces } from "@/lib/query/useWorkspaces";
import NoWorkspacesPlaceholder from "./no-workspaces";
import { useSession } from "next-auth/react";
import WorkspaceCardPlaceholder from "./workspace-skeleton";
import WorkspaceCard from "./workspace-card";

export default function WorkspaceList() {
  const { data: session } = useSession();
  const { data: workspaces, isLoading } = useWorkspaces(
    session?.user?.id as string
  );
  if (isLoading) {
    return Array.from({ length: 6 }).map((_, i) => (
      <WorkspaceCardPlaceholder key={i} />
    ));
  }

  if (!workspaces || workspaces.length === 0) {
    return <NoWorkspacesPlaceholder />;
  }

  return workspaces.map((workspace) => (
    <WorkspaceCard key={workspace.project.id} workspace={workspace} />
  ));
}
