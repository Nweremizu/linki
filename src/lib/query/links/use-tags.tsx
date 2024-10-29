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
  search,
}: {
  workspaceId: string;
  search?: string;
}): Promise<TagProps[]> => {
  try {
    const { data } = await api.get(
      `/workspaces/${workspaceId}/tags/count?search=${search}`
    );
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

const editTagFetcher = async ({
  workspaceId,
  tag,
}: {
  workspaceId: string;
  tag: Partial<TagProps>;
}): Promise<TagProps | null> => {
  try {
    const { data } = await api.post(
      `/workspaces/${workspaceId}/tag?edit=true`,
      tag
    );
    return data.responseObject as TagProps;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const deleteTagFetcher = async ({
  workspaceId,
  tagId,
}: {
  workspaceId: string;
  tagId: string;
}): Promise<boolean> => {
  try {
    const { data } = await api.delete(
      `/workspaces/${workspaceId}/tag/${tagId}`
    );
    return data.responseObject as boolean;
  } catch (error) {
    console.error(error);
    return false;
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

export function useEditTag() {
  const { data: workspace } = useWorkspace();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (tag: Partial<TagProps>) =>
      editTagFetcher({ workspaceId: workspace?.id as string, tag }),
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

export function useDeleteTag() {
  const { data: workspace } = useWorkspace();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (tagId: string) =>
      deleteTagFetcher({ workspaceId: workspace?.id as string, tagId }),
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

export function useTagsWithCount({ search }: { search?: string } = {}) {
  const { data: workspace } = useWorkspace();
  return useQuery({
    queryKey: ["tagsCount", { workspaceId: workspace?.id, search }],
    queryFn: () =>
      getTagsWithCountFetcher({ workspaceId: workspace?.id as string, search }),
    enabled: !!workspace?.id,
  });
}
