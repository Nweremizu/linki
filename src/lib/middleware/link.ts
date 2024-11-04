/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFetchEvent, NextRequest, NextResponse } from "next/server";
import { parse } from "./parse";
import { cookies } from "next/headers";
import { nanoid } from "../utils/nanoid";
import { getLinkMetadata } from "./get-link-meta";
import { createResponseWithCookie } from "./create-response-cookie";
import { getFinalUrl } from "../utils/get-final-urls";
import { recordLink } from "./record-link";

export default async function LinkMiddleware(
  req: NextRequest,
  ev: NextFetchEvent
) {
  // eslint-disable-next-line prefer-const
  let { domain, fullKey: originalKey } = parse(req);

  if (!domain) {
    return NextResponse.next();
  }

  //   console.log(link);

  const cookieStore = cookies();
  let clickId =
    cookieStore.get("linki_id")?.value || cookieStore.get("dclid")?.value;

  const link = await getLinkMetadata(originalKey, clickId ? true : false);
  if (!clickId) {
    clickId = nanoid(16);
  }

  ev.waitUntil(
    recordLink({
      req,
      linkId: link.id,
      clickId,
      url: link.url,
      workspace_id: link.projectId,
    })
  );

  return createResponseWithCookie(
    NextResponse.redirect(
      getFinalUrl(link.url, {
        req,
        clickId: undefined,
      })
    ),
    { clickId, path: `/${originalKey}` }
  );
}
