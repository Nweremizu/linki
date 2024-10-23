import { useQuery } from "@tanstack/react-query";
import api from "../axios";
import { useParams, useSearchParams } from "next/navigation";

export interface Workspace {
  id: string;
  name: string;
  slug: string;
  logo?: string;
  createdAt: Date;
  updatedAt: Date;
  usageLastChecked: Date;
}

export const useWorkspace = () => {
  let { slug } = useParams() as { slug: string | null };
  const searchParams = useSearchParams();
  if (!slug) {
    slug = searchParams.get("slug");
  }
  return useQuery({
    queryKey: ["workspaces", slug],
    queryFn: async () => {
      const { data } = await api.get(`/workspaces/${slug}`);
      return data.responseObject as Workspace;
    },
    enabled: !!slug,
    retry: 0,
  });
};
