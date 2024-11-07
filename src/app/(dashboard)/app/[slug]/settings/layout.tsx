import SettingsLayout from "@/components/common/settings-layout";
import { Gear2 } from "@/components/ui/icons/gear2";
import { LibraryBigIcon, PuzzleIcon, Users } from "lucide-react";
import { ReactNode } from "react";

interface PersonalSettingsLayoutProps {
  children: ReactNode;
}

export default function PersonalSettingsLayout({
  children,
}: PersonalSettingsLayoutProps) {
  const tabs = [
    {
      group: "",
      tabs: [
        {
          name: "General",
          icon: <Gear2 className="size-5" />,
          segment: null,
        },
        {
          name: "Library",
          icon: <LibraryBigIcon className="size-5" />,
          segment: "library",
        },
        {
          name: "People",
          icon: <Users className="size-5" />,
          segment: "people",
        },
        {
          name: "Integrations",
          icon: <PuzzleIcon className="size-5" />,
          segment: "integrations",
        },
      ],
    },
  ];

  return (
    <SettingsLayout tabs={tabs} tabContainerClassName="top-[105px]">
      {children}
    </SettingsLayout>
  );
}
