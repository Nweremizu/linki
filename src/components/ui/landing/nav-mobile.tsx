"use client";

import { cn } from "@/lib/utils";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { buttonVariants } from "../button-link";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { navItems } from "@/components/landing/nav-bar";

export function NavMobile() {
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [open]);

  return (
    <div
      className={cn(
        "fixed right-0 top-0 z-40 flex items-center gap-4 p-2.5 pt-3 lg:hidden"
      )}
    >
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
      <button
        onClick={() => setOpen(!open)}
        className={cn(
          "z-30 rounded-full p-2 transition-colors duration-200 hover:bg-neutral-200 focus:outline-none active:bg-neutral-300 dark:hover:bg-white/20 dark:active:bg-white/30",
          open && "hover:bg-neutral-100 active:bg-neutral-200"
        )}
      >
        {open ? (
          <X className="size-5 text-neutral-600 dark:text-white" />
        ) : (
          <Menu className="size-5 text-neutral-600 dark:text-white" />
        )}
      </button>
      <nav
        className={cn(
          "fixed inset-0 z-20 w-full bg-white px-5 py-16 lg:hidden dark:bg-black dark:text-white/70",
          open
            ? "opacity-100 translate-x-0"
            : "opacity-0 translate-x-full pointer-events-none"
        )}
        style={{
          transition:
            "opacity 400ms cubic-bezier(0.2, 0.8, 0.2, 1.0), transform 500ms cubic-bezier(0.34, 1.56, 0.64, 1)",
        }}
      >
        <ul
          className={cn(
            "grid divide-y divide-neutral-200",
            open ? "translate-y-0" : "translate-y-8"
          )}
          style={{
            transition: "transform 600ms cubic-bezier(0.34, 1.56, 0.64, 1)",
          }}
        >
          {navItems.map(({ name, href }, idx) => (
            <li
              className="py-3 overflow-hidden"
              key={idx}
              style={{
                opacity: open ? 1 : 0,
                transform: open ? "translateX(0)" : "translateX(40px)",
                transition: `
                opacity 500ms cubic-bezier(0.2, 0.8, 0.2, 1.0) ${
                  100 + idx * 70
                }ms, 
                transform 500ms cubic-bezier(0.34, 1.56, 0.64, 1) ${
                  100 + idx * 70
                }ms
              `,
              }}
            >
              <Link
                href={href}
                onClick={() => setOpen(false)}
                className={cn(
                  "block px-2 py-1.5 text-lg font-medium transition-colors"
                )}
              >
                {name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
