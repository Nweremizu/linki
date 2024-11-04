"use client";

// import { useMediaQuery } from "@/hooks/use-media-query";
import { getPrettyUrl } from "@/lib/utils/urls";
import Link from "next/link";
import { ReactNode, useMemo } from "react";
import { motion } from "framer-motion";
import { NumberTooltip } from "../tooltips";
import { nFormatter } from "@/lib/utils/nformatter";
import { cn } from "@/lib/utils";

export default function ChartBarlist({
  tab,
  unit,
  data,
  barBackground,
  hoverBackground,
  maxValue,
}: {
  tab: string;
  unit: string;
  data:
    | {
        icon: ReactNode;
        title: string;
        href: string;
        value: number;
      }[]
    | undefined;
  maxValue: number;
  barBackground: string;
  hoverBackground: string;
}) {
  // const [search, setSearch] = useState("");
  // const { isMobile } = useMediaQuery();
  // if data is undefined, return null
  if (!data)
    return (
      <div>
        <p className="text-gray-500">No data available</p>
      </div>
    );

  const bars = (
    <div className="grid">
      {data.map((data, idx) => (
        <BarItem
          key={idx}
          {...data}
          maxValue={maxValue}
          tab={tab}
          unit={unit}
          barBackground={barBackground}
          hoverBackground={hoverBackground}
        />
      ))}
    </div>
  );

  return bars;
}

export function BarItem({
  icon,
  title,
  href,
  value,
  maxValue,
  tab,
  unit,
  barBackground,
  hoverBackground,
}: {
  icon: ReactNode;
  title: string;
  href: string;
  value: number;
  maxValue: number;
  tab: string;
  unit: string;
  barBackground: string;
  hoverBackground: string;
}) {
  const lineItem = useMemo(() => {
    return (
      <div className="z-10 flex items-center space-x-4 overflow-hidden px-3">
        {icon}
        <div className="truncate text-sm text-gray-800">
          {getPrettyUrl(title)}
        </div>
      </div>
    );
  }, [icon, tab, title]);

  return (
    <Link
      href={href}
      scroll={false}
      className={`border-l-2 border-transparent px-4 py-1 ${hoverBackground} min-w-0 transition-all`}
    >
      <div className="group flex items-center justify-between">
        <div className="relative z-10 flex h-8 w-full max-w-[calc(100%-2rem)] items-center">
          {lineItem}
          <motion.div
            style={{
              width: `${(value / (maxValue || 0)) * 100}%`,
            }}
            className={cn(
              "absolute h-full origin-left rounded-md",
              barBackground
            )}
            transition={{ ease: "easeOut", duration: 0.3 }}
            initial={{ transform: "scaleX(0)" }}
            animate={{ transform: "scaleY(1)" }}
          />
        </div>
        <NumberTooltip
          value={unit === "sales" ? value / 100 : value}
          unit={`total ${unit}`}
          prefix={unit === "sales" ? "$" : undefined}
        >
          <p className="z-10 px-2 text-sm text-gray-600">
            {unit === "sales" && "$"}
            {nFormatter(unit === "sales" ? value / 100 : value)}
          </p>
        </NumberTooltip>
      </div>
    </Link>
  );
}
