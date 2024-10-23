import "./globals.css";
import { satoshi } from "@/styles/fonts";
import { cn } from "@/lib/utils";
import { Toaster } from "sonner";
import Provider from "./provider";
import { constructMetadata } from "@/lib/utils/construct-metadata";
import ReactQueryProvider from "./queryProvider";

export const metadata = constructMetadata();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${cn(satoshi.variable)} antialiased font-display`}>
        <Toaster closeButton richColors className="pointer-events-auto" />
        <ReactQueryProvider>
          <Provider>{children}</Provider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
