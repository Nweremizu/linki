import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { TagProps } from "@/types/link";
import { useWorkspace } from "../use-workspace";
import api from "@/lib/axios";

const getTagsFetcher = async ({
  workspaceId,
}: {
  workspaceId: string;
}): Promise<TagProps[]> => {
  try {
    const { data } = await api.get(`/workspaces/${workspaceId}/tags`);
    return data.responseObject as TagProps[];
  } catch (error) {
    console.error(error);
    return [];
  }
};

const getTagsWithCountFetcher = async ({
  workspaceId,
}: {
  workspaceId: string;
}): Promise<TagProps[]> => {
  try {
    const { data } = await api.get(`/workspaces/${workspaceId}/tags/count`);
    return data.responseObject as TagProps[];
  } catch (error) {
    console.error(error);
    return [];
  }
};

const addTagFetcher = async ({
  workspaceId,
  tag,
}: {
  workspaceId: string;
  tag: Partial<TagProps>;
}): Promise<TagProps | null> => {
  try {
    const { data } = await api.post(`/workspaces/${workspaceId}/tag`, tag);
    return data.responseObject as TagProps;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export function useTags() {
  const { data: workspace } = useWorkspace();
  return useQuery({
    queryKey: ["tags", { workspaceId: workspace?.id }],
    queryFn: () => getTagsFetcher({ workspaceId: workspace?.id as string }),
    enabled: !!workspace?.id,
  });
}

export function useAddTag() {
  const { data: workspace } = useWorkspace();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (tag: Partial<TagProps>) =>
      addTagFetcher({ workspaceId: workspace?.id as string, tag }),
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["tags", { workspaceId: workspace?.id }],
      });
      queryClient.invalidateQueries({
        queryKey: ["tagsCount", { workspaceId: workspace?.id }],
      });
    },
  });
}

export function useTagsWithCount() {
  const { data: workspace } = useWorkspace();
  return useQuery({
    queryKey: ["tagsCount", { workspaceId: workspace?.id }],
    queryFn: () =>
      getTagsWithCountFetcher({ workspaceId: workspace?.id as string }),
    enabled: !!workspace?.id,
  });
}
