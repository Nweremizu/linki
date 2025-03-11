export const CONTINENTS: { [key: string]: string } = {
  AF: "Africa",
  AN: "Antarctica",
  AS: "Asia",
  EU: "Europe",
  NA: "North America",
  OC: "Oceania",
  SA: "South America",
};

export const CONTINENT_CODES = Object.keys(CONTINENTS) as [string, ...string[]];

export const API_DOMAIN =
  process.env.NODE_ENV === "production"
    ? "https://linki-theta.vercel.app"
    : "http://localhost:3000";
