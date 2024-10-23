import { Background } from "@/components/common/background";
import { constructMetadata } from "@/lib/utils/construct-metadata";
import { Suspense } from "react";
import WelcomePageClient from "./pageClient";

// export const runtime = "nodejs";

export const metadata = constructMetadata({
  title: `Welcome to ${process.env.NEXT_PUBLIC_APP_NAME}`,
});

export default function WelcomePage() {
  return (
    <>
      <Background />
      <Suspense>
        <WelcomePageClient />
      </Suspense>
    </>
  );
}
