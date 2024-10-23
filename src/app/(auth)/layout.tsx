import { Background } from "@/components/common/background";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Background />
      <div className="relative z-10 flex min-h-screen w-screen justify-center">
        <TooltipProvider delayDuration={100}>{children}</TooltipProvider>
      </div>
    </>
  );
}
