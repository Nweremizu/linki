"use client";

import { MaxWidthWrapper } from "@/components/common/max-width-wrapper";
import MainAnalytics from "@/components/common/analytics/main";
import LocationSection from "@/components/common/analytics/country-section";
import DeviceSection from "@/components/common/analytics/deviec-section";

export default function WorkspaceAnalyticsClient() {
  return (
    <div className="flex flex-col gap-10">
      <MaxWidthWrapper className="pt-8">
        <MainAnalytics />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 py-6">
          <LocationSection />
          <DeviceSection />
        </div>
      </MaxWidthWrapper>
    </div>
  );
}
