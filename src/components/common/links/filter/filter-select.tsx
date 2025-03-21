/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { cn } from "@/lib/utils";
import { truncate } from "@/lib/utils/truncate";
import { Check, ChevronDown, ListFilter } from "lucide-react";
import { AnimatedSizeContainer } from "../../animated-size-container";
import { Filter, FilterOption } from "./types";
import {
  forwardRef,
  Fragment,
  isValidElement,
  PropsWithChildren,
  ReactNode,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
// import { Button } from "@/components/ui/button";
import { useMediaQuery } from "@/hooks/use-media-query";
import { Command, useCommandState } from "cmdk";
import { LoadingSpinner, Magic } from "@/components/ui/icons";
import { useScrollProgress } from "@/hooks/use-scroll-progress";

type FilterSelectProps = {
  filters: Filter[];
  onSelect: (key: string, value: FilterOption["value"]) => void;
  onRemove: (key: string, value: FilterOption["value"]) => void;
  onOpenFilter?: (key: string) => void;
  activeFilters?: {
    key: Filter["key"];
    value: FilterOption["value"];
  }[];
  children?: ReactNode;
  emptyState?: ReactNode | Record<string, ReactNode>;
  className?: string;
};

const CommandInput = (
  props: React.ComponentProps<typeof Command.Input> & {
    emptySubmit?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  }
) => {
  const isEmpty = useCommandState((state) => state.filtered.count === 0);
  return (
    <Command.Input
      {...props}
      size={1}
      className="grow border-0 py-3 pl-4 pr-2 text-sm outline-none placeholder:text-gray-400 focus:ring-0"
      onKeyDown={(e) => {
        props.onKeyDown?.(e);

        if (e.key === "Enter" && isEmpty) {
          props.emptySubmit?.(e);
        }
      }}
    />
  );
};

export function FilterSelect({
  filters,
  onSelect,
  onRemove,
  onOpenFilter,
  activeFilters,
  children,
  emptyState,
  className,
}: FilterSelectProps) {
  const mainListContainer = useRef<HTMLDivElement>(null);
  const mainListDimensions = useRef<{
    width: number;
    height: number;
  }>();
  const { isMobile } = useMediaQuery();
  const [isOpen, setIsOpen] = useState(false); // To track if the filter dropdown is open
  const [search, setSearch] = useState(""); // To track the search input value
  const [selectedFilterKey, setSelectedFilterKey] = useState<
    Filter["key"] | null
  >(null); // To track the selected filter

  const selectedFilter = selectedFilterKey
    ? filters.find(({ key }) => key === selectedFilterKey)
    : null;

  const reset = useCallback(() => {
    setSelectedFilterKey(null);
    setSearch("");
  }, []);

  const openFilter = useCallback((key: Filter["key"]) => {
    if (mainListContainer.current) {
      mainListDimensions.current = {
        width: mainListContainer.current.scrollWidth,
        height: mainListContainer.current.scrollHeight,
      };
    }

    setSearch("");
    setSelectedFilterKey(key);
    onOpenFilter?.(key);
  }, []);

  const isOptionSelected = useCallback(
    (value: FilterOption["value"]) => {
      if (!selectedFilter || !activeFilters) return false;

      const activeFilter = activeFilters.find(
        ({ key }) => key === selectedFilterKey
      );
      

      return (
        activeFilter?.value === value ||
        (activeFilter &&
          selectedFilter.multiple &&
          Array.isArray(activeFilter.value) &&
          activeFilter.value.includes(value))
      );
    },
    [selectedFilter]
  );

  const selectOption = useCallback(
    (value: FilterOption["value"]) => {
      if (selectedFilter) {
        const isSelected = isOptionSelected(value);

        isSelected
          ? onRemove(selectedFilter.key, value)
          : onSelect(selectedFilter.key, value);

        if (!selectedFilter.multiple) setIsOpen(false);
      }
    },
    [activeFilters, selectedFilter]
  );

  // reset when closed
  useEffect(() => {
    if (!isOpen) {
      reset();
    }
  }, [isOpen]);

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger
        className={cn(
          "group flex h-10 cursor-pointer appearance-none items-center gap-x-2 truncate rounded-md border px-3 text-sm outline-none transition-all",
          "border-gray-200 bg-white text-gray-900 placeholder-gray-400",
          "focus-visible:border-gray-500 data-[state=open]:border-gray-500 data-[state=open]:ring-4 data-[state=open]:ring-gray-200",
          className
        )}>
        <ListFilter className="size-4 shrink-0" />
        <span className="flex-1 overflow-hidden text-ellipsis whitespace-nowrap text-left text-gray-900">
          {children ?? "Filter"}
        </span>
        {activeFilters?.length ? (
          <div className="flex size-4 shrink-0 items-center justify-center rounded-full bg-black text-[0.625rem] text-white">
            {activeFilters.length}
          </div>
        ) : (
          <ChevronDown
            className={`size-4 shrink-0 text-gray-400 transition-transform duration-75 group-data-[state=open]:rotate-180`}
          />
        )}
      </PopoverTrigger>
      <PopoverContent className="w-fit p-0">
        <AnimatedSizeContainer
          width={!isMobile}
          height
          className="rounded-[inherit]"
          style={{ transform: "translateZ(0)" }} // Fixes overflow on some browsers
        >
          <Command loop>
            <div className="flex items-center overflow-hidden rounded-t-lg border-b border-gray-200">
              <CommandInput
                placeholder={`${selectedFilter?.label || "Filter"}...`}
                value={search}
                onValueChange={setSearch}
                onKeyDown={(e) => {
                  if (
                    e.key === "Escape" ||
                    (e.key === "Backspace" && !search)
                  ) {
                    e.preventDefault();
                    e.stopPropagation();
                    selectedFilterKey ? reset() : setIsOpen(false);
                  }
                }}
              />
              {!selectedFilter && (
                <kbd className="mr-2 hidden shrink-0 rounded bg-gray-200 px-2 py-0.5 text-xs font-light text-gray-500 md:block">
                  F
                </kbd>
              )}
            </div>
            <FilterScroll key={selectedFilterKey} ref={mainListContainer}>
              <Command.List
                className={cn(
                  "flex w-full flex-col gap-1 p-1",
                  selectedFilter ? "min-w-[100px]" : "min-w-[180px]"
                )}>
                {!selectedFilter
                  ? // Top-level filters
                    filters.map((filter) => (
                      <Fragment key={filter.key} >
                        <FilterButton
                          key={filter.key}
                          filter={filter}
                          onSelect={() => openFilter(filter.key)}
                        />
                        {filter.separatorAfter && (
                          <Command.Separator className="-mx-1 my-1 border-b border-gray-200" />
                        )}
                      </Fragment>
                    ))
                  : // Filter options
                    selectedFilter.options?.map((option) => {
                      const isSelected = isOptionSelected(option.value);

                      return (
                        <FilterButton
                          key={option.value}
                          filter={selectedFilter}
                          option={option}
                          right={
                            isSelected ? (
                              <Check className="h-4 w-4" />
                            ) : (
                              option.right
                            )
                          }
                          onSelect={() => selectOption(option.value)}
                        />
                      );
                    }) ?? (
                      // Filter options loading state
                      <Command.Loading>
                        <div
                          className="-m-1 flex items-center justify-center"
                          style={mainListDimensions.current}>
                          <LoadingSpinner />
                        </div>
                      </Command.Loading>
                    )}

                {/* Only render CommandEmpty if not loading */}
                {(!selectedFilter || selectedFilter.options) && (
                  <CommandEmpty search={search}>
                    {emptyState
                      ? isEmptyStateObject(emptyState)
                        ? emptyState?.[selectedFilterKey ?? "default"] ??
                          "No matches"
                        : emptyState
                      : "No matches"}
                  </CommandEmpty>
                )}
              </Command.List>
            </FilterScroll>
          </Command>
        </AnimatedSizeContainer>
      </PopoverContent>
    </Popover>
  );
}

