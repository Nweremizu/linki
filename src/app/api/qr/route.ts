import { ImageResponse } from "next/og";
import { NextRequest, NextResponse } from "next/server";
import { QRCodeSVG } from "@/lib/qr/utils";

export const runtime = "edge";

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
};

export async function GET(req: NextRequest) {
  try {
    const params = {} as Record<string, string>;
    new URL(req.url).searchParams.forEach((value, key) => {
      params[key] = value;
    });

    const { url, hideLogo, fgColor } = params;

    if (typeof url !== "string") {
      return NextResponse.json({ error: "Invalid URL" }, { status: 400 });
    }

    const size = 600;
    return new ImageResponse(
      QRCodeSVG({
        value: `${url}?qr=1`,
        size: 600,
        fgColor: `#${fgColor || "000000"}`,
        logo: "/assets/logo_mini.svg",
        margin: 4,
        ...(!hideLogo
          ? {
              imageSettings: {
                src: "/assets/logo_mini.svg",
                height: size / 4,
                width: size / 4,
                excavate: true, // Remove the white background from the logo
              },
            }
          : {}),
        isOGContext: true,
      }),
      {
        width: size,
        height: size,
        headers: CORS_HEADERS,
      }
    );
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}

export function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: CORS_HEADERS,
  });
}
