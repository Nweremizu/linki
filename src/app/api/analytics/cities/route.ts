// pages/api/fetch-countries-data.ts

import { ClickData } from "@/types/link";
import { NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";

type Data = ClickData[] | { error: string };

export async function GET(
  req: NextRequest,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _res: NextApiResponse<Data>
) {
  const searchParams = req.nextUrl.searchParams;
  const workspaceId = searchParams.get("workspaceId");

  if (!workspaceId || typeof workspaceId !== "string") {
    return NextResponse.json({ error: "Missing or invalid workspace ID" });
  }

  const url = new URL(
    `https://api.us-east.tinybird.co/v0/pipes/v1_cities.json?workId=${workspaceId}`
  );

  try {
    const response = await fetch(url.toString(), {
      headers: {
        Authorization: `Bearer ${
          process.env.TINYBIRD_API_CITIES_KEY as string
        }`,
      },
    });

    if (!response.ok) {
      throw new Error(`Error fetching data: ${response.statusText}`);
    }

    const result = await response.json();
    console.log(result);
    return NextResponse.json(result.data);
  } catch (error) {
    return NextResponse.error();
  }
}
