import { CardListCard } from "@/components/common/links/link-card/card-list-card";

export function TagCardSkeleton() {
  return (
    <CardListCard>
      <div className="flex h-8 items-center justify-between gap-5 sm:gap-8 md:gap-12">
        <div className="flex items-center gap-3">
          <div className="h-5 w-5 animate-pulse rounded-md bg-gray-200" />
          <div className="h-5 w-16 animate-pulse rounded-md bg-gray-200 sm:w-32" />
        </div>
        <div className="flex items-center gap-5 sm:gap-8 md:gap-12">
          <div className="h-5 w-16 animate-pulse rounded-md bg-gray-200" />
          <div className="w-8" />
        </div>
      </div>
    </CardListCard>
  );
}
