export const APP_DOMAIN =
  process.env.NEXT_PUBLIC_VERCEL_ENV === "production"
    ? `https://app.${process.env.NEXT_PUBLIC_APP_DOMAIN}`
    : process.env.NEXT_PUBLIC_VERCEL_ENV === "preview"
    ? `https://preview.${process.env.NEXT_PUBLIC_APP_DOMAIN}`
    : "http://localhost:3000";

export const APP_HOSTNAMES = new Set([
  `app.${process.env.NEXT_PUBLIC_APP_DOMAIN}`,
  `preview.${process.env.NEXT_PUBLIC_APP_DOMAIN}`,
  "localhost:3000",
  "localhost",
]);

const BASE_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : "https://linki.co";
const APP_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : "https://app.linki.co";

export const DEFAULT_REDIRECTS = {
  home: BASE_URL,
  dub: BASE_URL,
  signin: `${APP_URL}/login`,
  login: `${APP_URL}/login`,
  register: `${APP_URL}/register`,
  signup: `${APP_URL}/register`,
  app: APP_URL,
  dashboard: APP_URL,
  links: `${APP_URL}/links`,
  settings: `${APP_URL}/settings`,
  welcome: `${APP_URL}/onboarding/welcome`,
  discord: "https://twitter.com/dubdotco", // placeholder for now
};
