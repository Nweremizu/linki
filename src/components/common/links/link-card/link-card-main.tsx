/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { NormalTooltip } from "../../tooltips";
import { cn } from "@/lib/utils";
import { formatDateTime } from "@/lib/utils/datetime";
import { getPrettyUrl } from "@/lib/utils/urls";
import { timeAgo } from "@/lib/utils/time-ago";
import { PropsWithChildren, useContext, useRef, useState } from "react";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { LinkLogo } from "@/components/ui/link-logo";
import { linkConstructor } from "@/lib/utils/link-constructor";
import { CopyButton } from "@/components/ui/copy-button";
import { ArrowRight } from "lucide-react";
import { ArrowTurnRight2 } from "@/components/ui/icons/arrow-turn-right2";
import AvatarUser from "../../avatar-user";

export const LinkMainColumn = ({ link }: { link: any }) => {
  const { title, key, url, description, createdAt, updatedAt } = link;

  const ref = useRef<HTMLDivElement>(null);

  const entry = useIntersectionObserver(ref, {});
  const isVisble = entry?.isIntersecting ?? true;

  return (
    <div
      ref={ref}
      className="flex h-[32px] items-center gap-3 transition-[height] group-data-[variant=loose]/card-list:h-[60px]">
      {isVisble && (
        <>
          <div
            className={cn(
              "relative hidden shrink-0 items-center justify-center",
              "sm:flex"
            )}>
            <div className="absolute inset-0 shrink-0 rounded-full border border-gray-200 opacity-0 transition-opacity group-data-[variant=loose]/card-list:sm:opacity-100">
              <div className="h-full w-full rounded-full border border-white bg-gradient-to-t from-gray-100" />
            </div>
            <div className="relative pr-0.5 transition-[padding] group-data-[variant=loose]/card-list:sm:p-2">
              <LinkLogo
                apexDomain={getPrettyUrl(url)}
                className="h-4 w-4 shrink-0 transition-[width,height] sm:h-6 sm:w-6 group-data-[variant=loose]/card-list:sm:h-5 group-data-[variant=loose]/card-list:sm:w-5"
              />
            </div>
          </div>
          <div className="h-[24px] min-w-0 overflow-hidden transition-[height] group-data-[variant=loose]/card-list:h-[44px]">
            <div className="flex items-center gap-2">
              <div className="min-w-0 shrink grow-0 text-gray-950">
                <div className="flex items-center gap-2">
                  {/* @ts-ignore */}
                  {title && title.slice[(0, 12)] !== url.slice[(0, 12)] ? (
                    <span className="truncate font-semibold leading-6 text-gray-800">
                      {title}
                    </span>
                  ) : (
                    <a
                      href={linkConstructor({ key })}
                      target="_blank"
                      rel="noopener noreferrer"
                      title={linkConstructor({ key, pretty: true })}
                      className={cn(
                        "truncate font-semibold leading-6 text-gray-800 transition-colors hover:text-black"
                      )}>
                      {linkConstructor({ key, pretty: true })}
                    </a>
                  )}
                  <CopyButton
                    value={linkConstructor({
                      key,
                      pretty: false,
                    })}
                    variant="neutral"
                    className="p-1.5"
                  />
                </div>
              </div>
              <Details link={link} compact />
            </div>
            <Details link={link} />
          </div>
        </>
      )}
    </div>
  );
};

function Details({ link, compact }: { link: any; compact?: boolean }) {
  const { url, createdAt } = link;

  //   const { displayProperties } = useContext(LinksDisplayContext);

  return (
    <div
      className={cn(
        "min-w-0 items-center whitespace-nowrap text-sm transition-[opacity,display] delay-[0s,150ms] duration-[150ms,0s]",
        compact
          ? [
              "hidden gap-2.5 opacity-0 group-data-[variant=compact]/card-list:flex group-data-[variant=compact]/card-list:opacity-100",
              "xs:min-w-[40px] xs:basis-[40px] min-w-0 shrink-0 grow basis-0 sm:min-w-[120px] sm:basis-[120px]",
            ]
          : "hidden gap-1.5 opacity-0 group-data-[variant=loose]/card-list:flex group-data-[variant=loose]/card-list:opacity-100 md:gap-3"
      )}>
      <div className="flex min-w-0 items-center gap-1">
        {link.url &&
          (!link.description || link.description === "No description") &&
          (compact ? (
            <ArrowRight className="mr-1 h-3 w-3 shrink-0 text-gray-400" />
          ) : (
            <ArrowTurnRight2 className="h-3 w-3 shrink-0 text-gray-400" />
          ))}
        {link.url &&
        (!link.description || link.description === "No description") ? (
          url ? (
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              title={url}
              className="truncate text-gray-500 transition-colors hover:text-gray-700 hover:underline hover:underline-offset-2">
              {getPrettyUrl(url)}
            </a>
          ) : (
            <span className="truncate text-gray-400">No URL configured</span>
          )
        ) : (
          <span className="truncate text-gray-500">{link.description}</span>
        )}
      </div>
      <div className={cn("hidden shrink-0", link.user && "sm:block")}>
        <UserAvatar link={link} compact />
      </div>
      <div className={cn("hidden shrink-0", createdAt && "sm:block")}>
        <NormalTooltip content={formatDateTime(createdAt)}>
          <span className="text-gray-400">{timeAgo(createdAt)}</span>
        </NormalTooltip>
      </div>
    </div>
  );
}

function UserAvatar({ link, compact }: { link: any; compact?: boolean }) {
  const { user } = link;
  //   const { slug } = useWorkspace();

  return (
    <NormalTooltip
      className="px-1 py-1"
      content={
        <div className="w-full p-1">
          <AvatarUser
            id={user.id}
            name={user.name}
            image={user.image}
            className="h-8 w-8  border border-gray-200"
          />
          <div className="mt-2 flex items-center gap-1.5">
            <p className="text-sm font-semibold text-gray-700">
              {user?.name || user?.email || "Anonymous User"}
            </p>
            {/* {!slug && // this is only shown in admin mode (where there's no slug)
              user?.email && (
                <CopyButton
                  value={user.email}
                  icon={Mail}
                  className="[&>*]:h-3 [&>*]:w-3"
                />
              )} */}
          </div>
          <div className="flex flex-col gap-1 text-xs text-gray-500">
            {user?.name && user.email && <p>{user.email}</p>}
          </div>
        </div>
      }>
      <div>
        <AvatarUser
          id={user.id}
          name={user.name}
          image={user.image}
          className="h-4 w-4 text-xs border border-gray-200"
        />
      </div>
    </NormalTooltip>
  );
}
