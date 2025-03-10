"use client";

import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";
import Link from "next/link";
import { ComponentProps, ReactNode } from "react";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  text?: ReactNode | string;
  textWrapperClassName?: string;
  shortcutClassName?: string;
  loading?: boolean;
  icon?: ReactNode;
  shortcut?: string;
  right?: ReactNode;
  disabledTooltip?: string | ReactNode;
}

export const buttonVariants = cva("transition-all", {
  variants: {
    variant: {
      primary:
        "border-black bg-black !text-white dark:bg-white dark:border-white dark:!text-black text-content-inverted hover:bg-inverted hover:ring-1 hover:ring-border-subtle",
      secondary: cn(
        "border-border-subtle bg-white dark:bg-black text-content-emphasis hover:bg-bg-muted focus-visible:border-border-emphasis outline-none",
        "data-[state=open]:border-border-emphasis data-[state=open]:ring-4 data-[state=open]:ring-border-subtle"
      ),
      outline: "border-transparent text-neutral-600 hover:bg-neutral-100",
      success:
        "border-blue-500 bg-blue-500 text-white hover:bg-blue-600 hover:ring-4 hover:ring-blue-100",
      danger:
        "border-red-500 bg-red-500 text-white hover:bg-red-600 hover:ring-4 hover:ring-red-100",
      "danger-outline":
        "border-transparent bg-white text-red-500 hover:bg-red-600 hover:text-white",
    },
  },
  defaultVariants: {
    variant: "primary",
  },
});

export function ButtonLink({
  variant,
  className,
  ...rest
}: Pick<ButtonProps, "variant"> & ComponentProps<typeof Link>) {
  return (
    <Link
      {...rest}
      className={cn(
        "flex h-10 w-fit items-center whitespace-nowrap rounded-lg border px-5 text-base",
        buttonVariants({ variant }),
        className
      )}
    />
  );
}
