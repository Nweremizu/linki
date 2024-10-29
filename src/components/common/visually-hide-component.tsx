import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import { ReactNode } from "react";

function HideCom({ children }: { children: ReactNode }) {
  return <VisuallyHidden.Root asChild>{children}</VisuallyHidden.Root>;
}
export default HideCom;
