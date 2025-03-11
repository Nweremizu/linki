// pages/api/fetch-data.ts

import type { NextApiResponse } from "next";
import { ClickData } from "@/types/link";
import { NextRequest, NextResponse } from "next/server";

type Data = ClickData[] | { error: string };

export async function GET(req: NextRequest, res: NextApiResponse<Data>) {
  const searchParams = req.nextUrl.searchParams;
  const workspaceId = searchParams.get("workspaceId");

  if (!workspaceId || typeof workspaceId !== "string") {
    return res.status(400).json({ error: "Missing or invalid workspace ID" });
  }

  const url = new URL(
    `https://api.us-east.tinybird.co/v0/pipes/click_event_pipe.json?workId=${workspaceId}`
  );

  try {
    const response = await fetch(url.toString(), {
      headers: {
        Authorization: `Bearer ${process.env.TINYBIRD_API_KEY as string}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Error fetching data: ${response.statusText}`);
    }

    const result = await response.json();
    return NextResponse.json(result.data as ClickData[]);
  } catch (error) {
    console.log(error);
    return NextResponse.error();
  }
}
