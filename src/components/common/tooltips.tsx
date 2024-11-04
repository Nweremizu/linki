import { ReactNode } from "react";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { HelpCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { nFormatter } from "@/lib/utils/nformatter";
import { timeAgo } from "@/lib/utils/time-ago";

export function NormalTooltip({
  children,
  content,
  className,
}: {
  children: ReactNode;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  content: any;
  className?: string;
}) {
  return (
    <Tooltip>
      <TooltipTrigger type="button">{children}</TooltipTrigger>
      <TooltipContent className="bg-white border-gray-200 shadow-lg px-1 py-1">
        <div
          className={cn(
            "max-w-xs px-4 py-2 text-center text-sm text-gray-700",
            className
          )}
        >
          {content}
        </div>
      </TooltipContent>
    </Tooltip>
  );
}

export function InfoTooltip({ content }: { content: string }) {
  return (
    <Tooltip>
      <TooltipTrigger>
        <HelpCircle className="h-4 w-4 text-gray-500" />
      </TooltipTrigger>
      <TooltipContent className="bg-white border-gray-200 shadow-lg">
        <div className="max-w-xs px-4 py-2 text-center text-sm  text-gray-700">
          {content}
        </div>
      </TooltipContent>
    </Tooltip>
  );
}

export function NumberTooltip({
  value,
  unit = "total clicks",
  prefix,
  children,
  lastClicked,
}: {
  value?: number | null;
  unit?: string;
  prefix?: string;
  children: ReactNode;
  lastClicked?: Date | null;
}) {
  if ((!value || value < 1000) && !lastClicked) {
    return children;
  }
  return (
    <Tooltip>
      <TooltipTrigger>{children}</TooltipTrigger>
      <TooltipContent>
        <div className="block max-w-xs px-4 py-2 text-center text-sm text-gray-700">
          <p className="text-sm font-semibold text-gray-700">
            {prefix}
            {nFormatter(value || 0, { full: true })} {unit}
          </p>
          {lastClicked && (
            <p className="mt-1 text-xs text-gray-500" suppressHydrationWarning>
              Last clicked {timeAgo(lastClicked, { withAgo: true })}
            </p>
          )}
        </div>
      </TooltipContent>
    </Tooltip>
  );
}
