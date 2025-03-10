"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { cn } from "@/lib/utils";
import { useScroll } from "@/hooks/use-scroll";
import { MaxWidthWrapper } from "../common/max-width-wrapper";
import { buttonVariants } from "../ui/button-link";

export const navItems = [
  {
    name: "Home",
    href: "/",
    segments: ["/", "/home"],
  },
  {
    name: "About",
    href: "/about",
    segments: ["/about"],
  },
  {
    name: "Contact",
    href: "/contact",
    segments: ["/contact"],
  },
  {
    name: "Pricing",
    href: "/pricing",
    segments: ["/pricing"],
  },
];

export default function NavBar() {
  const { data: session } = useSession();
  const pathname = usePathname();
  const scrolled = useScroll(40);

  const navItemClassName = cn(
    "relative group/item flex items-center rounded-md px-4 py-2 text-sm rounded-lg font-medium text-neutral-700 hover:text-neutral-900 transition-colors",
    "dark:text-white/90 dark:hover:text-white",
    "hover:bg-neutral-900/5 dark:hover:bg-white/10",
    "data-[active=true]:bg-neutral-900/5 dark:data-[active=true]:bg-white/10",

    // Hide active state when another item is hovered
    "group-has-[:hover]:data-[active=true]:[&:not(:hover)]:bg-transparent"
  );

  return (
    <nav
      className={cn(
        // "flex items-center justify-between w-full px-10 py-4 h-fit lg:px-100 2xl:px-72 border-b border-gray-100 ",
        "sticky inset-x-0 top-0 z-30 w-full transition-all"
      )}
    >
      <div
        className={cn(
          "absolute inset-0 block border-b border-transparent transition-all",
          scrolled &&
            "border-neutral-100 bg-white/75 backdrop-blur-lg dark:border-white/10 dark:bg-black/75"
        )}
      />
      <MaxWidthWrapper
        className={cn("relative", "max-w-screen-lg lg:px-4 xl:px-0")}
      >
        <div className="flex h-14 items-center justify-between">
          <div className="grow basis-0 lg:p-0 pt-3">
            <Image
              src={"./assets/Logo.svg"}
              height={50}
              width={100}
              priority={true}
              alt="Logo"
            />
          </div>
          <div className="lg:flex items-center gap-4 font-medium hidden text-gray-400">
            {navItems.map(({ name, href, segments }) => {
              const isActive = segments.some((segment) =>
                pathname?.startsWith(segment)
              );
              return (
                <Link
                  key={name}
                  id={`nav-${name.toLowerCase()}`}
                  href={href}
                  className={navItemClassName}
                  data-active={isActive}
                >
                  {name}
                </Link>
              );
            })}
          </div>
          <div className="hidden grow basis-0 justify-end gap-2 lg:flex">
            {!session?.user ? (
              <div className="flex items-center justify-center space-x-2">
                <Link
                  href={"/login"}
                  className={cn(
                    buttonVariants({ variant: "primary" }),
                    "flex h-8 items-center rounded-lg border px-4 text-sm",
                    "hover:!ring-3 hover:ring-neutral-400",
                    "dark:border-white dark:bg-white dark:text-black dark:hover:bg-neutral-50 dark:hover:ring-white/10"
                  )}
                >
                  Log in
                </Link>
                <Link
                  href={"/register"}
                  className={cn(
                    buttonVariants({ variant: "secondary" }),
                    "flex h-8 items-center rounded-lg border px-4 text-sm",
                    "hover:bg-neutral-50 transition-colors duration-75",
                    "dark:border-white dark:bg-white dark:text-black dark:hover:bg-neutral-50 dark:hover:ring-white/10"
                  )}
                >
                  Sign up
                </Link>
              </div>
            ) : (
              <Link
                href={"/dashboard"}
                className={cn(
                  buttonVariants({ variant: "primary" }),
                  "flex h-8 items-center rounded-lg border px-4 text-sm",
                  "dark:border-white dark:bg-white dark:text-black dark:hover:bg-neutral-50 dark:hover:ring-white/10"
                )}
              >
                Go to Dashboard
              </Link>
            )}
          </div>
        </div>
      </MaxWidthWrapper>
    </nav>
  );
}
