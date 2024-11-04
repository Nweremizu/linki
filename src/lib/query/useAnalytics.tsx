/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from "@tanstack/react-query";
import { useWorkspace } from "./use-workspace";
// import { CityClickData, ClickData, CountryClickData } from "@/types/link";

export const useTinyBirdData = () => {
  const { data: workspace } = useWorkspace();

  return useQuery({
    queryKey: ["analytics", workspace?.slug],
    queryFn: async () => {
      const response = await fetch(
        `/api/analytics?workspaceId=${workspace?.id}`
      );

      if (!response.ok) {
        throw new Error("Error fetching analytics data");
      }

      return (await response.json()) as any[];
    },
    refetchOnWindowFocus: true,
    staleTime: 2 * 60 * 1000,
    retry: 2,
  });
};

export const useTinyBirdCountriesData = () => {
  const { data: workspace } = useWorkspace();

  return useQuery({
    queryKey: ["analytics", "countries", workspace?.slug],
    queryFn: async () => {
      const response = await fetch(
        `/api/analytics/countries?workspaceId=${workspace?.id}`
      );

      if (!response.ok) {
        throw new Error("Error fetching countries data");
      }

      return (await response.json()) as any[];
    },
    refetchOnWindowFocus: true,
    staleTime: 2 * 60 * 1000,
    retry: 2,
  });
};

export const useTinyBirdCitiesData = () => {
  const { data: workspace } = useWorkspace();

  return useQuery({
    queryKey: ["analytics", "cities", workspace?.slug],
    queryFn: async () => {
      const response = await fetch(
        `/api/analytics/cities?workspaceId=${workspace?.id}`
      );

      if (!response.ok) {
        throw new Error("Error fetching cities data");
      }

      return (await response.json()) as any[];
    },
    refetchOnWindowFocus: true,
    staleTime: 2 * 60 * 1000,
    retry: 2,
  });
};

export const useTinyBirdContinentsData = () => {
  const { data: workspace } = useWorkspace();

  return useQuery({
    queryKey: ["analytics", "continents", workspace?.slug],
    queryFn: async () => {
      const response = await fetch(
        `/api/analytics/continents?workspaceId=${workspace?.id}`
      );

      if (!response.ok) {
        throw new Error("Error fetching cities data");
      }

      return (await response.json()) as any[];
    },
    refetchOnWindowFocus: true,
    staleTime: 2 * 60 * 1000,
    retry: 2,
  });
};

export const useTinyBirdBrowserData = () => {
  const { data: workspace } = useWorkspace();

  return useQuery({
    queryKey: ["analytics", "browsers", workspace?.slug],
    queryFn: async () => {
      const response = await fetch(
        `/api/analytics/browsers?workspaceId=${workspace?.id}`
      );

      if (!response.ok) {
        throw new Error("Error fetching browsers data");
      }

      return (await response.json()) as any[];
    },
    refetchOnWindowFocus: true,
    staleTime: 2 * 60 * 1000,
    retry: 2,
  });
};

export const useTinyBirdDeviceData = () => {
  const { data: workspace } = useWorkspace();

  return useQuery({
    queryKey: ["analytics", "devices", workspace?.slug],
    queryFn: async () => {
      const response = await fetch(
        `/api/analytics/devices?workspaceId=${workspace?.id}`
      );

      if (!response.ok) {
        throw new Error("Error fetching devices data");
      }

      return (await response.json()) as any[];
    },
    refetchOnWindowFocus: true,
    staleTime: 2 * 60 * 1000,
    retry: 2,
  });
};

export const useTinyBirdOsData = () => {
  const { data: workspace } = useWorkspace();

  return useQuery({
    queryKey: ["analytics", "os", workspace?.slug],
    queryFn: async () => {
      const response = await fetch(
        `/api/analytics/os?workspaceId=${workspace?.id}`
      );

      if (!response.ok) {
        throw new Error("Error fetching os data");
      }

      return (await response.json()) as any[];
    },
    refetchOnWindowFocus: true,
    staleTime: 2 * 60 * 1000,
    retry: 2,
  });
};
