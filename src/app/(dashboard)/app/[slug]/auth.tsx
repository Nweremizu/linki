"use client";

import LayoutLoader from "@/components/ui/layout-loader";
import WorkspaceNotFound from "@/components/common/workspaces/workspace-not-found";
import { useWorkspace } from "@/lib/query/use-workspace";
import { ReactNode } from "react";

export default function WorkspaceAuth({ children }: { children: ReactNode }) {
  const { data: workspace, isLoading, isError } = useWorkspace();

  if (isLoading) return <LayoutLoader />;
  if (isError || !workspace) return <WorkspaceNotFound />;

  return children;
}
