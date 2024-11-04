/* eslint-disable @typescript-eslint/no-explicit-any */
export const HOME_DOMAIN = `https://${process.env.NEXT_PUBLIC_APP_DOMAIN}`;
export const SHORT_DOMAIN = process.env.NEXT_PUBLIC_SHORT_DOMAIN;
export const GOOGLE_FAVICON_URL =
  "https://www.google.com/s2/favicons?sz=64&domain_url=";
export const DICEBEAR_AVATAR_URL =
  "https://api.dicebear.com/7.x/initials/svg?backgroundType=gradientLinear&fontFamily=Helvetica&fontSize=40&seed=";
export const DEFAULT_LINK_PROPS: any = {
  key: "",
  url: "",
  // domain: "",
  // archived: false,
  tags: [],

  title: null,
  description: null,
  image: null,
  video: null,
  // trackConversion: false,
  // proxy: false,
  // rewrite: false,
  expiresAt: null,
  password: null,
  // ios: null,
  // android: null,
  doIndex: false,

  clicks: 0,
  userId: "",
};

export const PAGINATION_LIMIT = 100;
