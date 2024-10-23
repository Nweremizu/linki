"use client";
import { cn } from "@/lib/utils";
import React from "react";

interface LogoProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  style?: any;
}

export function Logo({ className, style }: LogoProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="52.295"
      height="34.965"
      viewBox="0 0 52.295 34.965"
      style={style}
      className={cn("size-10", className)}>
      <g id="Logo" transform="translate(-95 -10.708)">
        <path
          id="Path_2"
          d="M126.6,27.4,118.448,33l-2.756-4.018,8.155-5.593Zm4.561,6.65,7.344,10.708,8.788-6.027L128.074,10.708l-16.943,11.62L103.788,11.62,95,17.646l19.221,28.026Z"
          fillRule="evenodd"
        />
      </g>
    </svg>
  );
}
