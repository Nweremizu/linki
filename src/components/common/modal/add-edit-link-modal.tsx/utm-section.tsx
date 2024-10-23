import {
  constructURLFromUTMParams,
  getParamsFromURL,
  getUrlWithoutUTMParams,
  paramsMetadata,
  UTMTags,
} from "@/lib/utils/urls";
import { motion } from "framer-motion";
import { Dispatch, SetStateAction, useEffect, useMemo, useState } from "react";
import { LinkWithTagsProps } from "@/types/link";
import { FADE_IN_ANIMATION_SETTINGS } from "@/lib/utils/framer-motion";
import { InfoTooltip } from "../../tooltips";
import { Switch } from "@/components/ui/switch";

export default function UTMSection({
  prevLinkData,
  data,
  setData,
}: {
  prevLinkData?: LinkWithTagsProps;
  data: LinkWithTagsProps;
  setData: Dispatch<SetStateAction<LinkWithTagsProps>>;
}) {
  const { url } = data;
  const isValidUrl = useMemo(() => {
    try {
      new URL(url);
      return true;
    } catch (e) {
      return false;
    }
  }, [url]);

  const params = useMemo(() => {
    return getParamsFromURL(url);
  }, [url]);

  const [enabled, setEnabled] = useState(
    paramsMetadata.some((param) => params[param.key])
  );

  useEffect(() => {
    if (enabled) {
      // if enabled, add all params from props if exists and it's still the same url
      setData({
        ...data,
        // if the url is the same, keep the previous utm params
        url:
          prevLinkData?.url &&
          getUrlWithoutUTMParams(prevLinkData?.url) ===
            getUrlWithoutUTMParams(url)
            ? prevLinkData?.url
            : url,
      });
    } else {
      // if disabled, remove all utm params
      setData({
        ...data,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ...UTMTags.reduce((acc: { [key: string]: any }, tag) => {
          acc[tag] = null;
          return acc;
        }, {}),
        url: getUrlWithoutUTMParams(url),
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled]);

  return (
    <div className="relative border-b border-gray-200 pb-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center justify-between space-x-2">
          <h2 className="text-sm font-medium text-gray-900">UTM Builder</h2>
          <InfoTooltip
            content={
              "Add UTM parameters to your short links for conversion tracking."
            }
          />
        </div>
        <Switch onCheckedChange={setEnabled} checked={enabled} />
      </div>
      {enabled && (
        <motion.div className="mt-3 grid gap-2" {...FADE_IN_ANIMATION_SETTINGS}>
          {paramsMetadata.map(({ display, key, examples }) => (
            <div key={key} className="relative mt-1 flex rounded-md shadow-sm">
              <span className="flex w-60 items-center justify-center whitespace-nowrap rounded-l-md py-1.5 border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm">
                {display}
              </span>
              <input
                type="text"
                name={key}
                id={key}
                disabled={!isValidUrl}
                className={`${
                  isValidUrl ? "" : "cursor-not-allowed bg-gray-100"
                } block w-full rounded-r-md border-gray-300 text-gray-900 p-1.5 border placeholder-gray-400 focus:border-gray-500 focus:outline-none focus:ring-gray-500 sm:text-sm`}
                placeholder={examples}
                value={params[key] || ""}
                onChange={(e) => {
                  setData({
                    ...data,
                    [key]: e.target.value,
                    url: constructURLFromUTMParams(url, {
                      ...params,
                      [key]: e.target.value,
                    }),
                  });
                }}
              />
            </div>
          ))}
        </motion.div>
      )}
    </div>
  );
}
