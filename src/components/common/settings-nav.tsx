/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { useParams, useSelectedLayoutSegment } from "next/navigation";
import { ReactNode } from "react";

interface NavLinkProps {
  segment: string | null;
  icon: ReactNode; // Update type to ReactNode
  children: ReactNode;
}

const NavLink: React.FC<NavLinkProps> = ({ segment, icon, children }) => {
  const selectedLayoutSegment = useSelectedLayoutSegment();
  const { slug } = useParams() as { slug?: string };

  const href = `${slug ? `/app/${slug}` : "/account"}/settings${
    segment ? `/${segment}` : ""
  }`;
  const isSelected = selectedLayoutSegment === segment;

  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-2.5 whitespace-nowrap rounded-lg p-2 text-sm text-gray-950 outline-none transition-all duration-75",
        "ring-black/50 focus-visible:ring-2",
        isSelected
          ? "bg-gray-950/5"
          : "hover:bg-gray-950/5 active:bg-gray-950/10"
      )}
    >
      {icon && icon} {/* Render the icon directly */}
      {children}
    </Link>
  );
};

export default NavLink;
