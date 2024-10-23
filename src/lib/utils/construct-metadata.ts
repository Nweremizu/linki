import { Metadata } from "next";
import { HOME_DOMAIN } from "../constants";

export function constructMetadata({
  title = `${process.env.NEXT_PUBLIC_APP_NAME} - Link Management for Modern Teams`,
  description = `${process.env.NEXT_PUBLIC_APP_NAME} is the open-source link management platform for modern teams to create marketing campaigns, link sharing features, and referral programs.`,
  image = "./thumbnail.png",
  video,
  canonicalUrl,
  noIndex = false,
}: {
  title?: string;
  description?: string;
  image?: string | null;
  video?: string | null;
  canonicalUrl?: string;
  noIndex?: boolean;
} = {}): Metadata {
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      ...(image && {
        images: image,
      }),
      ...(video && {
        videos: video,
      }),
    },
    twitter: {
      title,
      description,
      ...(image && {
        card: "summary_large_image",
        images: [image],
      }),
      ...(video && {
        player: video,
      }),
      creator: "@linkidotme",
    },
    metadataBase: new URL(HOME_DOMAIN),
    ...(canonicalUrl && {
      alternates: {
        canonical: canonicalUrl,
      },
    }),
    ...(noIndex && {
      robots: {
        index: false,
        follow: false,
      },
    }),
  };
}
