import { QRCodeIcon } from "@/components/ui/icons/qrcode";
import { useWorkspace } from "@/lib/query/use-workspace";
import { ShimmerDots } from "@/components/ui/shimmer-dots";
import { AnimatePresence, motion } from "framer-motion";
import { useMediaQuery } from "@/hooks/use-media-query";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { PenIcon } from "lucide-react";
import { QRCode } from "@/components/ui/qr/qr-code";
import { useLinkQRModal } from "../link-qr-modal";

export type QRCodeDesign = {
  fgColor: string;
  hideLogo: boolean;
};

export function QRcodePreview({
  shortUrlLink,
}: {
  shortUrlLink: string | null;
}) {
  const { isMobile } = useMediaQuery();
  const { data: workspace } = useWorkspace();
  const ref = useRef<HTMLDivElement>(null);
  const [shortUrl, setShortUrl] = useState<string | null>(null);

  // initialize the shortUrl
  useEffect(() => {
    setShortUrl(shortUrlLink);
  }, [shortUrlLink]);

  const { LinkQRModal, setShowLinkQRModal } = useLinkQRModal({
    props: {
      domain: "https://www.example.com",
      key: shortUrl as string,
    },
    onSave: (data: QRCodeDesign) => {
      setData(data);
    },
  });

  const [data, setData] = useLocalStorage<QRCodeDesign>(
    `qr-code-design-${workspace?.id}`,
    {
      fgColor: "#000000",
      hideLogo: false,
    }
  );

  const hideLogo = data.hideLogo;
  const logo = "/assets/logo_mini.svg";

  return (
    <div ref={ref}>
      <LinkQRModal />
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h2 className="text-sm font-medium text-neutral-700">QR Code</h2>
        </div>
      </div>
      <div className="relative mt-2 h-40 overflow-hidden rounded-md border border-neutral-300">
        <Button
          type="button"
          variant={"outline"}
          className="absolute top-2 right-2 z-10 h-8 w-fit bg-white px-1.5"
          onClick={() => setShowLinkQRModal(true)}
        >
          <PenIcon className="mx-px size-4" />
        </Button>
        {!isMobile && (
          <ShimmerDots className="opacity-30 [mask-image:radial-gradient(40% 40% at 50% 50%, #000 0%, #000 100%)]" />
        )}
        {shortUrl ? (
          <AnimatePresence mode="wait">
            <motion.div
              key={shortUrl}
              initial={{ filter: "blur(3px)", opacity: 0.4 }}
              animate={{ filter: "blur(0px)", opacity: 1 }}
              exit={{ filter: "blur(3px)", opacity: 0.4 }}
              transition={{ duration: 0.3 }}
              className="relative flex size-full items-center justify-center"
            >
              <QRCode
                url={shortUrl}
                fgColor={data.fgColor}
                hideLogo={hideLogo}
                logo={logo}
                scale={0.8}
              />
            </motion.div>
          </AnimatePresence>
        ) : (
          <div className="flex size-full flex-col items-center justify-center gap-2">
            <QRCodeIcon className="size-5 text-neutral-700" />
            <p className="max-w-32 text-center text-xs text-neutral-700">
              Enter a short link to generate a QR code
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
