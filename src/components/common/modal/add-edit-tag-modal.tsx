/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogOverlay,
  DialogTitle,
} from "@/components/ui/dialog";
import { TagColorProps, TagProps } from "@/types/link";
import HideCom from "../visually-hide-component";
import { Logo } from "@/components/ui/icons/logo";
import React, { useCallback, useMemo, useState } from "react";
import { InfoTooltip } from "../tooltips";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { COLORS_LIST, randomBadgeColor } from "../links/tag-badge";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { useAddTag, useEditTag } from "@/lib/query/links/use-tags";
import { toast } from "sonner";
import { useMediaQuery } from "@/hooks/use-media-query";

function AddEditTagModalHelper({
  showAddEditTagModal,
  setShowAddEditTagModal,
  tag,
}: {
  showAddEditTagModal: boolean;
  setShowAddEditTagModal: (show: boolean) => void;
  tag?: TagProps;
}) {
  const addTagMutation = useAddTag();
  const editTagMutation = useEditTag();
  const [data, setData] = useState<TagProps>(
    tag || {
      id: "",
      name: "",
      color: randomBadgeColor(),
    }
  );
  const { isMobile } = useMediaQuery();
  const { name, color } = data;
  const [saving, setSaving] = useState(false);
  const saveDisabled = useMemo(
    () =>
      saving ||
      !name ||
      !color ||
      (tag &&
        Object.entries(tag).every(
          ([key, value]) => data[key as keyof TagProps] === value
        )),
    [tag, data]
  );

  const addEditMutation = tag ? editTagMutation : addTagMutation;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSaving(true);
    try {
      await addEditMutation.mutateAsync(
        {
          ...data,
        },
        {
          onSuccess: () => {
            toast.success(`${tag ? "Updated" : "Created"} tag successfully!`);
            setSaving(false);
          },
          onError: (error) => {
            console.log(error);
            toast.error(
              error.message.length < 30
                ? error.message
                : "An error occurred while deleting the account"
            );
            setSaving(false);
          },
        }
      );
      setShowAddEditTagModal(false);
    } catch (error) {
      console.error(error);
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog
      open={showAddEditTagModal}
      onOpenChange={() => setShowAddEditTagModal(false)}
    >
      <DialogOverlay className="fixed inset-0 z-40 bg-gray-100 bg-opacity-10 backdrop-blur" />
      <DialogContent
        onClick={(e) => e.stopPropagation()}
        className="bg-white !p-0"
      >
        <HideCom>
          <DialogTitle>{tag ? "Edit tag" : "Add tag"}</DialogTitle>
        </HideCom>

        <div className="flex flex-col items-center justify-center space-y-3 px-4 py-4 pt-8 sm:px-16">
          <Logo />
          <div className="flex flex-col space-y-1 text-center">
            <h3 className="text-lg font-medium">{tag ? "Edit" : "Add"} tag</h3>
            <p className="text-sm text-gray-500">
              Use tags to organize your links.{" "}
              <a
                href="https://dub.co/help/article/how-to-use-tags#what-is-a-tag"
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-4 hover:text-gray-800"
              >
                Learn more
              </a>
            </p>
          </div>
        </div>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 bg-gray-50 px-4 py-8 text-left sm:px-16 rounded-b-md border border-gray-200"
        >
          <div>
            <label htmlFor="name" className="flex items-center space-x-2">
              <p className="block text-sm font-medium text-gray-700">
                Tag Name
              </p>
            </label>
            <div className="mt-2 flex rounded-md shadow-sm">
              <input
                name="name"
                id="name"
                type="text"
                required
                autoFocus={!isMobile}
                autoComplete="off"
                className="block w-full border p-2 rounded-md border-gray-300 text-gray-900 placeholder-gray-400 focus:!border-gray-500 focus:outline-none focus:ring-gray-500 sm:text-sm"
                placeholder="New Tag"
                value={name}
                onChange={(e) => {
                  setData({ ...data, name: e.target.value });
                }}
              />
            </div>
          </div>

          <div>
            <label htmlFor="name" className="flex items-center space-x-2">
              <p className="block text-sm font-medium text-gray-700">
                Tag Color
              </p>
              <InfoTooltip content={`A color to make your tag stand out.`} />
            </label>
            <RadioGroup
              defaultValue={color}
              onValueChange={(value) =>
                setData({ ...data, color: value as TagColorProps })
              }
              className="mt-2 flex flex-wrap gap-3"
            >
              {COLORS_LIST.map(({ color: colorOption, css }) => (
                <div key={colorOption} className="flex items-center">
                  <RadioGroupItem
                    value={colorOption}
                    id={colorOption}
                    className="peer pointer-events-none absolute opacity-0"
                  />
                  <Label
                    htmlFor={colorOption}
                    className={cn(
                      "cursor-pointer whitespace-nowrap rounded-md px-2 py-0.5 text-sm capitalize ring-current peer-focus-visible:ring-offset-2",
                      css,
                      color === colorOption && "ring-2"
                    )}
                  >
                    {colorOption}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          <Button disabled={saveDisabled} loading={saving}>
            {tag ? "Save changes" : "Create tag"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export function useAddEditTagModal(tag?: any) {
  const [showAddEditTagModal, setShowAddEditTagModal] = React.useState(false);
  const AddEditTagModal = useCallback(() => {
    return (
      <AddEditTagModalHelper
        tag={tag}
        setShowAddEditTagModal={setShowAddEditTagModal}
        showAddEditTagModal={showAddEditTagModal}
      />
    );
  }, [setShowAddEditTagModal, showAddEditTagModal]);

  return useMemo(
    () => ({ setShowAddEditTagModal, AddEditTagModal }),
    [setShowAddEditTagModal, showAddEditTagModal]
  );
}
