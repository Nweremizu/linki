import { cn } from "@/lib/utils";
import Link from "next/link";
import Markdown from "react-markdown";
import { PropsWithChildren } from "react";
import Image from "next/image";
import { Collaboration } from "./features/collaboration";

export function FeaturesSection() {
  return (
    <div className="mt-20">
      <div className="mx-auto w-full max-w-xl px-4 text-center">
        <h2 className="text-balance font-display text-3xl font-medium text-neutral-900">
          Powerful features for businesses and creatives
        </h2>
        <p className="mt-3 text-pretty text-lg text-neutral-500">
          Linki goes beyond just avearge link shortening, offering seamless
          management with precision and powerful unique features.
        </p>
      </div>
      <div className="mx-auto mt-14 grid w-full max-w-screen-lg grid-cols-1 px-4 sm:grid-cols-2">
        <div className="contents divide-neutral-200 max-sm:divide-y sm:divide-x">
          <FeatureCard
            title="Boost Your Brand with Custom Aliases"
            description="Make your links unforgettable! Customize your URLs with branded aliases to enhance recognition and trust."
            linkText="Learn More"
            href="/features/custom-aliases"
          >
            <Image
              src={"./assets/features1.svg"}
              height={200}
              width={200}
              alt="Feature 1"
              className="w-[90%]"
            />
          </FeatureCard>
          <FeatureCard
            title="Unlock Insights with Advanced Analytics"
            description="Track clicks, analyze user behavior, and gain real-time insights to optimize your link performance."
            linkText="Learn More"
            href="/features/analytics"
          >
            <Image
              src={"./assets/features2.svg"}
              height={200}
              width={200}
              alt="Feature 2"
              className="w-[90%]"
            />
          </FeatureCard>
        </div>
        <div className="contents divide-neutral-200 max-sm:divide-y sm:divide-x [&>*]:border-t [&>*]:border-neutral-200">
          <FeatureCard
            // className="border-y border-neutral-200 pt-12 sm:col-span-2"
            title="Control Access with Flexible Link Expiration"
            description="Set expiration dates for your links to maintain security, exclusivity, and time-sensitive engagement."
            linkText="Learn More"
            href="/features/link-expiration"
          >
            <Image
              src={"./assets/features3.svg"}
              height={200}
              width={200}
              alt="Feature 3"
              className="w-[90%]"
            />
          </FeatureCard>
          <FeatureCard
            title="Collaborate with your team"
            description="Invite your teammates to collaborate on your links. Share insights, manage permissions, and work together seamlessly."
            linkText="Learn more"
            href="/features/collaboration"
          >
            <Collaboration />
          </FeatureCard>
        </div>
      </div>
    </div>
  );
}

function FeatureCard({
  title,
  description,
  linkText,
  href,
  children,
  className,
  graphicClassName,
}: PropsWithChildren<{
  title: string;
  description: string;
  linkText: string;
  href: string;
  className?: string;
  graphicClassName?: string;
}>) {
  return (
    <div
      className={cn(
        "relative flex flex-col gap-10 px-4 py-14 sm:px-12",
        className
      )}
    >
      <div
        className={cn(
          "absolute left-1/2 top-1/3 h-1/2 w-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-10 blur-[50px]",
          "bg-[conic-gradient(from_270deg,#e0ff22,#e0ff22,transparent,transparent)]"
        )}
      />
      <div
        className={cn(
          "relative h-64 overflow-hidden sm:h-[302px]",
          graphicClassName
        )}
      >
        {children}
      </div>
      <div className="relative flex flex-col">
        <h3 className="text-lg font-medium text-neutral-900">{title}</h3>
        <div
          className={cn(
            "mt-2 text-neutral-500 transition-colors",
            "[&_a]:font-medium [&_a]:text-neutral-600 [&_a]:underline [&_a]:decoration-dotted [&_a]:underline-offset-2 hover:[&_a]:text-neutral-800"
          )}
        >
          <Markdown
            components={{
              a: ({ children, href }) => {
                if (!href) return null;
                return (
                  <Link href={href} target="_blank">
                    {children}
                  </Link>
                );
              },
            }}
          >
            {description}
          </Markdown>
        </div>
        <Link
          href={href}
          className={cn(
            "mt-6 w-fit whitespace-nowrap rounded-lg border border-neutral-300 bg-white px-3 py-2 text-sm font-medium leading-none text-neutral-900 transition-colors duration-75",
            "outline-none hover:bg-neutral-50 focus-visible:border-neutral-900 focus-visible:ring-1 focus-visible:ring-neutral-900 active:bg-neutral-100"
          )}
        >
          {linkText}
        </Link>
      </div>
    </div>
  );
}
