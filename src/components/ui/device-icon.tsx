import { DesktopIcon, MobileIcon } from "@radix-ui/react-icons";
import { TabletIcon } from "lucide-react";
import { Linux, Mac, Ubuntu, Windows } from "./os-icons";

export default function DeviceIcon({
  display,
  className,
}: {
  display: string;
  className?: string;
}) {
  switch (display) {
    case "Desktop":
      return <DesktopIcon className={className} />;
    case "Mobile":
      return <MobileIcon className={className} />;
    case "Tablet":
      return <TabletIcon className={className} />;
    default:
      return <DesktopIcon className={className} />;
  }
}

export function OsIcon({
  display,
  className,
}: {
  display: string;
  className?: string;
}) {
  switch (display) {
    case "Windows":
      return <Windows className={className} />;
    case "Mac":
      return <Mac className={className} />;
    case "Linux":
      return <Linux className={className} />;
    case "Ubuntu":
      return <Ubuntu className={className} />;
    default:
      return <Windows className={className} />;
  }
}
