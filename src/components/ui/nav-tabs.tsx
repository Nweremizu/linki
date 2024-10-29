"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { useMemo } from "react";
import { useScroll } from "@/hooks/use-scroll";

export default function NavTabs() {
  const pathname = usePathname();
  const { slug } = useParams() as { slug?: string };

  const tabs = useMemo(
    () => [
      { name: "Links", href: `/app/${slug}` },
      { name: "Analytics", href: `/app/${slug}/analytics` },
      { name: "Settings", href: `/app/${slug}/settings` },
    ],
    [slug]
  );

  const scrolled = useScroll(80);

  if (!slug) return null;

  return (
    <div
      className={cn(
        "scrollbar-hide relative flex gap-x-2 overflow-x-auto transition-all",
        scrolled && "sm:translate-x-9"
      )}
    >
      {tabs.map(({ name, href }) => {
        const isActive =
          href === `/app/${slug}`
            ? pathname === href
            : pathname.startsWith(href);

        return (
          <Link key={href} href={href} className="relative">
            <div className="mx-1 my-1.5 rounded-md px-3 py-1.5 transition-all duration-75 hover:bg-gray-100 active:bg-gray-200">
              <p className="text-sm text-gray-600 hover:text-black">{name}</p>
            </div>
            {isActive && (
              <motion.div
                layoutId="indicator"
                transition={{
                  duration: 0.25,
                }}
                className="absolute bottom-0 w-full px-1.5"
              >
                <div className="h-0.5 bg-black" />
              </motion.div>
            )}
          </Link>
        );
      })}
      {/* {slug &&
        !loading &&
        !error &&
        !loadingDomains &&
        !domain &&
        linksCount === 0 && <OnboardingChecklist />} */}
    </div>
  );
}
