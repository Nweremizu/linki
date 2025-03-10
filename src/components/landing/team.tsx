import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

const teamMembers = [
  { id: 1, name: "John Doe", role: "Software Engineer" },
  { id: 3, name: "Jane Smith", role: "Product Designer" },
  { id: 2, name: "Michael Lee", role: "Marketing Lead" },
  { id: 5, name: "Emily Johnson", role: "UI/UX Designer" },
  { id: 4, name: "Chris Evans", role: "Project Manager" },
  { id: 6, name: "Sophia Brown", role: "Frontend Developer" },
];

const Teams = () => {
  return (
    <div className={cn("mx-auto w-full max-w-screen-lg px-4 lg:px-10 py-16")}>
      <div className="mx-auto w-full max-w-xl px-4 text-center">
        <h2 className="text-balance font-display text-3xl font-medium text-neutral-900 sm:text-4xl sm:leading-[1.15]">
          Meet Our Team
        </h2>
        <p className="mt-3 text-pretty text-lg text-neutral-500">
          Discover the brilliance behind Embrace. Our team blends innovation and
          artistry to craft digital wonders that captivate.
        </p>
      </div>
      <div className="relative grid max-w-screen-lg grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-8 mt-20">
        {teamMembers.map((member) => (
          <TeamImage key={member.id} member={member} />
        ))}
      </div>
    </div>
  );
};

export default Teams;

function TeamImage({
  member,
}: {
  member: { id: number; name: string; role: string };
}) {
  return (
    <div className="flex flex-col items-center transition-all duration-500 group">
      {/* Image Wrapper */}
      <div className="transition-all duration-500 ease-out transform-gpu group-hover:scale-105">
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
            className="size-36 border border-neutral-200 object-cover transition-all duration-500
                     group-hover:border-neutral-300 group-hover:shadow-[0_0_15px_rgba(0,0,0,0.1)]"
            src={`/assets/team/mem${member.id}.jpeg`}
            alt={`Team member ${member.id}`}
          />
        </div>
      </div>

      {/* Text Container - Keeps space to avoid shifting */}
      <div className="w-full text-center min-h-[80px] flex flex-col justify-center items-center transition-all duration-500 opacity-0 group-hover:opacity-100 group-hover:mt-4">
        <h3 className="text-lg font-semibold text-neutral-900">
          {member.name}
        </h3>
        <p className="text-sm text-neutral-500">{member.role}</p>
      </div>
    </div>
  );
}
