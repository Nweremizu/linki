import SettingsLayout from "@/components/common/settings-layout";
import { Gear2 } from "@/components/ui/icons/gear2";
import { ReactNode } from "react";

interface PersonalSettingsLayoutProps {
  children: ReactNode;
}

export default function PersonalSettingsLayout({ children }: PersonalSettingsLayoutProps) {
  const tabs = [
    {
      group: "",
      tabs: [
        {
          name: "General",
          icon: <Gear2 className="size-6" />,
          segment: null,
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
