"use client";

import { FilterList } from "@/components/common/links/filter/filter-list";
import { FilterSelect } from "@/components/common/links/filter/filter-select";
import { useLinkFilters } from "@/components/common/links/filter/use-link-filter";
import { LinkContainer } from "@/components/common/links/link-container";
import { MaxWidthWrapper } from "@/components/common/max-width-wrapper";
import { useAddEditLinkModal } from "@/components/common/modal/add-edit-link-modal.tsx";
import { Button } from "@/components/ui/button";
import { Tag } from "lucide-react";

export default function LinksPageClient() {
  const users = [
    {
      id: "edghjfdkjjkdjkdf",
      name: "User 1",
      email: "user1@gmail.com",
      image: "image1",
      count: 1,
    },
    {
      id: "edgh43fdkjjkdjkdf",
      name: "Alice Johnson",
      email: "alice.j@example.com",
      image: "image2",
      count: 3,
    },
    {
      id: "jdghjfdkjjkdjkdf",
      name: "Bob Smith",
      email: "bobsmith@outlook.com",
      image: "image3",
      count: 2,
    },
    {
      id: "erghjfdkjjkdjkdf",
      name: "Emma Davis",
      email: "emma.davis@company.com",
      image: "image4",
      count: 5,
    },
    {
      id: "edghjfdkjjkdj45f",
      name: "Carlos Rodriguez",
      email: "carlos.r@mail.org",
      image: "image5",
      count: 4,
    },
  ];

  const { AddEditLinkModal, AddEditLinkButton } = useAddEditLinkModal();

  const { filters, activeFilters, onSelect, onRemove, onRemoveAll } =
    useLinkFilters({
      users,
    });

  return (
    <>
      <AddEditLinkModal />
      <div className="mt-10 flex w-full items-center pt-3">
        <MaxWidthWrapper>
          <div className="flex flex-wrap items-center justify-between gap-2 md:flex-nowrap">
            <h1 className="text-3xl order-1 tracking-tight font-semibold">
              Your Links
            </h1>
            <div className="order-4 flex w-full grow flex-wrap justify-end gap-2 md:order-2 md:w-auto">
              <div className="grow basis-0 md:grow-0">
                <FilterSelect
                  filters={filters}
                  activeFilters={activeFilters}
                  onRemove={onRemove}
                  onSelect={onSelect}
                  emptyState={{
                    tagId: (
                      <div className="flex flex-col items-center gap-2 p-2 text-center text-sm">
                        <div className="flex items-center justify-center rounded-2xl border border-gray-200 bg-gray-50 p-3">
                          <Tag className="h-8 w-8 text-gray-700" />
                        </div>
                        <p className="mt-2 font-medium text-gray-950">
                          No tags found
                        </p>
                        <p className="mx-auto mt-1 w-full max-w-[180px] text-gray-700">
                          Add tags to organize your links
                        </p>
                        <div>
                          <Button
                            className="mt-1 h-8"
                            // onClick={() => setShowAddEditTagModal(true)}
                          >
                            Add Tag
                          </Button>
                        </div>
                      </div>
                    ),
                    domain: (
                      <div className="flex flex-col items-center gap-2 p-2 text-center text-sm">
                        <div className="flex items-center justify-center rounded-2xl border border-gray-200 bg-gray-50 p-3">
                          <Tag className="h-8 w-8 text-gray-700" />
                        </div>
                        <p className="mt-2 font-medium text-gray-950">
                          No domains found
                        </p>
                        <p className="mx-auto mt-1 w-full max-w-[180px] text-gray-700">
                          Add a custom domain to match your brand
                        </p>
                        {/* <div>
                        <Button
                          className="mt-1 h-8"
                          // onClick={() =>
                          //   router.push(`/${slug}/settings/domains`)
                          // }
                          text="Add domain"
                        />
                      </div> */}
                      </div>
                    ),
                  }}
                />
              </div>
            </div>
            <div className="order-3 flex gap-x-2">
              <div className="grow-0">
                <AddEditLinkButton />
              </div>
              {/* <MoreLinkOptions /> */}
            </div>
          </div>
          <FilterList
            filters={filters}
            activeFilters={activeFilters}
            onRemove={onRemove}
            onRemoveAll={onRemoveAll}
          />
        </MaxWidthWrapper>
      </div>
      <div className="mt-3">
        <LinkContainer AddEditLinkButton={AddEditLinkButton} />
      </div>
    </>
  );
}
