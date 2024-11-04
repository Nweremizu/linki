import { Apple, Chrome, Firefox, Safari } from "./browser-icons";
import { BlurImage } from "./blur-image";

export default function BrowserIcon({
  display,
  className,
}: {
  display: string;
  className?: string;
}) {
  switch (display) {
    case "Chrome":
      return <Chrome className={className as string} />;
    case "Safari":
      return <Safari className={className as string} />;
    case "Apple":
      return <Apple className={className as string} />;
    case "Firefox":
      return <Firefox className={className as string} />;
    default:
      return (
        <BlurImage
          src={`https://faisalman.github.io/ua-parser-js/images/browsers/${display.toLowerCase()}.png`}
          alt={display}
          width={20}
          height={20}
          className={className}
        />
      );
  }
}
