import { InfiniteMovingCards } from "./moving-cards";

const testimonials = [
  {
    name: "Alice Johnson",
    title: "Marketing Manager",
    quote:
      "Using Linki has revolutionized our marketing campaigns. The ability to track and analyze link performance has provided invaluable insights, helping us optimize our strategies effectively.",
  },
  {
    name: "Bob Williams",
    title: "Product Manager",
    quote:
      "Linki's URL shortening service has been a game-changer for our product launches. It simplifies sharing and tracking links, making our promotional efforts more efficient and effective.",
  },
  {
    name: "Catherine Lee",
    title: "Social Media Strategist",
    quote:
      "Linki has made managing our social media links so much easier. The analytics provided by Linki help us understand our audience better and tailor our content to their preferences.",
  },
  {
    name: "David Brown",
    title: "SEO Specialist",
    quote:
      "Linki's URL shortening and tracking features have significantly improved our SEO efforts. The detailed analytics allow us to monitor link performance and make data-driven decisions.",
  },
  {
    name: "Ella Davis",
    title: "Content Creator",
    quote:
      "Linki has been an essential tool in our content creation process. The ability to customize and track links has helped us enhance our content strategy and drive engagement.",
  },
  {
    name: "Frank Wilson",
    title: "Digital Marketer",
    quote:
      "Linki has simplified our digital marketing campaigns. The platform's link management and tracking capabilities have enabled us to optimize our marketing strategies and drive better results.",
  },
];

export default function Testimonials() {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full px-10 mt-24 lg:px-100 2xl:px-80 lg:grid-cols-2">
      <div className="flex items-center justify-between w-full h-full space-y-4">
        <h2 className="text-3xl font-light md:text-xl lg:text-2xl xl:text-6xl text-text-normal">
          What Our Clients Say About Us
        </h2>
      </div>
      <div className="relative flex items-center justify-start w-full h-full gap-4 py-8 overflow-hidden">
        <InfiniteMovingCards items={testimonials} />
      </div>
    </div>
  );
}
