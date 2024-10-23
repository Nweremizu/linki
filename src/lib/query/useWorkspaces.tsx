import { useQuery } from "@tanstack/react-query";
import api from "../axios";

export interface Workspace {
  project: {
    id: string;
    name: string;
    slug: string;
    logo?: string;
    createdAt: Date;
    updatedAt: Date;
    usageLastChecked: Date;
  };
}

export const useWorkspaces = (userId: string) => {
  return useQuery({
    queryKey: ["workspaces", userId],
    queryFn: async () => {
      const { data } = await api.get(`/workspaces/user/${userId}`);
      return data.responseObject as Workspace[];
    },
    enabled: !!userId,
    retry: 0,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: true,
  });
};
