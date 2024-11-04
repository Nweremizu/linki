import { Globe } from "lucide-react";
import { Africa } from "./continents/af";
import { Asia } from "./continents/as";
import { Europe } from "./continents/eu";
import { NorthAmerica } from "./continents/na";
import { Oceania } from "./continents/oc";
import { SouthAmerica } from "./continents/sa";

export default function ContinentIcon({
  display,
  className,
}: {
  display: string;
  className?: string;
}) {
  switch (display) {
    case "AF":
      return <Africa className={className} />;
    case "AS":
      return <Asia className={className} />;
    case "EU":
      return <Europe className={className} />;
    case "NA":
      return <NorthAmerica className={className} />;
    case "OC":
      return <Oceania className={className} />;
    case "SA":
      return <SouthAmerica className={className} />;
    default:
      return <Globe className={className} />;
  }
}
