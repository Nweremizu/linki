/* eslint-disable @typescript-eslint/no-unused-vars */
import { Command, useCommandState } from "cmdk";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { TagProps, LinkWithTagsProps } from "@/types/link";
import { InfoTooltip, NormalTooltip } from "../../tooltips";
import { Check, ChevronDown, Tag, X } from "lucide-react";
import TagBadge from "../../links/tag-badge";
import { useAddTag, useTags } from "@/lib/query/links/use-tags";
import { toast } from "sonner";
import { LoadingCircle } from "@/components/ui/icons";

export default function TagsSection({
  data,
  setData,
  demoTags,
}: {
  data: LinkWithTagsProps;
  setData: Dispatch<SetStateAction<LinkWithTagsProps>>;
  demoTags?: TagProps[];
}) {
  // const availableTags = demoTags;
  const { data: availableTags, isLoading } = useTags();
  const createTagMutation = useAddTag();
  const { id, url, title, tags } = data;

  const [creatingTag, setCreatingTag] = useState(false);

  // a function to select a random color from the tagColors array
  const tagColors: Array<
    "red" | "yellow" | "green" | "blue" | "purple" | "brown" | "pink"
  > = ["red", "yellow", "green", "blue", "purple", "brown", "pink"];
  const randomColor = ():
    | "red"
    | "yellow"
    | "green"
    | "blue"
    | "purple"
    | "brown"
    | "pink" => tagColors[Math.floor(Math.random() * tagColors.length)];

  async function createTag(tagName: string) {
    const newTag: Partial<TagProps> = {
      name: tagName,
      color: randomColor(),
    };
    setCreatingTag(true);
    await createTagMutation.mutateAsync(newTag, {
      onSuccess: (responseData) => {
        if (!responseData) return;
        const updatedTags = [
          ...tags,
          {
            id: responseData?.id,
            name: responseData?.name,
            color: responseData?.color,
          },
        ];
        setData({ ...data, tags: updatedTags });
        setInputValue("");
        setCreatingTag(false);
      },
      onError: (error) => {
        toast.error("Failed to create tag");
        setCreatingTag(false);
      },
    });
  }

  const [inputValue, setInputValue] = useState("");

  const tagMatch = availableTags
    ?.map(({ name }) => name)
    .includes(inputValue.trim());

  const commandRef = useRef<HTMLDivElement | null>(null);
  const [openCommandList, setOpenCommandList] = useState(false);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        commandRef.current &&
        !commandRef.current.contains(e.target as Node)
      ) {
        setOpenCommandList(false);
      }
    };
    if (openCommandList) {
      document.addEventListener("click", handleClickOutside);
      return () => document.removeEventListener("click", handleClickOutside);
    }
  }, [commandRef, openCommandList]);

  const CommandInput = () => {
    const isEmpty = useCommandState((state) => state.filtered.count === 0);
    return (
      <Command.Input
        placeholder="Select tags..."
        // hack to focus on the input when the dropdown opens
        autoFocus={openCommandList}
        // when focus on the input. only show the dropdown if there are tags and the tagValue is not empty
        onFocus={() => setOpenCommandList(true)}
        value={inputValue}
        onValueChange={setInputValue}
        onKeyDown={(e) => {
          if (e.key === "Escape") {
            setOpenCommandList(false);

            // listen for cases where empty results and enter is pressed
          } else if (e.key === "Enter" && isEmpty) {
            setOpenCommandList(false);
            // createTag(inputValue);

            // remove the last tag if backspaced
          } else if (
            ["Backspace", "Delete"].includes(e.key) &&
            inputValue === ""
          ) {
            setData((data) => {
              const popped = [...data.tags];
              popped.pop();
              return { ...data, tags: popped };
            });

            // if it's a letter or a number and there's no meta key pressed, openCommandList dropdown
          } else if (e.key.match(/^[a-z0-9]$/i) && !e.metaKey) {
            setOpenCommandList(true);
          }
        }}
        className="block grow rounded-md border-none px-0 py-1 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-0 sm:text-sm"
      />
    );
  };

  return (
    <div className="">
      <h2 className="text-sm font-medium text-gray-900 mb-2">Tags</h2>
      <Command
        ref={commandRef}
        className="relative"
        loop
        filter={(value, search) => (value.includes(search.trim()) ? 1 : 0)}
      >
        <div className="group rounded-md border border-gray-300 bg-white p-1  focus-within:border-gray-500 focus-within:ring-1 focus-within:ring-gray-500">
          <div className="absolute inset-y-0 left-0 flex items-center justify-center pl-3 text-gray-400">
            {creatingTag ? (
              <LoadingCircle className="h-4 w-4" />
            ) : (
              <NormalTooltip
                content={`Tags help you organize your links in your ${process.env.NEXT_PUBLIC_APP_NAME} workspace.`}
              >
                <Tag className="h-4 w-4" />
              </NormalTooltip>
            )}
          </div>
          <div className="flex flex-wrap space-x-1.5 px-8">
            {tags.map((tag: TagProps) => (
              <TagBadge key={tag.id} {...tag} />
            ))}
            <CommandInput />
            {tags.length ? (
              <button
                type="button"
                onClick={() => {
                  setData({ ...data, tags: [] });
                  setInputValue("");
                }}
                className="absolute inset-y-0 right-0 my-auto text-gray-400 hover:text-gray-500"
              >
                <X className="h-7 w-7 pr-3" />
              </button>
            ) : (
              <ChevronDown className="absolute inset-y-0 right-0 my-auto h-7 w-7 pr-3 text-gray-400 transition-all" />
            )}
          </div>
        </div>
        {openCommandList && (
          <Command.List className="absolute z-20 mt-2 h-[calc(var(--cmdk-list-height)+17px)] max-h-[300px] w-full overflow-auto rounded-md border border-gray-200 bg-white p-2 shadow-md transition-all">
            {availableTags?.length === 0 && inputValue.length === 0 && (
              <p className="text-gray-500 text-sm">
                Start typing to add tag...
              </p>
            )}
            <Command.Empty>
              {inputValue.length > 0 && (
                <button
                  type="button"
                  onClick={() => createTag(inputValue)}
                  className="flex w-full cursor-pointer items-center rounded-md bg-gray-100 px-4 py-2 text-sm text-gray-900 hover:text-gray-900 aria-selected:bg-gray-100 aria-selected:text-gray-900"
                >
                  Create tag{" "}
                  <span className="ml-1.5 rounded-md bg-gray-200 px-2 py-0.5 text-gray-800">
                    {inputValue}
                  </span>
                </button>
              )}
            </Command.Empty>
            {availableTags?.map((tag) => (
              <Command.Item
                key={tag.id}
                value={tag.name}
                onSelect={() => {
                  const isRemoving = data.tags
                    .map(({ id }) => id)
                    .includes(tag.id);
                  setData({
                    ...data,
                    tags: isRemoving
                      ? data.tags.filter(({ id }) => id !== tag.id)
                      : [...data.tags, tag],
                  });
                  setInputValue("");
                }}
                className="group flex cursor-pointer items-center justify-between rounded-md px-4 py-2 text-sm text-gray-900 hover:bg-gray-100 hover:text-gray-900 active:bg-gray-200 aria-selected:bg-gray-100 aria-selected:text-gray-900"
              >
                <TagBadge {...tag} />
                {tags.map(({ id }) => id).includes(tag.id) && (
                  <Check className="h-5 w-5 text-gray-500" />
                )}
              </Command.Item>
            ))}

            {inputValue.length > 0 && !tagMatch && (
              <Command.Item
                key="create-tag"
                value={inputValue}
                onSelect={(tag) => createTag(tag)}
                className="group flex cursor-pointer items-center justify-between rounded-md px-4 py-2 text-sm text-gray-900 hover:bg-gray-100 hover:text-gray-900 active:bg-gray-200 aria-selected:bg-gray-100 aria-selected:text-gray-900"
              >
                <div className="flex items-center">
                  Create tag{" "}
                  <span className="ml-1.5 rounded-md bg-gray-200 px-2 py-0.5 text-gray-800">
                    {inputValue}
                  </span>
                </div>
              </Command.Item>
            )}
          </Command.List>
        )}
      </Command>
    </div>
  );
}