function isEmptyStateObject(
  emptyState: ReactNode | Record<string, ReactNode>
): emptyState is Record<string, ReactNode> {
  return (
    typeof emptyState === "object" &&
    emptyState !== null &&
    !isValidElement(emptyState)
  );
}
0;

//dummy tags data
function FilterButton({
  filter,
  option,
  right,
  onSelect,
}: {
  filter: Filter;
  option?: FilterOption;
  right?: ReactNode;
  onSelect: () => void;
}) {
  const { isMobile } = useMediaQuery();

  const Icon = option
    ? option.icon ??
      filter.getOptionIcon?.(option.value, { key: filter.key, option }) ??
      filter.icon
    : filter.icon;

  const label = option
    ? option.label ??
      filter.getOptionLabel?.(option.value, { key: filter.key, option })
    : filter.label;

  return (
    <Command.Item
      className={cn(
        "flex cursor-pointer items-center gap-3 whitespace-nowrap rounded-md px-3 py-2 text-left text-sm",
        "data-[selected=true]:bg-gray-100"
      )}
      onPointerDown={(e) => {
        e.preventDefault();
      }}
      onPointerUp={(e) => {
        e.preventDefault();
        // Mobile touches have some sort of delay that can cause the next page's option's
        // onClick / onSelect to be triggered so we delay this by 100ms to account for it
        isMobile ? setTimeout(onSelect, 100) : onSelect();
      }}
      onSelect={onSelect}
      value={label + option?.value}>
      <span className="shrink-0 text-gray-600">
        {isReactNode(Icon) ? Icon : <Icon className="h-4 w-4" />}
      </span>
      {truncate(label, 48)}
      <div className="ml-1 flex shrink-0 grow justify-end text-gray-500">
        {right}
      </div>
    </Command.Item>
  );
}

const CommandEmpty = ({
  search,
  askAI,
  children,
}: PropsWithChildren<{
  search: string;
  askAI?: boolean;
}>) => {
  if (askAI && search) {
    return (
      <Command.Empty className="flex min-w-[180px] items-center space-x-2 rounded-md bg-gray-100 px-3 py-2">
        <Magic className="h-4 w-4" />
        <p className="text-center text-sm text-gray-600">
          Ask AI <span className="text-black">&quot;{search}&quot;</span>
        </p>
      </Command.Empty>
    );
  } else {
    return (
      <Command.Empty className="p-2 text-center text-sm text-gray-400">
        {children}
      </Command.Empty>
    );
  }
};

const isReactNode = (element: any): element is ReactNode =>
  isValidElement(element);

// eslint-disable-next-line react/display-name
const FilterScroll = forwardRef(
  ({ children }: PropsWithChildren, forwardedRef) => {
    const ref = useRef<HTMLDivElement>(null);
    useImperativeHandle(forwardedRef, () => ref.current);

    const { scrollProgress, updateScrollProgress } = useScrollProgress(ref);

    return (
      <>
        <div
          className="scrollbar-hide max-h-[50vh] w-screen overflow-y-scroll sm:w-auto"
          ref={ref}
          onScroll={updateScrollProgress}>
          {children}
        </div>
        {/* Bottom scroll fade */}
        <div
          className="pointer-events-none absolute bottom-0 left-0 hidden h-16 w-full bg-gradient-to-t from-white sm:block"
          style={{ opacity: 1 - Math.pow(scrollProgress, 2) }}></div>
      </>
    );
  }
);
