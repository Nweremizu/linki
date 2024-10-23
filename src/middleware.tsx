import { withAuth } from "next-auth/middleware";
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import { getUserViaToken } from "./lib/utils/getUserViaToken";
import { getdefaultWorkspace } from "./lib/query/fetch-default-workspace";

export default withAuth(
  async function middleware(req) {
    const { pathname } = req.nextUrl;
    const searchParams = req.nextUrl.searchParams.toString();
    const searchParamsString =
      searchParams.length > 0 ? `?${searchParams}` : "";
    const fullPath = `${pathname}${searchParamsString}`;
    const user = await getUserViaToken(req);
    console.debug(pathname);
    if (pathname === "/") {
      return NextResponse.next();
    }

    if (
      !user &&
      pathname !== "/login" &&
      pathname !== "/register" &&
      !pathname.startsWith("/auth/reset-password/")
    ) {
      console.log(user);
      return NextResponse.redirect(
        new URL(
          `/login${
            pathname === "/" ? "" : `?next=${encodeURIComponent(fullPath)}`
          }`,
          req.url
        )
      );
    } else if (user) {
      if (
        user &&
        user.createdAt &&
        new Date(user.createdAt).getTime() > Date.now() - 10000 &&
        pathname !== "/welcome"
      ) {
        return NextResponse.redirect(new URL("/welcome", req.url));
      } else if (
        [
          "/dashboard",
          "/app",
          "/login",
          "/register",
          "/analytics",
          "/events",
          "/integrations",
          "/domains",
          "/settings",
        ].includes(pathname) ||
        pathname.startsWith("/integrations/") ||
        pathname.startsWith("/settings/")
      ) {
        const { defaultWorkspace } = await getdefaultWorkspace(
          user.id,
          user.accessToken
        );

        const defaultWorkspaceSlug = defaultWorkspace
          ? defaultWorkspace
          : user?.defaultWorkspace;

        if (defaultWorkspaceSlug) {
          let redirectPath = pathname;
          if (
            ["/login", "/register", "/app", "/dashboard"].includes(pathname)
          ) {
            redirectPath = "";
          } else if (
            pathname === "/integrations" ||
            pathname.startsWith("/integrations/")
          ) {
            redirectPath = `/settings/${pathname}`;
          }
          return NextResponse.redirect(
            new URL(
              `/app/${defaultWorkspaceSlug}${redirectPath}${searchParamsString}`,
              req.url
            )
          );
        } else {
          return NextResponse.redirect(new URL("/app/workspaces", req.url));
        }
      }
    }

    const token = await getToken({
      req,
      secret: process.env.NEXTAUTH_SECRET,
    });

    if (token && Date.now() >= token.data.validity.refresh_until * 1000) {
      // if the access token is expired, redirect to the login page
      const response = NextResponse.redirect(new URL("/login", req.url));
      // Clear the session cookies
      response.cookies.set("next-auth.session-token", "", { maxAge: 0 });
      response.cookies.set("next-auth.csrf-token", "", { maxAge: 0 });
      return response;
    }
    // If the user is authenticated, return the next response
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => {
        return !!token;
      },
    },
    pages: {
      signIn: "/login",
      error: "/login",
    },
  }
);

// Authenticate all routes except for /api, /_next/static, /_next/image, .png files and / (root) paths
export const config = {
  unstable_allowDynamics: ["/lib/query/fetch-default-workspace.tsx"],
  matcher: [
    "/((?!$|api|forgot-password|register$|reset-password|invite|_next|proxy|assets|static|vercel).*)",
  ],
};
