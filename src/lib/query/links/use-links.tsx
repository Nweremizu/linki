import { useQuery } from "@tanstack/react-query";
import { LinkWithTagsProps } from "@/types/link";
import { useWorkspace } from "../use-workspace";
import api from "@/lib/axios";
import { useSearchParams } from "next/navigation";

const getLinksFetcher = async ({
  workspaceId,
  tagIds,
  userIds,
}: {
  workspaceId: string;
  tagIds: string | null;
  userIds: string | null;
}): Promise<LinkWithTagsProps[]> => {
  try {
    const { data } = await api.get(
      `/links/${workspaceId}?tagIds=${tagIds}&userIds=${userIds}`
    );
    return data.responseObject as LinkWithTagsProps[];
  } catch (error) {
    console.error(error);
    return [];
  }
};

export async function generateRandomLinkKey(workspaceId: string) {
  try {
    const { data } = await api.post(`/links/${workspaceId}/key`);
    return data.responseObject as string;
  } catch (error) {
    console.error(error);
    return "";
  }
}

export function useLinks() {
  const { data: workspace } = useWorkspace();
  const searchParams = useSearchParams();
  const tagIds = searchParams.get("tagIds") || null;
  const userIds = searchParams.get("userIds") || null;
  return useQuery({
    queryKey: ["links", { workspaceId: workspace?.id, tagIds, userIds }],
    queryFn: () =>
      getLinksFetcher({
        workspaceId: workspace?.id as string,
        tagIds,
        userIds,
      }),
    enabled: !!workspace?.id,
    staleTime: 1000 * 60 * 5,
  });
}
