/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMediaQuery } from "@/hooks/use-media-query";
import { CardListCard } from "./card-list-card";
import { LinkMainColumn } from "./link-card-main";
import { LinkCardDetails } from "./link-card-other";
import { useAddEditLinkModal } from "../../modal/add-edit-link-modal.tsx";

export function LinkCard({ link }: { link: any }) {
  const { isMobile } = useMediaQuery();

  const { setShowAddEditLinkModal, AddEditLinkModal } = useAddEditLinkModal({
    props: link,
  });

  return (
    <>
      <AddEditLinkModal />
      <CardListCard
        key={link.id}
        onClick={isMobile ? undefined : () => setShowAddEditLinkModal(true)}
        innerClassName="flex items-center gap-4 sm:gap-8 md:gap-12 text-sm transition-all duration-700">
        <div className="min-w-0 grow">
          <LinkMainColumn link={link} />
        </div>
        <LinkCardDetails link={link} />
      </CardListCard>
    </>
  );
}
