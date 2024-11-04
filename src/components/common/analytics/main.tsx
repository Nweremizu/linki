"use client";

import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { useRouterStuff } from "@/hooks/use-router-stuff";
import { cn } from "@/lib/utils";
import { NumberTooltip } from "@/components/common/tooltips";
import { CountingNumbers } from "@/components/common/counting-numbers";
import { useTinyBirdData } from "@/lib/query/useAnalytics";
import { LoadingSpinner } from "@/components/ui/icons";
import { Dispatch, SetStateAction, useState } from "react";
import { AnalyticsError } from "./country-section";

export default function MainAnalytics() {
  const { queryParams } = useRouterStuff();
  const [isLoading, setIsLoading] = useState(false);
  const [totalD, setTotal] = useState(0);

  const tabs = [
    {
      id: "clicks",
      label: "Clicks",
      colorClassName: "text-purple-400",
    },
  ];

  const tab = tabs[0];
  return (
    <div className="w-full overflow-hidden border border-gray-200 bg-white sm:rounded-xl">
      <div className="flex justify-between overflow-x-scroll border-b border-gray-200">
        <div className="scrollbar-hide flex shrink-0 grow divide-x overflow-y-hidden">
          {tabs.map(({ id, label, colorClassName }, idx) => {
            const total = {
              clicks: totalD,
            }[id];

            return (
              <div key={id} className="relative z-0">
                {idx > 0 && (
                  <div className="absolute left-0 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 rounded-full border border-gray-200 bg-white p-1.5">
                    <ChevronRight
                      className="h-3 w-3 text-gray-400"
                      strokeWidth={2.5}
                    />
                  </div>
                )}
                <Link
                  className={cn(
                    "border-box relative block h-full min-w-[110px] flex-none px-4 py-3 sm:min-w-[240px] sm:px-8 sm:py-6",
                    "transition-colors hover:bg-gray-50 focus:outline-none active:bg-gray-100",
                    "ring-inset ring-gray-500 focus-visible:ring-1 sm:first:rounded-tl-xl"
                  )}
                  href={
                    (tab.id === id
                      ? queryParams({
                          del: "event",
                          getNewPath: true,
                        })
                      : queryParams({
                          set: {
                            event: id,
                          },
                          getNewPath: true,
                        })) as string
                  }
                  aria-current
                >
                  {/* Active tab indicator */}
                  <div
                    className={cn(
                      "absolute bottom-0 left-0 h-0.5 w-full bg-black transition-transform duration-100",
                      tab.id !== id && "translate-y-[3px]" // Translate an extra pixel to avoid sub-pixel issues
                    )}
                  />

                  <div className="flex items-center gap-2.5 text-sm text-gray-600">
                    <div
                      className={cn(
                        "h-2 w-2 rounded-sm bg-current shadow-[inset_0_0_0_1px_#00000019]",
                        colorClassName
                      )}
                    />
                    <span>{label}</span>
                  </div>
                  <div className="mt-1 flex">
                    {total === 0 || !isLoading ? (
                      <NumberTooltip value={total} unit={label.toLowerCase()}>
                        <CountingNumbers
                          as="h1"
                          className="text-2xl font-medium sm:text-3xl"
                          prefix={id === "sales" && "$"}
                          {...(id === "sales" && { variant: "full" })}
                        >
                          {total}
                        </CountingNumbers>
                      </NumberTooltip>
                    ) : (
                      <div className="h-8 w-12 animate-pulse rounded-md bg-gray-200 sm:h-9" />
                    )}
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
      <div className="p-1 pt-10 sm:p-4">
        <MainChart setIsLoading={setIsLoading} setTotal={setTotal} />
      </div>
    </div>
  );
}

function MainChart({
  setIsLoading,
  setTotal,
}: {
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  setTotal: Dispatch<SetStateAction<number>>;
}) {
  const { data, isLoading, isError } = useTinyBirdData();

  const chartDataMap = new Map();
  let chartData;
  // Assuming `startDate` and `endDate` are in `YYYY-MM-DD` format
  // Calculate start and end dates based on the current date
  const endDate = new Date();
  const startDate = new Date();
  startDate.setDate(endDate.getDate() - 3); // 4 days span including today
  endDate.setDate(new Date().getDate() + 4);

  // Format dates to "YYYY-MM-DD" format for consistency
  const formattedStartDate = startDate.toISOString().split("T")[0];
  const formattedEndDate = endDate.toISOString().split("T")[0];

  if (!isLoading && data) {
    setIsLoading(false);
    setTotal(data.length);

    data.forEach((entry) => {
      const timestamp = entry.timestamp.split(" ")[0];

      if (chartDataMap.has(timestamp)) {
        // Increment if timestamp already exists
        chartDataMap.set(timestamp, chartDataMap.get(timestamp) + 1);
      } else {
        // Add new timestamp entry with initial count
        chartDataMap.set(timestamp, 1);
      }
    });

    // Populate missing dates between formattedStartDate and formattedEndDate
    const currentDate = new Date(formattedStartDate);
    const finalDate = new Date(formattedEndDate);

    while (currentDate <= finalDate) {
      const formattedDate = currentDate.toISOString().split("T")[0];

      if (!chartDataMap.has(formattedDate)) {
        // Add date with zero clicks if it does not exist
        chartDataMap.set(formattedDate, 0);
      }

      // Move to the next day
      currentDate.setDate(currentDate.getDate() + 1);
    }

    // Convert map to array for final chartData format
    chartData = Array.from(chartDataMap, ([date, clicks]) => ({
      date,
      clicks,
    }));

    // Optional: Sort by date for a sequential view
    chartData.sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );
  }

  const chartConfig: ChartConfig = {
    clicks: {
      label: "Clicks",
      color: "var(--color-chart)",
    },
  };

  if (isLoading && !data && !chartData) {
    setIsLoading(true);
    return (
      <div className="flex h-80 justify-center items-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (isError) {
    return <AnalyticsError />;
  }

  return (
    <ChartContainer config={chartConfig} className="max-h-96 w-full mr-4">
      <AreaChart
        data={chartData}
        accessibilityLayer
        margin={{
          left: 6,
          right: 10,
        }}
      >
        <CartesianGrid vertical={false} strokeDasharray={"3 3"} />
        <defs>
          <linearGradient id="fill" x1="0" y1="0" x2="0" y2="1">
            <stop
              offset="5%"
              stopColor="var(--color-chart)"
              stopOpacity={0.8}
            />
            <stop
              offset="95%"
              stopColor="var(--color-chart)"
              stopOpacity={0.1}
            />
          </linearGradient>
        </defs>
        <Area
          type="linear"
          dataKey="clicks"
          stroke="var(--color-chart)"
          fill="url(#fill)"
          opacity={0.8}
        />
        <XAxis
          dataKey={"date"}
          axisLine={true}
          tickLine={false}
          tickFormatter={(label) => formatDate(new Date(label as string))}
        />
        <YAxis
          axisLine={false}
          tickLine={false}
          dataKey={"clicks"}
          type="number"
          domain={["auto", "dataMax + 5"]}
        />

        <ChartTooltip
          content={
            <ChartTooltipContent
              className="bg-white"
              labelFormatter={(label) => formatDate(new Date(label as string))}
            />
          }
        />
      </AreaChart>
    </ChartContainer>
  );
}

// function to return the Date Month and Year
const formatDate = (date: Date) => {
  return date.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
};
