// import { withAuth } from "next-auth/middleware";
import { parse } from "./lib/middleware/parse";
import { APP_HOSTNAMES, DEFAULT_REDIRECTS } from "./lib/domain-constants";
import AppMiddleware from "./lib/middleware/app";
import { NextFetchEvent, NextRequest, NextResponse } from "next/server";
import LinkMiddleware from "./lib/middleware/link";

// export default withAuth(
export default async function middleware(req: NextRequest, ev: NextFetchEvent) {
  const { domain, key } = parse(req) as {
    domain: string;
    key: keyof typeof DEFAULT_REDIRECTS;
  };
  // console.log(domain);

  if (APP_HOSTNAMES.has(domain)) {
    return AppMiddleware(req);
  }

  if (domain === "linki.sh" && DEFAULT_REDIRECTS[key]) {
    return NextResponse.redirect(DEFAULT_REDIRECTS[key]);
  }

  return LinkMiddleware(req, ev);
}
// {
//   callbacks: {
//     authorized: ({ token }) => !!token,
//   },
//   pages: {
//     signIn: "/login",
//     error: "/login",
//   },
// }
// );

export const config = {
  unstable_allowDynamics: ["/lib/query/fetch-default-workspace.tsx"],
  matcher: [
    "/((?!$|api|forgot-password|register$|reset-password|invite|_next|proxy|assets|static|vercel).*)",
  ],
};
