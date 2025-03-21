import { SHORT_DOMAIN } from "../constants";
import { NextRequest } from "next/server";

export const parse = (req: NextRequest) => {
  let domain = req.headers.get("host") as string;
  // remove www. from domain and convert to lowercase
  domain = domain.replace("www.", "").toLowerCase();
  if (domain === "linki.localhost:3000" || domain.startsWith("linkico")) {
    // for local development and preview URLs
    domain = SHORT_DOMAIN ?? "";
  }

  // path is the path of the URL (e.g. dub.sh/stats/github -> /stats/github)
  const path = req.nextUrl.pathname;

  // fullPath is the full URL path (along with search params)
  const searchParams = req.nextUrl.searchParams.toString();
  const searchParamsString = searchParams.length > 0 ? `?${searchParams}` : "";
  const fullPath = `${path}${searchParamsString}`;

  // Here, we are using decodeURIComponent to handle foreign languages like Hebrew
  const key = decodeURIComponent(path.split("/")[1]); // key is the first part of the path (e.g. dub.sh/stats/github -> stats)
  const fullKey = decodeURIComponent(path.slice(1)); // fullKey is the full path without the first slash (to account for multi-level subpaths, e.g. d.to/github/repo -> github/repo)

  return { domain, path, fullPath, key, fullKey, searchParamsString };
};
