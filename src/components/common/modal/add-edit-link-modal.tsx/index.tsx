/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogOverlay,
  DialogTitle,
} from "@/components/ui/dialog";
import { Logo } from "@/components/ui/icons/logo";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  UIEvent,
  useMemo,
  useState,
  useRef,
} from "react";
import { InfoTooltip, NormalTooltip } from "../../tooltips";
import { useMediaQuery } from "@/hooks/use-media-query";
import { Button } from "@/components/ui/button";
import slugify from "slugify";
import { useSession } from "next-auth/react";
import AlertCircleFill from "@/components/ui/icons/alert-circle-fill";
import { toast } from "sonner";
import { QueryClient } from "@tanstack/react-query";
import { LinkProps, LinkWithTagsProps } from "../../../../../types/link";
import { useWorkspace } from "@/lib/query/use-workspace";
import { DEFAULT_LINK_PROPS } from "@/lib/constants";
import { useRouterStuff } from "@/hooks/use-router-stuff";
import { getPrettyUrl, getUrlWithoutUTMParams } from "@/lib/utils/urls";
import { useDebounce } from "use-debounce";
import { LinkLogo } from "@/components/ui/link-logo";
import { TooltipProvider } from "@/components/ui/tooltip";
import { CustomInput } from "@/components/ui/input";
import { Lock, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { punycode } from "@/lib/utils/punycode";
import Random from "@/components/ui/icons/random";
import TagsSection from "./tag-section";
import UTMSection from "./utm-section";
import CommentsSection from "./comment-section";
import ExpirationSection from "./link-expiration";
import { LoadingCircle } from "@/components/ui/icons";
import { linkConstructor } from "@/lib/utils/link-constructor";
import { truncate } from "@/lib/utils/truncate";
import { useCreateLink, useUpdateLink } from "@/lib/query/links/use-link";
import { generateRandomLinkKey } from "@/lib/query/links/use-links";
import HideCom from "../../visually-hide-component";
import { QRcodePreview } from "./qr-code-preview";
import { Modal } from "@/components/ui/new-modal";

function AddEditLinkModal({
  showAddEditLinkModal,
  setShowAddEditLinkModal,
  prevLinkData,
  duplicateLinkData,
}: {
  showAddEditLinkModal: boolean;
  setShowAddEditLinkModal: Dispatch<SetStateAction<boolean>>;
  prevLinkData?: LinkWithTagsProps;
  duplicateLinkData?: LinkWithTagsProps;
}) {
  const params = useParams() as { slug?: string };
  const { slug } = params;
  const { data: session } = useSession();
  const { data: workspace } = useWorkspace();
  const [keyError, setKeyError] = useState<string | null>(null);
  const [urlError, setUrlError] = useState<string | null>(null);
  const [generatingRandomKey, setGeneratingRandomKey] = useState(false);
  const [saving, setSaving] = useState(false);
  const createLinkMutation = useCreateLink();
  const updateLinkMutation = useUpdateLink();

  const [data, setData] = useState<LinkWithTagsProps>(
    prevLinkData || duplicateLinkData || DEFAULT_LINK_PROPS
  );

  const { key, url } = data;
  const [generatingMetatags, setGeneratingMetatags] = useState(
    prevLinkData ? true : false
  );

  const [atBottom, setAtBottom] = useState(false);
  const handleScroll = useCallback((event: UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = event.currentTarget;
    if (Math.abs(scrollHeight - scrollTop - clientHeight) < 5) {
      setAtBottom(true);
    } else {
      setAtBottom(false);
    }
  }, []);
  const [debouncedUrl] = useDebounce(getUrlWithoutUTMParams(url), 500);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSaving(true);
    const link = {
      ...data,
      key: key,
      url: url,
      user: {
        id: session?.user?.id || "",
        name: session?.user?.name || "",
        image: session?.user?.image || "",
      },
    };
    try {
      await requestMutation.mutateAsync(link, {
        onSuccess: () => {
          toast.success(prevLinkData ? "Link updated" : "Link created");
          setShowAddEditLinkModal(false);
        },
        onError: () => {
          toast.error(
            prevLinkData ? "Failed to update link" : "Failed to create link"
          );
        },
      });
      setShowAddEditLinkModal(false);
    } catch (err) {
      console.error(err);
      toast.error(
        prevLinkData ? "Failed to update link" : "Failed to create link"
      );
    }
    setSaving(false);
  }

  useEffect(() => {
    if (showAddEditLinkModal && debouncedUrl.length > 0) {
      setData((prev) => ({
        ...prev,
        title: null,
        description: null,
        image: "",
      }));
      try {
        new URL(debouncedUrl);
        setGeneratingMetatags(true);
        // Fetch the URL metadata with the debounced URL
        fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/metatags?url=${debouncedUrl}`
        ).then(async (res) => {
          if (res.ok) {
            const data = await res.json();
            console.log(data);
            setData((prev) => ({
              ...prev,
              ...{
                title: truncate(data.title, 120),
                description: truncate(data.description, 250),
                image: data.image ?? "",
              },
            }));
          }

          setTimeout(() => setGeneratingMetatags(false), 200);
        });
      } catch (_) {}
    } else {
      setGeneratingMetatags(false);
    }
  }, [debouncedUrl, showAddEditLinkModal]);

  const saveDisabled = useMemo(() => {
    /* 
      Disable save if:
      - modal is not open
      - saving is in progress
      - key is invalid
      - url is invalid
      - for an existing link, there's no changes
    */
    if (
      !showAddEditLinkModal ||
      saving ||
      keyError ||
      urlError ||
      (prevLinkData &&
        Object.entries(prevLinkData).every(([key, value]) => {
          // If the key is "title" or "description" and proxy is not enabled, return true (skip the check)
          if (key === "title" || key === "description" || key === "image") {
            return true;
          }
          // Otherwise, check for discrepancy in the current key-value pair
          return (data as any)[key] === value;
        }))
    ) {
      return true;
    } else {
      return false;
    }
  }, [showAddEditLinkModal, saving, keyError, urlError, prevLinkData, data]);

  const randomIdx = Math.floor(Math.random() * 100);

  const generateRandomKey = useCallback(() => {
    setGeneratingRandomKey(true);
    generateRandomLinkKey(workspace?.id as string)
      .then((key) => {
        console.log(key);
        setData((prev) => ({ ...prev, key }));
        setGeneratingRandomKey(false);
      })
      .catch(() => {
        toast.error("Failed to generate a random key");
      })
      .finally(() => {
        setGeneratingRandomKey(false);
      });
  }, [workspace?.id]);

  const [lockKey, setLockKey] = useState(true);

  const keyRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (key?.endsWith("-copy")) {
      keyRef.current?.select();
    }
  }, []);

  const requestMutation = prevLinkData
    ? updateLinkMutation
    : createLinkMutation;

  const { isMobile } = useMediaQuery();

  const searchParams = useSearchParams();
  const { queryParams } = useRouterStuff();
  return (
    <Modal
      showModal={showAddEditLinkModal}
      setShowModal={setShowAddEditLinkModal}
      className="max-w-screen-lg"
      onClose={() => {
        console.log("onClose");
      }}
    >
      <div className="flex flex-col items-start gap-2 px-6 py-4 md:flex-row md:items-center md:justify-between border-b border-neutral-200">
        <div className="flex w-full items-center justify-between gap-2">
          <div className="flex items-center gap-2 ml-8">
            <LinkLogo
              apexDomain={getPrettyUrl(debouncedUrl)}
              className="size-6 sm:size-6 [&>*]:size-3 sm:[&>*]:size-4"
            />
            <h3 className="!mt-0 max-w-sm truncate text-lg font-medium">
              {prevLinkData
                ? `Edit ${linkConstructor({
                    key: prevLinkData.key,
                    pretty: true,
                  })}`
                : "Create a new link"}
            </h3>
          </div>
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => {
                setShowAddEditLinkModal(false);
              }}
              className="group hidden rounded-full p-2 text-neutral-500 transition-all duration-75 hover:bg-neutral-100 focus:outline-none active:bg-neutral-200 md:block"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
      <form onSubmit={handleSubmit}>
        <div
          className={cn(
            "grid w-full gap-y-6 max-md:overflow-auto md:grid-cols-[2fr_1fr] px-4",
            "max-md:max-h-[calc(100dvh-200px)] max-md:min-h-[min(510px,_calc(100dvh-200px))]",
            "md:[&>div]:max-h-[calc(100dvh-200px)] md:[&>div]:min-h-[min(510px,_calc(100dvh-200px))]"
          )}
        >
          <div className="scrollbar-hide px-6 md:overflow-auto">
            <div className="flex min-h-full flex-col gap-6 py-4">
              <div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <label
                      htmlFor={`url-${randomIdx}`}
                      className="block text-sm font-medium text-gray-700"
                    >
                      Destination URL
                    </label>
                    {/* <TooltipProvider delayDuration={100}> */}
                    <InfoTooltip content="The URL your users will get redirected to when they visit your short link." />
                    {/* </TooltipProvider> */}
                  </div>
                  <div className="animate-text-appear text-xs font-normal text-gray-500">
                    press <strong>Enter</strong> ↵ to submit
                  </div>
                </div>
                <div className="relative mt-2 flex rounded-md shadow-sm">
                  <CustomInput
                    name="url"
                    id={`url-${randomIdx}`}
                    required={key !== "_root"}
                    placeholder="http://localhost:3000/app/acme"
                    value={url}
                    className="rounded-md"
                    autoFocus={!key && !isMobile}
                    onChange={(e) => {
                      setUrlError(null);
                      setData({ ...data, url: e.target.value });
                    }}
                    aria-invalid="true"
                  />
                  {urlError && (
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                      <AlertCircleFill
                        className="h-5 w-5 text-red-500"
                        aria-hidden="true"
                      />
                    </div>
                  )}
                </div>
              </div>
              {key !== "_root" && (
                <div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <label
                        htmlFor={`key-${randomIdx}`}
                        className="block text-sm font-medium text-gray-700"
                      >
                        Short Link
                      </label>
                    </div>
                    <div className="animate-text-appear flex gap-2">
                      <TooltipProvider>
                        <NormalTooltip content={"Generate a random key"}>
                          <button
                            type="button"
                            onClick={generateRandomKey}
                            aria-disabled={generatingRandomKey}
                            className="flex h-6 items-center space-x-2 text-sm text-gray-500 transition-all duration-75 hover:text-black active:scale-95"
                          >
                            {generatingRandomKey ? (
                              <LoadingCircle className="h-3 w-3" />
                            ) : (
                              <Random className="h-3 w-3" />
                            )}
                          </button>
                        </NormalTooltip>
                      </TooltipProvider>
                      {prevLinkData && (
                        <button
                          className="flex h-6 items-center space-x-2 text-sm text-gray-500 transition-all duration-75 hover:text-black active:scale-95"
                          type="button"
                          onClick={() => {
                            window.confirm(
                              "Editing an existing short link could potentially break existing links. Are you sure you want to continue?"
                            ) && setLockKey(false);
                          }}
                        >
                          <Lock className="h-3 w-3" />
                        </button>
                      )}
                    </div>
                  </div>
                  <div className="relative mt-1 flex rounded-md shadow-sm">
                    <div>
                      <div
                        className={cn(
                          "max-w-[12rem] py-2 !rounded-l-md border border-r-0 border-gray-300 bg-gray-50 pl-4 pr-8 text-gray-500 focus:border-gray-300 focus:outline-none focus:ring-0 sm:text-sm",
                          prevLinkData && lockKey && "cursor-not-allowed"
                        )}
                      >
                        {linkConstructor({ key: "", pretty: true })}
                      </div>
                    </div>
                    <CustomInput
                      ref={keyRef}
                      type="text"
                      name="key"
                      id={`key-${randomIdx}`}
                      pattern="[\p{L}\p{N}\p{Pd}\/\p{Emoji}]+"
                      onInvalid={(e) => {
                        e.currentTarget.setCustomValidity(
                          "Only letters, numbers, '-', '/', and emojis are allowed."
                        );
                      }}
                      disabled={prevLinkData && lockKey}
                      autoComplete="off"
                      className={cn(
                        "block w-full rounded-r-md border-gray-300 text-gray-900 placeholder-gray-400 focus:border-gray-500 focus:outline-none focus:ring-gray-500 sm:text-sm",
                        {
                          "border-red-300 pr-10 text-red-900 placeholder-red-300 focus:border-red-500 focus:ring-red-500":
                            keyError,
                          "border-amber-300 pr-10 text-amber-900 placeholder-amber-300 focus:border-amber-500 focus:ring-amber-500":
                            key.length > 10,
                          "cursor-not-allowed border border-gray-300 bg-gray-100 text-gray-500":
                            prevLinkData && lockKey,
                        }
                      )}
                      placeholder="(optional)"
                      value={punycode(key)}
                      aria-invalid="true"
                      aria-describedby="key-error"
                      onChange={(e) => {
                        setKeyError(null);
                        e.currentTarget.setCustomValidity("");
                        setData({
                          ...data,
                          key: e.target.value.replace(" ", "-"),
                        });
                      }}
                    />
                  </div>
                </div>
              )}
              {/* Divider */}
              <div className="relative pb-1 pt-5 w-full">
                <div
                  className="absolute inset-0 flex w-full items-center "
                  aria-hidden="true"
                >
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center">
                  <span className="-translate-y-1 bg-gray-50 px-2 text-sm text-gray-500 border border-gray-300 rounded-md">
                    Optional
                  </span>
                </div>
              </div>

              <div className="grid gap-5">
                <TagsSection data={data} setData={setData} demoTags={tags} />
                <CommentsSection
                  prevLinkData={prevLinkData}
                  data={data}
                  // @ts-ignore
                  setData={setData}
                />
                <UTMSection
                  data={data}
                  setData={setData}
                  prevLinkData={prevLinkData}
                />
                <ExpirationSection
                  data={data}
                  // @ts-ignore
                  setData={setData}
                  prevLinkData={prevLinkData}
                />
              </div>
            </div>
          </div>
          <div className="scrollbar-hide px-6 md:overflow-auto md:pl-0 md:pr-4 pt-4">
            <div className="relative">
              <div className="absolute inset-0 rounded-xl border border-neutral-200 bg-white [mask-image:linear-gradient(to_bottom,black,transparent)]"></div>
              <div className="relative flex flex-col gap-6 p-4">
                <QRcodePreview shortUrlLink={data.key} />
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end gap-2 border-t border-neutral-100 bg-neutral-50 p-4">
          <div
            className={`${
              atBottom ? "" : "md:shadow-[0_-20px_30px_-10px_rgba(0,0,0,0.1)]"
            } z-10 bg-gray-50 px-4  transition-all`}
          >
            <Button disabled={saveDisabled} loading={saving}>
              {prevLinkData ? "Save changes" : "Create link"}
            </Button>
          </div>
        </div>
      </form>
    </Modal>
  );
}

const tags = [
  { id: "dfhdjdfd", name: "Tag 1", color: "red" as const, count: 1 },
  { id: "dfh4jdfd", name: "Tag 2", color: "yellow" as const, count: 1 },
  { id: "5fhdjdfd", name: "Tag 3", color: "green" as const, count: 1 },
  { id: "dfhd34dfd", name: "Tag 4", color: "blue" as const, count: 1 },
  { id: "dfh5jdfd", name: "Tag 5", color: "purple" as const, count: 1 },
  { id: "dfhdj9fd", name: "Tag 6", color: "brown" as const, count: 1 },
];

function AddEditLinkButton({
  setShowAddEditLinkModal,
}: {
  setShowAddEditLinkModal: Dispatch<SetStateAction<boolean>>;
}) {
  //   const { nextPlan, exceededLinks } = useWorkspace();
  const { queryParams } = useRouterStuff();

  return (
    <Button onClick={() => setShowAddEditLinkModal(true)}>Create link</Button>
  );
}

export function useAddEditLinkModal({
  props,
  duplicateProps,
}: {
  props?: LinkWithTagsProps;
  duplicateProps?: LinkWithTagsProps;
} = {}) {
  const [showAddEditLinkModal, setShowAddEditLinkModal] = useState(false);

  const AddEditLinkModalCallback = useCallback(() => {
    return (
      <AddEditLinkModal
        showAddEditLinkModal={showAddEditLinkModal}
        setShowAddEditLinkModal={setShowAddEditLinkModal}
        prevLinkData={props}
        duplicateLinkData={duplicateProps}
      />
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showAddEditLinkModal, setShowAddEditLinkModal]);

  const AddEditLinkButtonCallback = useCallback(() => {
    return (
      <AddEditLinkButton setShowAddEditLinkModal={setShowAddEditLinkModal} />
    );
  }, [setShowAddEditLinkModal]);

  return useMemo(
    () => ({
      showAddEditLinkModal,
      setShowAddEditLinkModal,
      AddEditLinkModal: AddEditLinkModalCallback,
      AddEditLinkButton: AddEditLinkButtonCallback,
    }),
    [
      showAddEditLinkModal,
      setShowAddEditLinkModal,
      AddEditLinkModalCallback,
      AddEditLinkButtonCallback,
    ]
  );
}
