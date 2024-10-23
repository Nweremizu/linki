"use client";

import { useAddWorkspaceModal } from "@/components/common/modal/add-workspace-modal";
import Intro from "@/components/common/welcome/intro";
import { AnimatePresence } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
// import { useEffect } from "react";

export default function WelcomePageClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { setShowAddWorkspaceModal, AddWorkspaceModal } = useAddWorkspaceModal({
    trigger: undefined,
  });

  useEffect(() => {
    if (searchParams.get("step") === "workspace") {
      setTimeout(() => {
        setShowAddWorkspaceModal(true);
      }, 200);
    } else {
      setShowAddWorkspaceModal(false);
    }
  }, [searchParams.get("step")]);

  return (
    <div className="flex h-screen flex-col items-center">
      <AddWorkspaceModal />
      {/* <UpgradePlanModal /> */}
      <AnimatePresence mode="wait">
        {!searchParams.get("step") ? (
          <Intro />
        ) : (
          <>
            <button
              className="group fixed left-10 top-10 isolate z-[9999889] rounded-full p-2 transition-all hover:bg-gray-100"
              onClick={() => router.back()}>
              <ArrowLeft
                size={20}
                className="text-gray-500 group-hover:text-gray-700 group-active:scale-90"
              />
            </button>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
