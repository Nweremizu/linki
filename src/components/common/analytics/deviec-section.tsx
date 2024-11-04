/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { CursorRays } from "@/components/ui/icons/cursor-rays";
import { cn } from "@/lib/utils";
import { TabSelect } from "../tab-select";
import { useState } from "react";
import { LoadingSpinner } from "@/components/ui/icons";
import {
  useTinyBirdBrowserData,
  useTinyBirdDeviceData,
  useTinyBirdOsData,
} from "@/lib/query/useAnalytics";
import BrowserIcon from "@/components/ui/browser-icon";
import DeviceIcon, { OsIcon } from "@/components/ui/device-icon";
import ChartBarlist from "./chart-bar";
import { BlurImage } from "@/components/ui/blur-image";

export default function DeviceSection() {
  const tabs = [
    { id: "browsers", label: "Browsers" },
    { id: "devices", label: "Devices" },
    { id: "os", label: "OS" },
  ];

  const [selectedTab, setSelectedTab] = useState<
    "devices" | "browsers" | "os" | string
  >("browsers");

  const useFn =
    selectedTab === "devices"
      ? useTinyBirdDeviceData
      : selectedTab === "browsers"
      ? useTinyBirdBrowserData
      : useTinyBirdOsData;

  const { data, isLoading, isError } = useFn();

  return (
    <div
      className={cn(
        "relative z-0 h-[400px] overflow-hidden border border-gray-200 bg-white sm:rounded-xl"
      )}
    >
      <div className="flex items-center justify-between border-b border-gray-200 px-4">
        <TabSelect
          options={tabs}
          selected={selectedTab}
          onSelect={setSelectedTab}
        />
        <div className="flex items-center gap-1 pr-2 text-gray-500">
          <CursorRays className="w-4 h-4" />
          <p className="hidden text-xs uppercase sm:block">clicks</p>
        </div>
      </div>
      <div className="py-4">
        {isLoading ? (
          <AnalyticsLoader />
        ) : isError ? (
          <AnalyticsError />
        ) : (
          <ChartBarlist
            tab={selectedTab}
            data={data?.map((d: any) => ({
              icon:
                selectedTab === "browsers" ? (
                  <BrowserIcon display={d.browser} className="h-4 w-4" />
                ) : selectedTab !== "devices" ? (
                  <OsIcon display={d.os} className="h-4 w-4" />
                ) : (
                  <DeviceIcon display={d.device} className="h-4 w-4" />
                ),
              title:
                selectedTab === "browsers"
                  ? d.browser
                  : selectedTab === "devices"
                  ? d.device
                  : d.os,
              href: "#",
              value: d.clicks,
            }))}
            unit={selectedTab}
            maxValue={Math.max(
              ...(data?.map((d: any) => d.clicks ?? 0) || [0])
            )}
            barBackground="bg-purple-200"
            hoverBackground="hover:bg-gradient-to-r hover:from-purple-50 hover:to-transparent hover:border-purple-500"
          />
        )}
      </div>
    </div>
  );
}

const AnalyticsLoader = () => {
  return (
    <div className="flex h-[300px] items-center justify-center">
      <LoadingSpinner />
    </div>
  );
};

export const AnalyticsError = () => {
  return (
    <div className="flex h-[300px] items-center justify-center">
      <p className="text-gray-500">Error fetching data</p>
    </div>
  );
};
