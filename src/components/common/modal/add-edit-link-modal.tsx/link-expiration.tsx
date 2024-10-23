import { LinkProps } from "@/types/link";
import {
  formatDateTime,
  getDateTimeLocal,
  parseDateTime,
} from "@/lib/utils/datetime";
import { FADE_IN_ANIMATION_SETTINGS } from "@/lib/utils/framer-motion";
import { motion } from "framer-motion";
import { InfoTooltip } from "../../tooltips";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { Switch } from "@/components/ui/switch";

export default function ExpirationSection({
  prevLinkData,
  data,
  setData,
}: {
  prevLinkData?: LinkProps;
  data: LinkProps;
  setData: Dispatch<SetStateAction<LinkProps>>;
}) {
  const inputRef = useRef<HTMLInputElement>(null);

  const { expiresAt } = data;
  const [enabled, setEnabled] = useState(!!expiresAt);
  useEffect(() => {
    if (enabled) {
      // if enabling, add previous expiration date if exists
      setData({
        ...data,
        expiresAt: prevLinkData?.expiresAt || expiresAt,
      });
    } else {
      // if disabling, remove expiration date and expired URL
      setData({ ...data, expiresAt: undefined });
    }
  }, [enabled]);

  return (
    <div className="relative border-b border-gray-200 pb-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center justify-between space-x-2">
          <h2 className="text-sm font-medium text-gray-900">Link Expiration</h2>
          <InfoTooltip content="Set an expiration date for your links – after which it won't be accessible." />
        </div>
        <Switch onCheckedChange={setEnabled} checked={enabled} />
      </div>
      {enabled && (
        <motion.div className="mt-3" {...FADE_IN_ANIMATION_SETTINGS}>
          <div className="flex w-full items-center justify-between rounded-md border p-1.5 border-gray-300 bg-white shadow-sm transition-all focus-within:border-gray-800 focus-within:outline-none focus-within:ring-1 focus-within:ring-gray-500">
            <input
              ref={inputRef}
              type="text"
              placeholder='E.g. "tomorrow at 5pm" or "in 2 hours"'
              defaultValue={expiresAt ? formatDateTime(expiresAt) : ""}
              onBlur={(e) => {
                if (e.target.value.length > 0) {
                  const parsedDateTime = parseDateTime(e.target.value);
                  if (parsedDateTime) {
                    setData({ ...data, expiresAt: parsedDateTime });
                    e.target.value = formatDateTime(parsedDateTime);
                  }
                }
              }}
              className="flex-1 border-none bg-transparent text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-0 sm:text-sm"
            />
            <input
              type="datetime-local"
              id="expiresAt"
              name="expiresAt"
              value={expiresAt ? getDateTimeLocal(expiresAt) : ""}
              onChange={(e) => {
                const expiryDate = new Date(e.target.value);
                setData({ ...data, expiresAt: expiryDate });
                if (inputRef.current) {
                  inputRef.current.value = formatDateTime(expiryDate);
                }
              }}
              className="w-[40px] border-none bg-transparent text-gray-500 focus:outline-none focus:ring-0 sm:text-sm"
            />
          </div>
        </motion.div>
      )}
    </div>
  );
}
