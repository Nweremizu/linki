/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../axios";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { User } from "next-auth";

export interface Workspace {
  id: string;
  name: string;
  slug: string;
  logo?: string;
  createdAt: Date;
  updatedAt: Date;
  usageLastChecked: Date;
}

const updateWorkspaceName = async (name: string, id: string) => {
  try {
    const { data } = await api.patch(`/workspaces/${id}/name`, { name });
    return data.responseObject as Workspace;
  } catch (err) {
    throw new Error((err as any).response.data.message);
  }
};

const updateWorkspaceSlug = async (slug: string, id: string) => {
  try {
    const { data } = await api.patch(`/workspaces/${id}/slug`, { slug });
    return data.responseObject as Workspace;
  } catch (err) {
    throw new Error((err as any).response.data.message);
  }
};

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
interface extendedUsers extends User {
  role: "owner" | "member" | "editor";
}

export const useWorkspaceUsers = (workspaceId: string) => {
  return useQuery({
    queryKey: ["workspaceusers", { workspaceId }],
    queryFn: async () => {
      const { data } = await api.get(`/workspaces/${workspaceId}/users`);
      return data.responseObject as extendedUsers[];
    },
    enabled: !!workspaceId,
    retry: 1,
  });
};

export const useUpdateWorkspaceName = () => {
  const queryClient = useQueryClient();
  const { data: session } = useSession();
  const { slug } = useParams() as { slug: string | null };
  return useMutation({
    mutationFn: async ({ id, name }: { id: string; name: string }) =>
      await updateWorkspaceName(name, id),
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["workspaces", slug],
      });
      queryClient.invalidateQueries({
        queryKey: ["workspaces", session?.user?.id],
      });
    },
  });
};

export const useUpdateWorkspaceSlug = () => {
  const queryClient = useQueryClient();
  const { data: session } = useSession();
  const { slug } = useParams() as { slug: string | null };
  return useMutation({
    mutationFn: async ({ id, newSlug }: { id: string; newSlug: string }) =>
      await updateWorkspaceSlug(newSlug, id),
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["workspaces", slug],
      });
      queryClient.invalidateQueries({
        queryKey: ["workspaces", session?.user?.id],
      });
    },
  });
};

export const useDeleteWorkspace = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { data: session } = useSession();
  const { slug } = useParams() as { slug: string | null };
  return useMutation({
    mutationFn: async ({ id }: { id: string }) =>
      await api.delete(`/workspaces/${id}?userId=${session?.user?.id}`),
    onSettled: () => {
      router.push("/app/workspaces");
      queryClient.invalidateQueries({
        queryKey: ["workspaces", slug],
      });
      queryClient.invalidateQueries({
        queryKey: ["workspaces", session?.user?.id],
      });
    },
  });
};
