/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Dispatch, SetStateAction, createContext, useState } from "react";
import { MaxWidthWrapper } from "../max-width-wrapper";
import { CardListCard } from "./link-card/card-list-card";
import LinkCardPlaceholder from "./link-card/card-list-skeleton";
import { CardList } from "./link-card/card-list";
import NoLinksPlaceholder from "./link-card/no-links-placeholder";
import { LinkCard } from "./link-card/link-card";
import { useLinks } from "@/lib/query/links/use-links";
import { LinkWithTagsProps } from "@/types/link"; // Ensure this type is defined correctly

// Dummy data can be removed or used for debugging purposes
const dummyLinks = [
  // Example dummy links here
];

// Context to manage the open menu link ID
export const LinksListContext = createContext<{
  openMenuLinkId: string | null;
  setOpenMenuLinkId: Dispatch<SetStateAction<string | null>>;
}>({
  openMenuLinkId: null,
  setOpenMenuLinkId: () => {},
});

// Main LinkContainer Component
export function LinkContainer({
  AddEditLinkButton,
}: {
  AddEditLinkButton: () => JSX.Element;
}) {
  const [viewMode, setViewMode] = useState("card"); // Toggle between 'card' or 'row' view

  // Fetch links using custom hook
  const { data: links, isLoading } = useLinks();

  return (
    <MaxWidthWrapper>
      <LinksList
        AddEditLinkButton={AddEditLinkButton}
        links={links || []}
        loading={isLoading}
        compact={viewMode === "rows"} // Use compact view if in row mode
      />
    </MaxWidthWrapper>
  );
}

// LinksList Component to display the list of links
export function LinksList({
  AddEditLinkButton,
  links,
  loading = false,
  compact = false,
}: {
  AddEditLinkButton: () => JSX.Element;
  links: LinkWithTagsProps[];
  loading?: boolean;
  compact?: boolean;
}) {
  const [openMenuLinkId, setOpenMenuLinkId] = useState<string | null>(null);

  return (
    <>
      {loading ? (
        // Show placeholder while loading
        <CardList variant={compact ? "compact" : "loose"} loading>
          {Array.from({ length: 12 }).map((_, idx) => (
            <CardListCard
              key={idx}
              outerClassName="pointer-events-none"
              innerClassName="flex items-center gap-4">
              <LinkCardPlaceholder />
            </CardListCard>
          ))}
        </CardList>
      ) : links?.length > 0 ? (
        // Render actual links if available
        <LinksListContext.Provider
          value={{ openMenuLinkId, setOpenMenuLinkId }}>
          <CardList variant={compact ? "compact" : "loose"}>
            {links.map((link) => (
              <LinkCard key={link.id} link={link} />
            ))}
          </CardList>
        </LinksListContext.Provider>
      ) : (
        // Show NoLinksPlaceholder if no links
        <NoLinksPlaceholder AddEditLinkButton={AddEditLinkButton} />
      )}
    </>
  );
}
