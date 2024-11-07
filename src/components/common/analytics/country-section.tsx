/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { CursorRays } from "@/components/ui/icons/cursor-rays";
import { cn } from "@/lib/utils";
import { TabSelect } from "../tab-select";
import { useState } from "react";
import ChartBarlist from "./chart-bar";
import { COUNTRIES } from "@/lib/constants/countries";
import { LoadingSpinner } from "@/components/ui/icons";
import {
  useTinyBirdCitiesData,
  useTinyBirdContinentsData,
  useTinyBirdCountriesData,
} from "@/lib/query/useAnalytics";
import ContinentIcon from "@/components/ui/icons/continents";
import { CONTINENTS } from "@/lib/constants/continents";

export default function LocationSection() {
  const tabs = [
    { id: "countries", label: "Countries" },
    { id: "cities", label: "Cities" },
    { id: "continents", label: "Continents" },
  ];
  const [selectedTab, setSelectedTab] = useState<
    "countries" | "cities" | "continents" | string
  >("countries");

  const useFn =
    selectedTab === "continents"
      ? useTinyBirdContinentsData
      : selectedTab === "countries"
      ? useTinyBirdCountriesData
      : useTinyBirdCitiesData;

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
                selectedTab === "continents" ? (
                  <ContinentIcon display={d.continent} className="h-5 w-5" />
                ) : (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    alt={d.country}
                    src={`https://flag.vercel.app/m/${d.country}.svg`}
                    className="h-3 w-5"
                  />
                ),
              title:
                selectedTab === "continents"
                  ? CONTINENTS[d.continent]
                  : selectedTab === "countries"
                  ? COUNTRIES[d.country]
                  : d.city,
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
    <div className="flex h-[300px] w-full items-center justify-center">
      <p className="text-gray-500">Error fetching data</p>
    </div>
  );
};
