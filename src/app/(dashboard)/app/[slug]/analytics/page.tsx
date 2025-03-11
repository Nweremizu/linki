import LayoutLoader from "@/components/ui/layout-loader";
import { Suspense } from "react";
import WorkspaceAnalyticsClient from "./page-client";

export default function WorkspaceAnalytics() {
  return (
    <Suspense fallback={<LayoutLoader />}>
      <WorkspaceAnalyticsClient />
    </Suspense>
  );
}
