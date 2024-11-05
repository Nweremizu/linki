import { NextRequest } from "next/server";
import { parse } from "./parse";
import { getUserViaToken } from "../utils/getUserViaToken";
// import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import { getdefaultWorkspace } from "../query/fetch-default-workspace";

const ROOT_PATH = "/";
const PUBLIC_PATHS = ["/login", "/register"];
const REDIRECT_PATHS = [
  "/dashboard",
  "/app",
  "/analytics",
  "/events",
  "/integrations",
  "/domains",
  "/settings",
];

export default async function AppMiddleware(req: NextRequest) {
  const { path, searchParamsString } = parse(req);
  const user = await getUserViaToken(req);

  const redirectToLogin = () =>
    NextResponse.redirect(
      new URL(
        `/login${
          path === ROOT_PATH
            ? ""
            : `?next=${encodeURIComponent(
                path + (searchParamsString ? `?${searchParamsString}` : "")
              )}`
        }`,
        req.url
      )
    );

  if (path === ROOT_PATH) return NextResponse.next();

  if (
    !user &&
    !PUBLIC_PATHS.includes(path) &&
    !path.startsWith("/auth/reset-password")
  ) {
    return redirectToLogin();
  }

  if (user) {
    const isNewUser = new Date(user.createdAt).getTime() > Date.now() - 10000;
    if (isNewUser && path !== "/welcome")
      return NextResponse.redirect(new URL("/welcome", req.url));

    if (REDIRECT_PATHS.includes(path) || path.startsWith("/settings")) {
      const { defaultWorkspace } = await getdefaultWorkspace(
        user.id,
        user.accessToken
      );
      const workspaceSlug = defaultWorkspace || user.defaultWorkspace;

      if (workspaceSlug) {
        // const redirectPath = path.includes("/integrations")
        //   ? `/settings/${path}`
        //   : path;
        return NextResponse.redirect(
          new URL(
            `/app/${workspaceSlug}${
              searchParamsString ? `?${searchParamsString}` : ""
            }`,
            req.url
          )
        );
      } else {
        return NextResponse.redirect(new URL("/app/workspaces", req.url));
      }
    }
  }

  // const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  // if (token && Date.now() >= token.data.validity.refresh_until * 1000) {
  //   const response = NextResponse.redirect(new URL("/login", req.url));
  //   response.cookies.set("next-auth.session-token", "", { maxAge: 0 });
  //   response.cookies.set("next-auth.csrf-token", "", { maxAge: 0 });
  //   return response;
  // }

  return NextResponse.next();
}
