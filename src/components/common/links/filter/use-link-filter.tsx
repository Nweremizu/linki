/* eslint-disable @typescript-eslint/no-explicit-any */
// import useLinksCount from "@/lib/swr/use-links-count";
// import useTags from "@/lib/swr/use-tags";
// import useUsers from "@/lib/swr/use-users";
"use client";

import { Tag, User } from "lucide-react";
import { useRouterStuff } from "@/hooks/use-router-stuff";
import { useMemo } from "react";
import TagBadge, { TagColorProps } from "../tag-badge";
import AvatarUser from "../../avatar-user";
import { TagProps } from "@/types/link";
import { useTagsWithCount } from "@/lib/query/links/use-tags";

interface TagPropsWithCount extends TagProps {
  count: number;
}

export function useLinkFilters({ users }: { users?: any }) {
  // const links = [] as LinkWithTagsProps[];
  //   const tags = useTagFilterOptions();
  const { data: tags } = useTagsWithCount();

  const { queryParams, searchParamsObj } = useRouterStuff();

  const filters = useMemo(() => {
    return [
      {
        key: "tagIds",
        icon: Tag,
        label: "Tag",
        multiple: true,
        getOptionIcon: (value: any, props: any) => {
          const tagColor =
            props.option?.data?.color ??
            tags?.find(({ id }: { id: string }) => id === value)?.color;
          return tagColor ? (
            <TagBadge color={tagColor} withIcon className="sm:p-1" />
          ) : null;
        },
        options:
          (tags as unknown as TagPropsWithCount[])?.map(
            ({
              id,
              name,
              color,
              count,
            }: {
              id: string;
              name: string;
              color: TagColorProps;
              count: number;
            }) => ({
              value: id,
              icon: <TagBadge color={color} withIcon className="sm:p-1" />,
              label: name,
              data: { color },
              right: count,
            })
          ) ?? null,
      },
      {
        key: "userId",
        icon: User,
        label: "Creator",
        options:
          users?.map(
            ({
              id,
              name,
              email,
              image,
              count,
            }: {
              id: string;
              name: string;
              email: string;
              image: string;
              count: number;
            }) => ({
              value: id,
              label: name || email,
              icon: (
                <AvatarUser
                  id={id}
                  name={name || email}
                  image={image}
                  className="h-6 w-6 border-gray-200 border text-gray-900"
                />
              ),
              right: count,
            })
          ) ?? null,
      },
    ];
  }, [tags, users]);

  const selectedTagIds = useMemo(
    () => searchParamsObj["tagIds"]?.split(",")?.filter(Boolean) ?? [],
    [searchParamsObj]
  );

  const activeFilters = useMemo(() => {
    const { tagIds, userId } = searchParamsObj;

    return [
      ...(tagIds ? [{ key: "tagIds", value: selectedTagIds }] : []),
      ...(userId ? [{ key: "userId", value: userId }] : []),
    ];
  }, [searchParamsObj]);

  const onSelect = (key: string, value: any) => {
    if (key === "tagIds") {
      queryParams({
        set: {
          tagIds: selectedTagIds.concat(value).join(","),
        },
      });
    } else {
      queryParams({
        set: {
          [key]: value,
        },
      });
    }
  };

  const onRemove = (key: string, value: any) => {
    if (
      key === "tagIds" &&
      !(selectedTagIds.length === 1 && selectedTagIds[0] === value)
    ) {
      queryParams({
        set: {
          tagIds: selectedTagIds.filter((id: any) => id !== value).join(","),
        },
      });
    } else {
      queryParams({
        del: key,
      });
    }
  };

  const onRemoveAll = () => {
    queryParams({
      del: ["tagIds", "userId", "search"],
    });
  };

  return { filters, activeFilters, onSelect, onRemove, onRemoveAll };
}

// function useGetTagCount() {}
