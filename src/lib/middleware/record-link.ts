/* eslint-disable @typescript-eslint/no-explicit-any */
import { geolocation, ipAddress } from "@vercel/functions";
import { LOCALHOST_GEO_DATA, LOCALHOST_IP } from "../constants/localhost";
import { userAgent } from "next/server";
import { getIdentityHash } from "../utils/get-identity-hash";
import { getFinalUrlForRecordClick } from "../utils/get-final-urls";

// Helper function for building click data
const buildClickData = async ({
  req,
  linkId,
  clickId,
  url,
  workspace_id,
}: {
  req: Request;
  linkId: string;
  clickId: string;
  url: string;
  workspace_id: string;
}) => {
  const isProduction = process.env.VERCEL === "1";
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const searchParams = new URL(req.url).searchParams;

  const ip = isProduction ? ipAddress(req) : LOCALHOST_IP;
  const continent = isProduction
    ? req.headers.get("x-vercel-ip-continent") || ""
    : LOCALHOST_GEO_DATA.continent;
  const geo = isProduction ? geolocation(req) : LOCALHOST_GEO_DATA;
  const ua = userAgent(req);

  return {
    timestamp: new Date().toISOString(),
    identity_hash: await getIdentityHash(req),
    link_id: linkId,
    click_id: clickId,
    url: url ? getFinalUrlForRecordClick({ req, url }) : "",
    ip: typeof ip === "string" && ip.trim() ? ip : "",
    continent,
    country: geo.country || "Unknown",
    city: geo.city || "Unknown",
    region: geo.region || "Unknown",
    latitude: geo.latitude || "0",
    longitude: geo.longitude || "0",
    device: ua.device.type || "Desktop",
    device_vendor: ua.device.vendor || "Unknown",
    device_model: ua.device.model || "Unknown",
    referer: req.headers.get("referer") || "(direct)",
    referer_url: req.headers.get("referer") || "(direct)",
    browser: ua.browser.name || "Unknown",
    browser_version: ua.browser.version || "Unknown",
    engine: ua.engine.name || "Unknown",
    engine_version: ua.engine.version || "Unknown",
    os: ua.os.name || "Unknown",
    os_version: ua.os.version || "Unknown",
    cpu_architecture: ua.cpu?.architecture || "Unknown",
    ua: ua.ua || "Unknown",
    workspace_id,
  };
};

// Helper function for sending click data
const sendClickData = async (clickData: any) => {
  try {
    const response = await fetch(
      `${process.env.TINYBIRD_API_URL}/v0/events?name=click_event&wait=true`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.TINYBIRD_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(clickData),
      }
    );

    // Log response status and text for debugging
    const responseText = await response.text();
    if (!response.ok) {
      console.error(`Error with response status: ${response.status}`);
      console.error("Response content:", responseText);
      throw new Error(`Request failed with status ${response.status}`);
    }

    // Try parsing as JSON only if the response was OK
    return JSON.parse(responseText);
  } catch (error: any) {
    console.error("Error sending click data:", error.message);
    console.error("Stack trace:", error.stack);
    throw error; // Re-throw the error for higher-level handling if needed
  }
};

// Main function
export async function recordLink({
  req,
  linkId,
  clickId,
  url,
  workspace_id,
}: {
  req: Request;
  linkId: string;
  clickId: string;
  url: string;
  workspace_id: string;
}) {
  const searchParams = new URL(req.url).searchParams;

  // Early return if tracking should be skipped
  if (req.headers.has("linki-no-track") || searchParams.has("linki-no-track")) {
    return null;
  }

  // Build click data
  const clickData = await buildClickData({
    req,
    linkId,
    clickId,
    url,
    workspace_id,
  });

  // Send click data and log response
  await sendClickData(clickData);
}
