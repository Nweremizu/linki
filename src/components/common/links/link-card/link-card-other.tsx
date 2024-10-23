/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { CursorRays } from "@/components/ui/icons/cursor-rays";
import { cn } from "@/lib/utils";
import { timeAgo } from "@/lib/utils/time-ago";
import TagBadge from "../tag-badge";
import {
  useMemo,
  PropsWithChildren,
  useRef,
  useContext,
  useState,
} from "react";
import { useSearchParams } from "next/navigation";
import { NormalTooltip } from "../../tooltips";
import { useRouterStuff } from "@/hooks/use-router-stuff";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { useMediaQuery } from "@/hooks/use-media-query";
import { CardListContext } from "./card-list";
import Link from "next/link";
import { nFormatter } from "@/lib/utils/nformatter";
import { AnimatedSizeContainer } from "../../animated-size-container";
import { LinkControls } from "./link-control";

function useOrganizedTags(tags: any) {
  const searchParams = useSearchParams();

  const [primaryTag, additionalTags] = useMemo(() => {
    const filteredTagIds =
      searchParams?.get("tagIds")?.split(",")?.filter(Boolean) ?? [];

    /*
      Sort tags so that the filtered tags are first. The most recently selected
      filtered tag (last in array) should be displayed first.
    */
    const sortedTags =
      filteredTagIds.length > 0
        ? [...tags].sort(
            (a, b) =>
              filteredTagIds.indexOf(b.id) - filteredTagIds.indexOf(a.id)
          )
        : tags;

    return [sortedTags?.[0], sortedTags.slice(1)];
  }, [tags, searchParams]);

  return { primaryTag, additionalTags };
}

export function LinkCardDetails({ link }: { link: any }) {
  const { tags } = link;

  const ref = useRef<HTMLDivElement>(null);
  const entry = useIntersectionObserver(ref, {});
  const isVisible = entry?.isIntersecting ?? true;

  const { primaryTag, additionalTags } = useOrganizedTags(tags);

  return (
    <div ref={ref} className="flex items-center justify-end gap-2 sm:gap-5">
      {isVisible && (
        <>
          {primaryTag && (
            <TagsTooltip additionalTags={additionalTags}>
              <TagButton tag={primaryTag} plus={additionalTags.length} />
            </TagsTooltip>
          )}
          {link.clicks > 0 && <AnalyticsBadge link={link} />}
          <LinkControls link={link} />
        </>
      )}
    </div>
  );
}

function TagsTooltip({
  additionalTags,
  children,
}: PropsWithChildren<{ additionalTags: any[] }>) {
  return !!additionalTags.length ? (
    <NormalTooltip
      className="px-0 py-0"
      content={
        <div className="flex flex-wrap gap-1.5 p-3">
          {additionalTags.map((tag) => (
            <TagButton key={tag.id} tag={tag} />
          ))}
        </div>
      }>
      <div>{children}</div>
    </NormalTooltip>
  ) : (
    children
  );
}

function TagButton({ tag, plus }: { tag: any; plus?: number }) {
  const { queryParams } = useRouterStuff();
  const searchParams = useSearchParams();

  const selectedTagIds =
    searchParams?.get("tagIds")?.split(",")?.filter(Boolean) ?? [];

  return (
    <button
      onClick={() => {
        const newTagIds = selectedTagIds.includes(tag.id)
          ? selectedTagIds.filter((id) => id !== tag.id)
          : [...selectedTagIds, tag.id];

        queryParams({
          set: {
            tagIds: newTagIds.join(","),
          },
          del: [...(newTagIds.length ? [] : ["tagIds"])],
        });
      }}>
      <TagBadge {...tag} withIcon plus={plus} />
    </button>
  );
}

function AnalyticsBadge({ link }: { link: any }) {
  const { id, key, slug, clicks } = link;
  const { isMobile } = useMediaQuery();
  const { variant } = useContext(CardListContext);
  const [hoveredId, setHoveredId] = useState<string>("clicks");
  const hoveredValue = link[hoveredId];

  return isMobile ? (
    <Link
      href={`/${slug}/analytics?&key=${key}`}
      className="flex items-center gap-1 rounded-md border border-gray-200 bg-gray-50 px-2 py-0.5 text-sm text-gray-800">
      <CursorRays className="h-4 w-4 text-gray-600" />
      {nFormatter(hoveredValue)}
    </Link>
  ) : (
    <NormalTooltip
      className="px-1 py-1"
      content={
        <AnimatedSizeContainer width height>
          <div
            key={hoveredId}
            className="whitespace-nowrap px-3 py-2 text-gray-600">
            <p className="text-sm">
              <span className="font-medium text-gray-950">
                {nFormatter(hoveredValue)}
              </span>{" "}
              {hoveredValue !== 1 ? hoveredId : hoveredId.slice(0, -1)}
            </p>
            {hoveredId === "clicks" && (
              <p className="mt-1 text-xs text-gray-500">
                {link.lastClicked
                  ? `Last clicked ${timeAgo(link.lastClicked, {
                      withAgo: true,
                    })}`
                  : "No clicks recorded yet"}
              </p>
            )}
          </div>
        </AnimatedSizeContainer>
      }>
      <div className="overflow-hidden rounded-md border border-gray-200 bg-gray-50 text-sm text-gray-800">
        <div className="hidden items-center sm:flex">
          <Link
            key={id}
            href={`/${slug}/analytics?key=${key}&tab=${id}`}
            className={cn(
              "flex items-center gap-1 whitespace-nowrap px-1.5 py-0.5 transition-colors",
              variant === "loose" ? "hover:bg-gray-100" : "hover:bg-white"
            )}
            onPointerEnter={() => setHoveredId("clicks")}
            onPointerLeave={() =>
              setHoveredId((i) => (i === id ? "clicks" : i))
            }>
            <CursorRays className="text-gray-6000 h-4 w-4 shrink-0" />
            <span>
              {nFormatter(clicks)}
              {clicks && (
                <span className="hidden md:inline-block">&nbsp;{"clicks"}</span>
              )}
            </span>
          </Link>
        </div>
      </div>
    </NormalTooltip>
  );
}
