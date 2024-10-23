import { punycode } from "./punycode";

export function linkConstructor({
  key,
  pretty,
  searchParams,
}: {
  key?: string;
  pretty?: boolean;
  searchParams?: Record<string, string>;
}) {
  let url = `https://${punycode(process.env.NEXT_PUBLIC_APP_DOMAIN)}${
    key && key !== "_root" ? `/${punycode(key)}` : ""
  }`;

  if (searchParams) {
    const search = new URLSearchParams();
    for (const [key, value] of Object.entries(searchParams)) {
      search.set(key, value);
    }
    url += `?${search.toString()}`;
  }

  return pretty ? url.replace(/^https?:\/\//, "") : url;
}
