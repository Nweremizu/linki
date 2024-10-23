import { useMutation, useQueryClient } from "@tanstack/react-query";
import { LinkWithTagsProps } from "@/types/link";
import api from "@/lib/axios";
import { useWorkspace } from "../use-workspace";

// create a link
const createLinkFetcher = async (
  link: Partial<LinkWithTagsProps>,
  workspaceId: string
): Promise<LinkWithTagsProps | null> => {
  try {
    const { data } = await api.post(
      `/links/link?workspaceId=${workspaceId}`,
      link
    );
    return data.responseObject as LinkWithTagsProps;
  } catch (error) {
    console.error(error);
    return null;
  }
};

// update a link
const updateLinkFetcher = async (
  link: Partial<LinkWithTagsProps>,
  workspaceId: string
): Promise<LinkWithTagsProps | null> => {
  try {
    const { data } = await api.patch(
      `/links/${link.id}?workspaceId=${workspaceId}`,
      link
    );
    return data.responseObject as LinkWithTagsProps;
  } catch (error) {
    console.error(error);
    return null;
  }
};

// delete a link
const deleteLinkFetcher = async (linkId: string): Promise<boolean> => {
  try {
    await api.delete(`/links/${linkId}`);
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export function useCreateLink() {
  const queryClient = useQueryClient();
  const { data: workspace } = useWorkspace();
  return useMutation({
    mutationFn: (link: Partial<LinkWithTagsProps>) =>
      createLinkFetcher(link, workspace?.id as string),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["links", { workspaceId: workspace?.id }],
      });
      queryClient.invalidateQueries({
        queryKey: ["tagsCount", { workspaceId: workspace?.id }],
      });
    },
  });
}

export function useUpdateLink() {
  const queryClient = useQueryClient();
  const { data: workspace } = useWorkspace();
  return useMutation({
    mutationFn: (link: Partial<LinkWithTagsProps>) =>
      updateLinkFetcher(link, workspace?.id as string),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["links", { workspaceId: workspace?.id }],
      });
      queryClient.invalidateQueries({
        queryKey: ["tagsCount", { workspaceId: workspace?.id }],
      });
    },
  });
}

export function useDeleteLink() {
  const queryClient = useQueryClient();
  const { data: workspace } = useWorkspace();
  return useMutation({
    mutationFn: (linkId: string) => deleteLinkFetcher(linkId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["links", { workspaceId: workspace?.id }],
      });
      queryClient.invalidateQueries({
        queryKey: ["tagsCount", { workspaceId: workspace?.id }],
      });
    },
  });
}
