"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { MaxWidthWrapper } from "./max-width-wrapper";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";
import NavLink from "./settings-nav";
import { useScroll } from "@/hooks/use-scroll";

interface Tab {
  name: string;
  icon: ReactNode; // Type for components passed as icons
  segment?: string | null;
}

interface SettingsLayoutProps {
  tabs: {
    group: string;
    tabs: Tab[];
  }[];
  tabContainerClassName?: string;
  children: ReactNode;
}

const SettingsLayout: React.FC<SettingsLayoutProps> = ({
  tabs,
  tabContainerClassName = "",
  children,
}) => {
  const scrolled = useScroll(100);
  return (
    <div className="relative min-h-[calc(100vh-16px)] bg-white">
      <MaxWidthWrapper className="grid items-start gap-8 py-10 lg:grid-cols-5">
        <div
          className={cn(
            "flex flex-wrap gap-4 lg:sticky lg:grid",
            tabContainerClassName
          )}
        >
          {tabs.map(({ group, tabs }) => (
            <div
              key={group}
              className={cn(
                "flex lg:flex-col gap-2 transition-all",
                scrolled &&
                  "translate-y-[3.4rem] lg:translate-y-[0.5rem] fixed lg:relative -top-1 lg:top-auto bg-white lg:border-0 lg:shadow-none lg:w-auto lg:p-0 lg:z-auto border rounded-lg shadow-md w-[98%] self-center p-2 z-10"
              )}
            >
              {group && (
                <span className="pb-2 text-sm text-gray-500">{group}</span>
              )}
              {tabs.map((tab, index) => (
                <NavLink
                  key={index}
                  segment={tab.segment ?? null}
                  icon={tab.icon}
                >
                  {tab.name}
                </NavLink>
              ))}
            </div>
          ))}
        </div>
        <div className="grid gap-5 lg:col-span-4">{children}</div>
      </MaxWidthWrapper>
    </div>
  );
};

export default SettingsLayout;
