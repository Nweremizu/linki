import React from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const Teams = () => {
  return (
    <div className="grid items-center w-full h-full grid-cols-1 px-10 mt-12 lg:px-100 2xl:px-80 lg:grid-cols-2">
      <div className="grid w-full grid-cols-3 gap-x-8 gap-y-4 place-items-center">
        <Image
          src="/assets/team/mem1.jpeg"
          height={160}
          width={160}
          className="rounded-full size-40 object-cover"
          alt="Team Member"
        />
        <Image
          src="/assets/team/mem2.jpeg"
          height={160}
          width={160}
          className="rounded-full size-40 object-cover"
          alt="Team Member"
        />
        <Image
          src="/assets/team/mem3.jpeg"
          height={160}
          width={160}
          className="rounded-full size-40 object-cover"
          alt="Team Member"
        />
        <Image
          src="/assets/team/mem4.jpeg"
          height={160}
          width={160}
          className="rounded-full size-40 object-cover"
          alt="Team Member"
        />
        <Image
          src="/assets/team/mem5.jpeg"
          height={160}
          width={160}
          className="rounded-full size-40 object-cover"
          alt="Team Member"
        />
        <Image
          src="/assets/team/mem6.jpeg"
          height={160}
          width={160}
          className="rounded-full size-40 object-cover"
          alt="Team Member"
        />
      </div>
      <div className="flex flex-col items-start justify-between h-full py-10 mt-10 lg:mt-0 lg:ml-20">
        <h2 className="text-6xl font-light text-text-normal">Meet Our Team</h2>
        <p className="w-full mt-4 text-gray-500 text-start">
          Discover the brilliance behind Embrace. Our team blends innovation and
          artistry to craft digital wonders that captivate
        </p>
        <Button className="h-12 px-6 mt-6">Meet the team</Button>
      </div>
    </div>
  );
};

export default Teams;
