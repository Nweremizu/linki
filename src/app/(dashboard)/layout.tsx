import MainNav from "@/components/common/main-nav";
import { MaxWidthWrapper } from "@/components/common/max-width-wrapper";
import NavTabs from "@/components/ui/nav-tabs";
import { TooltipProvider } from "@/components/ui/tooltip";
import { constructMetadata } from "@/lib/utils/construct-metadata";
import { ReactNode, Suspense } from "react";

export const metadata = constructMetadata({
  title: "Linki Dashboard",
});

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen w-full bg-gray-50/80">
      <TooltipProvider delayDuration={100}>
        <div className="sticky -top-16 z-20 border-b border-gray-200 bg-white">
          <MaxWidthWrapper>
            <MainNav />
            <Suspense fallback={<div className="h-12 w-full" />}>
              <NavTabs />
            </Suspense>
          </MaxWidthWrapper>
        </div>
        {children}
      </TooltipProvider>
    </div>
  );
}
