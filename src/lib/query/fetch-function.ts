import { ClickData } from "@/types/link";

export const fetchTinyBirdData = async (workspaceId: string) => {
  const url = new URL(
    `https://api.us-east.tinybird.co/v0/pipes/v1_main_links.json?workId=${workspaceId}`
  );

  const response = await fetch(url, {
    headers: {
      Authorization: process.env.TINYBIRD_API_KEY as string,
    },
  });

  if (!response.ok) {
    throw new Error(`Error fetching data: ${response.statusText}`);
  }

  const result = await response.json();
  return result.data as ClickData[]; // Return only the data field, assuming this is needed.
};

export const fetchTinyBirdCountriesData = async (workspaceId: string) => {
  const url = new URL(
    `https://api.us-east.tinybird.co/v0/pipes/v1_countries.json?workId=${workspaceId}`
  );

  const response = await fetch(url, {
    headers: {
      Authorization: process.env.TINYBIRD_API_COUNTRIES_KEY as string,
    },
  });

  if (!response.ok) {
    throw new Error(`Error fetching data: ${response.statusText}`);
  }

  const result = await response.json();
  return result.data as ClickData[]; // Return only the data field, assuming this is needed.
};
