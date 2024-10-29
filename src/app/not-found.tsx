"use client";
import { Background } from "@/components/common/background";
import ComingSoon from "@/components/common/coming";

export default function NotFound() {
  return (
    <div className="flex items-center justify-center h-screen fixed">
      <Background />
      <ComingSoon />
    </div>
  );
}
