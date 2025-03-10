import { cn } from "@/lib/utils";
import { ArrowUpRightIcon } from "lucide-react";
import Image from "next/image";
import Markdown from "react-markdown";

export function TestimonialSection() {
  const testimonials = [
    {
      name: "Areola Mayorkun",
      details: "Fullstack Developer, Freelancer",
      description:
        "Linki has been a game-changer for my freelance business. I can now easily track my links and see how they are performing.",
      link: "https://www.areola.com",
    },
    {
      name: "Jake Thompson",
      details: "E-commerce Entrepreneur",
      description:
        "Before using Linki, managing my affiliate links and tracking customer engagement was a nightmare. Now, I have a centralized platform that gives me insights into which links drive the most sales. This tool has significantly improved my conversion rates and revenue!",
      link: "https://www.thompsonstore.com",
    },
    {
      name: "Chinwe Okafor",
      details: "Digital Marketer, Growth Strategist",
      description:
        "As a digital marketer, tracking campaign performance is crucial for my success. Linki provides me with real-time analytics, allowing me to optimize my marketing strategies on the go. The intuitive dashboard makes data analysis effortless, saving me countless hours each week.",
      link: "https://www.chinwemarketing.com",
    },
    {
      name: "David Olanrewaju",
      details: "Tech Blogger, SEO Expert",
      description:
        "I run a tech blog with thousands of monthly visitors, and keeping track of my outbound links used to be a hassle. With Linki, I can monitor link performance, A/B test different URLs, and even retarget visitors efficiently. It’s a must-have tool for any content-driven business!",
      link: "https://www.davidtechblog.com",
    },
    {
      name: "Sophia Martinez",
      details: "Content Creator, YouTuber",
      description:
        "Engaging my audience across different platforms requires effective link management. Linki allows me to create short, branded links that not only look professional but also provide analytics on clicks and engagement. My sponsorship deals have improved because of the data I can now share with brands.",
      link: "https://www.sophiamartinez.com",
    },
    {
      name: "Elena Petrova",
      details: "Social Media Manager",
      description:
        "Managing multiple social media accounts means sharing dozens of links daily. Linki has simplified this process by providing detailed analytics and link tracking. The ability to customize URLs has also boosted engagement rates for my clients' campaigns.",
      link: "https://www.elenasocial.com",
    },
  ];

  return (
    <div
      className={cn(
        "mx-auto w-full max-w-screen-lg px-4 lg:px-10 py-16 md:py-32"
      )}
    >
      <div className="mx-auto w-full max-w-xl px-4 text-center">
        <h2 className="text-balance font-display text-3xl font-medium text-neutral-900 sm:text-4xl sm:leading-[1.15]">
          What our customers are saying
        </h2>
        <p className="mt-3 text-pretty text-lg text-neutral-500">
          Join the many customers who use our link management system to take
          their digital efforts to the next level.
        </p>
      </div>
      <ul className="grid list-none grid-cols-1 gap-6 md:grid-cols-2 mt-12">
        {testimonials.map((value, idx) => {
          return (
            <Testimonialcard
              key={idx}
              name={value.name}
              details={value.details}
              description={value.description}
              link={value.link}
              image={`${idx + 1}`}
            />
          );
        })}
      </ul>
    </div>
  );
}

function Testimonialcard({
  name,
  details,
  description,
  link,
  image,
}: {
  name: string;
  details: string;
  description: string;
  link: string;
  image: string;
}) {
  const OImage = (
    isNaN(Number(image)) ? Image : `/assets/team/mem${image}.jpeg`
  ) as string;

  return (
    <li className="group h-full rounded-2xl transition-[box-shadow] hover:shadow-[0_8px_16px_0_#0000000A]">
      <div
        className={cn(
          "relative h-full break-inside-avoid rounded-2xl border border-neutral-200/50 bg-neutral-50 [--accent-color:#a855f7] "
        )}
      >
        <div className="absolute inset-0 rounded-2xl bg-[radial-gradient(100%_100%_at_50%_0%,var(--accent-color),#e0ff22)] opacity-5 transition-opacity group-hover:opacity-10"></div>
        <div className="relative flex h-full flex-col gap-10 p-6 sm:p-10 cursor-default">
          <div className="text-[15px] leading-6 text-neutral-500 [&_strong]:font-semibold [&_strong]:text-neutral-700 [&_a]:font-medium [&_a]:text-neutral-700 [&_a]:underline [&_a]:decoration-dotted [&_a]:underline-offset-2">
            <Markdown>{description}</Markdown>
          </div>
          <div className="flex grow flex-col justify-end">
            <div className="flex items-center justify-between">
              <div className="flex flex-col space-y-0.5">
                <div className="text-base font-medium text-neutral-900">
                  {name}
                </div>
                <div className="text-sm text-neutral-500">{details}</div>
              </div>
              <div className="relative">
                <div className="absolute -inset-[50%] [mask-image:radial-gradient(black_50%,transparent_80%)]">
                  <div className="absolute inset-x-0 top-1/4 h-px bg-neutral-200"></div>
                  <div className="absolute inset-x-0 bottom-1/4 h-px bg-neutral-200"></div>
                  <div className="absolute inset-y-0 left-1/4 w-px bg-neutral-200"></div>
                  <div className="absolute inset-y-0 right-1/4 w-px bg-neutral-200"></div>
                </div>
                <Image
                  width={300}
                  height={300}
                  className="blur-0 size-12 border border-neutral-200 object-cover"
                  src={OImage}
                  alt="meme"
                />
              </div>
            </div>
          </div>
        </div>
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            "absolute right-2 top-2 flex items-center gap-1 rounded-full ",
            "border border-neutral-200 bg-white py-1 pl-3 pr-2.5 text-xs font-medium text-neutral-500 ",
            "-translate-y-1 opacity-0 transition-[opacity,transform] focus-visible:translate-y-0",
            "focus-visible:opacity-100 group-hover:translate-y-0 group-hover:opacity-100"
          )}
        >
          {removeHttpOrHttps(link)}
          <div className="rounded-full bg-neutral-100 p-px">
            <ArrowUpRightIcon className="size-2.5" />
          </div>
        </a>
      </div>
    </li>
  );
}

function removeHttpOrHttps(link: string) {
  if (link.startsWith("https")) {
    if (link.startsWith("https://www.")) {
      return link.slice(12);
    } else {
      return link.slice(10);
    }
  } else {
    return link.slice(7);
  }
}
