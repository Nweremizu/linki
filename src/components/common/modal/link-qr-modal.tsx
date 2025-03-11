/* eslint-disable @typescript-eslint/ban-ts-comment */
import { getQRAsCanvas, getQRAsSVGDataUri, getQRData } from "@/lib/qr";
import { useWorkspace } from "@/lib/query/use-workspace";
import { QRCode } from "@/components/ui/qr/qr-code";
import { ShimmerDots } from "@/components/ui/shimmer-dots";
import { Modal } from "@/components/ui/new-modal";
import {
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useCallback,
  useId,
  useMemo,
  useRef,
  useState,
} from "react";
import { QRCodeDesign } from "./add-edit-link-modal.tsx/qr-code-preview";
import { useMediaQuery } from "@/hooks/use-media-query";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { useDebouncedCallback } from "use-debounce";
import { InfoTooltip } from "../tooltips";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Photo } from "@/components/ui/icons";
import { IconMenu } from "@/components/ui/icon-menu";
import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";
import { Check, Copy, Download, Link, X } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Tooltip } from "@/components/ui/custom-tooltip";
import { HexColorInput, HexColorPicker } from "react-colorful";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";
import { toast } from "sonner";
import { linkConstructor } from "@/lib/utils/link-constructor";
import { API_DOMAIN } from "@/lib/constants/continents";

export interface QRLinkProps {
  domain: string;
  key?: string;
  url?: string;
}

const DEFAULT_COLORS = [
  "#000000",
  "#C73E33",
  "#DF6547",
  "#F4B3D7",
  "#F6CF54",
  "#49A065",
  "#2146B7",
  "#AE49BF",
];

type LinkQRModalProps = {
  props: QRLinkProps;
  onSave?: (data: QRCodeDesign) => void;
};

function LinkQRModal(
  props: {
    showLinkQRModal: boolean;
    setShowLinkQRModal: Dispatch<SetStateAction<boolean>>;
  } & LinkQRModalProps
) {
  const { data: workspace } = useWorkspace();
  const id = useId();
  const { isMobile } = useMediaQuery();

  const [dataPersisted, setDataPersisted] = useLocalStorage<QRCodeDesign>(
    `qr-code-design-${workspace?.id}`,
    {
      fgColor: "#000000",
      hideLogo: false,
    }
  );

  const [data, setData] = useState(dataPersisted);
  const hideLogo = data.hideLogo;
  const url = linkConstructor({
    key: props.props.key,
    pretty: true,
  });
  const logo = "/assets/logo_mini.svg";

  const qrData = useMemo(
    () =>
      url
        ? getQRData({
            url,
            fgColor: data.fgColor,
            hideLogo,
            logo,
          })
        : null,
    [url, data, hideLogo, logo]
  );

  const onColorChange = useDebouncedCallback(
    (color: string) => setData((d) => ({ ...d, fgColor: color })),
    500
  );

  return (
    <Modal
      showModal={props.showLinkQRModal}
      setShowModal={props.setShowLinkQRModal}
      className="max-w-[500px]"
    >
      <form
        className="flex flex-col gap-6 p-4"
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          props.onSave?.(data);
          setDataPersisted(data);
          props.setShowLinkQRModal(false);
        }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-medium">QR Code</h3>
          </div>
          <button type="button" onClick={() => props.setShowLinkQRModal(false)}>
            <X className="size-5 bg-neutal-400" />
          </button>
        </div>
        <div>
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-neutral-700">
                QR Code Preview
              </span>
              <InfoTooltip content="Customize your QR code to fit your brand." />
            </div>
            {url && qrData && (
              <div className="flex items-center gap-2">
                <DownloadPopover qrData={qrData} props={props.props}>
                  <div>
                    <button
                      type="button"
                      className="text-sm font-medium text-neutral-700 hover:text-neutral-900 hover:bg-neutral-100 rounded-md p-1.5"
                    >
                      <Download className="size-4" />
                    </button>
                  </div>
                </DownloadPopover>
                <CopyPopover qrData={qrData} props={props.props}>
                  <div>
                    <button
                      type="button"
                      className="text-sm font-medium text-neutral-700 hover:text-neutral-900 hover:bg-neutral-100 rounded-md p-1.5"
                    >
                      <Copy className="size-4 text-neutral-500" />
                    </button>
                  </div>
                </CopyPopover>
              </div>
            )}
          </div>
          <div className="relative mt-2 flex h-44 items-center justify-center overflow-hidden rounded-md border border-neutral-300">
            {!isMobile && (
              <ShimmerDots className="opacity-30 [mask-image:radial-gradient(40%_80%,transparent_50%,black)]" />
            )}
            {url && (
              <AnimatePresence mode="wait">
                <motion.div
                  key={data.fgColor + data.hideLogo}
                  initial={{ filter: "blur(2px)", opacity: 0.4 }}
                  animate={{ filter: "blur(0px)", opacity: 1 }}
                  exit={{ filter: "blur(2px)", opacity: 0.4 }}
                  transition={{ duration: 0.1 }}
                  className="relative flex size-full items-center justify-center"
                >
                  <QRCode
                    url={url}
                    fgColor={data.fgColor}
                    hideLogo={data.hideLogo}
                    logo={logo}
                    scale={1}
                  />
                </motion.div>
              </AnimatePresence>
            )}
          </div>
        </div>

        {/* Logo Toggle */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <label
              className="text-sm font-medium text-neutral-700"
              htmlFor={`${id}-show-logo`}
            >
              Logo
            </label>
          </div>
          <Switch
            id={`${id}-show-logo`}
            checked={!data.hideLogo}
            onCheckedChange={() =>
              setData((d) => ({ ...d, hideLogo: !d.hideLogo }))
            }
          />
        </div>

        {/* Color Selector */}
        <div>
          <span className="block text-sm font-medium text-neutral-700">
            QR Code Color
          </span>
          <div className="mt-2 flex gap-6">
            <div className="relative flex h-9 w-32 shrink-0 rounded-md shadow-sm">
              <Tooltip
                content={
                  <div className="flex max-w-xs flex-col items-center space-y-3 p-5 text-center">
                    <HexColorPicker
                      color={data.fgColor}
                      onChange={onColorChange}
                    />
                  </div>
                }
              >
                <div
                  className="h-full w-12 rounded-l-md border"
                  style={{
                    backgroundColor: data.fgColor,
                    borderColor: data.fgColor,
                  }}
                />
              </Tooltip>
              <HexColorInput
                id="color"
                name="color"
                color={data.fgColor}
                onChange={onColorChange}
                prefixed
                style={{ borderColor: data.fgColor }}
                className="block w-full rounded-r-md border-2 border-l-0 pl-3 text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-black sm:text-sm"
              />
            </div>
            <div className="mt-1 flex flex-wrap items-center gap-3">
              {DEFAULT_COLORS.map((color) => {
                const isSelected = data.fgColor === color;
                return (
                  <button
                    key={color}
                    type="button"
                    aria-pressed={isSelected}
                    onClick={() => setData((d) => ({ ...d, fgColor: color }))}
                    className={cn(
                      "flex size-7 items-center justify-center rounded-xl transition-all",
                      isSelected
                        ? "ring-1 ring-black ring-offset-[3px]"
                        : "ring-black/10 hover:ring-4"
                    )}
                    style={{ backgroundColor: color }}
                  >
                    {isSelected && <Check className="size-4 text-white" />}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
        <div className="flex items-center justify-end gap-2">
          <Button
            type="button"
            variant="outline"
            className="h-9 w-fit shadow-none"
            onClick={() => {
              props?.setShowLinkQRModal(false);
            }}
          >
            Cancel
          </Button>
          <Button type="submit" variant="default" className="h-9 w-fit">
            Save changes
          </Button>
        </div>
      </form>
    </Modal>
  );
}

function DownloadPopover({
  qrData,
  props,
  children,
}: PropsWithChildren<{
  qrData: ReturnType<typeof getQRData>;
  props: QRLinkProps;
}>) {
  const anchorRef = useRef<HTMLAnchorElement>(null);

  function download(url: string, extension: string) {
    if (!anchorRef.current) return;
    anchorRef.current.href = url;
    anchorRef.current.download = `${props.key}-qrcode.${extension}`;
    anchorRef.current.click();
    setOpenPopover(false);
  }

  const [openPopover, setOpenPopover] = useState(false);

  return (
    <div>
      <Popover open={openPopover} onOpenChange={setOpenPopover}>
        <PopoverTrigger>{children}</PopoverTrigger>
        <PopoverContent className="grid p-1 sm:min-w-48 max-w-48">
          <button
            type="button"
            onClick={async () => {
              // @ts-ignore
              download(await getQRAsSVGDataUri(qrData), "svg");
            }}
            className="rounded-md p-2 text-left text-sm font-medium text-neutral-500 transition-all duration-75 hover:bg-neutral-100"
          >
            <IconMenu
              text="Download SVG"
              icon={<Photo className="h-4 w-4" />}
            />
          </button>
          <button
            type="button"
            onClick={async () => {
              download(
                // @ts-ignore
                (await getQRAsCanvas(qrData, "image/png")) as string,
                "png"
              );
            }}
            className="rounded-md p-2 text-left text-sm font-medium text-neutral-500 transition-all duration-75 hover:bg-neutral-100"
          >
            <IconMenu
              text="Download PNG"
              icon={<Photo className="h-4 w-4" />}
            />
          </button>
          <button
            type="button"
            onClick={async () => {
              download(
                // @ts-ignore

                (await getQRAsCanvas(qrData, "image/jpeg")) as string,
                "jpg"
              );
            }}
            className="rounded-md p-2 text-left text-sm font-medium text-neutral-500 transition-all duration-75 hover:bg-neutral-100"
          >
            <IconMenu
              text="Download JPEG"
              icon={<Photo className="h-4 w-4" />}
            />
          </button>
        </PopoverContent>
      </Popover>
      <a
        className="hidden"
        download={`${props.key}-qrcode.svg`}
        ref={anchorRef}
      />
    </div>
  );
}

function CopyPopover({
  qrData,
  props,
  children,
}: PropsWithChildren<{
  qrData: ReturnType<typeof getQRData>;
  props: QRLinkProps;
}>) {
  const [openPopover, setOpenPopover] = useState(false);
  const [copiedURL, copyUrlToClipboard] = useCopyToClipboard(2000);
  const [copiedImage, copyImageToClipboard] = useCopyToClipboard(2000);

  const copyToClipboard = async () => {
    try {
      // @ts-ignore
      const canvas = await getQRAsCanvas(qrData, "image/png", true);
      (canvas as HTMLCanvasElement).toBlob(async function (blob) {
        // @ts-ignore
        const item = new ClipboardItem({ "image/png": blob });
        await copyImageToClipboard(item);
        setOpenPopover(false);
      });
    } catch (e) {
      throw e;
    }
  };

  return (
    <Popover open={openPopover} onOpenChange={setOpenPopover}>
      <PopoverTrigger>{children}</PopoverTrigger>
      <PopoverContent className="grid p-1 sm:min-w-48 max-w-48">
        <button
          type="button"
          onClick={async () => {
            toast.promise(copyToClipboard, {
              loading: "Copying QR code to clipboard...",
              success: "Copied QR code to clipboard!",
              error: "Failed to copy",
            });
          }}
          className="rounded-md p-2 text-left text-sm font-medium text-neutral-500 transition-all duration-75 hover:bg-neutral-100"
        >
          <IconMenu
            text="Copy Image"
            icon={
              copiedImage ? (
                <Check className="h-4 w-4" />
              ) : (
                <Photo className="h-4 w-4" />
              )
            }
          />
        </button>
        <button
          type="button"
          onClick={() => {
            const url = `${API_DOMAIN}/api/qr?url=${linkConstructor({
              key: props.key,
              searchParams: {
                qr: "1",
              },
            })}${qrData.hideLogo ? "&hideLogo=true" : ""} ${
              qrData.fgColor ? `&fgColor=${qrData.fgColor.slice(1)}` : ""
            }`;
            toast.promise(copyUrlToClipboard(url), {
              success: "Copied QR code URL to clipboard!",
            });
            setOpenPopover(false);
          }}
          className="rounded-md p-2 text-left text-sm font-medium text-neutral-500 transition-all duration-75 hover:bg-neutral-100"
        >
          <IconMenu
            text="Copy URL"
            icon={
              copiedURL ? (
                <Check className="h-4 w-4" />
              ) : (
                <Link className="h-4 w-4" />
              )
            }
          />
        </button>
      </PopoverContent>
    </Popover>
  );
}

export function useLinkQRModal(props: LinkQRModalProps) {
  const [showLinkQRModal, setShowLinkQRModal] = useState(false);

  const LinkQRModalCallback = useCallback(() => {
    return (
      <LinkQRModal
        showLinkQRModal={showLinkQRModal}
        setShowLinkQRModal={setShowLinkQRModal}
        {...props}
      />
    );
  }, [showLinkQRModal, setShowLinkQRModal, props]);

  return useMemo(
    () => ({ LinkQRModal: LinkQRModalCallback, setShowLinkQRModal }),
    [LinkQRModalCallback, setShowLinkQRModal]
  );
}
