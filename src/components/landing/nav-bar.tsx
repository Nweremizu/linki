"use client";

import Image from "next/image";
import { Button } from "../ui/button";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

export default function NavBar() {
  const [active, setActive] = useState("home");
  const { data: session } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (pathname === "/") {
      setActive("home");
    } else if (pathname === "/about") {
      setActive("about");
    } else if (pathname === "/contact") {
      setActive("contact");
    } else if (pathname === "/pricing") {
      setActive("pricing");
    }
  }, [router, pathname]);

  return (
    <nav className="flex items-center justify-between w-full px-10 py-4 h-fit lg:px-100 2xl:px-72 border-b border-gray-100 ">
      <Image
        src={"./assets/Logo.svg"}
        height={50}
        width={100}
        priority={true}
        alt="Logo"
      />
      <div className="flex items-center gap-4 font-medium text-gray-400">
        <Link
          href={"/"}
          className={`${active === "home" && "text-lg text-gray-600"}`}>
          Home
        </Link>
        <Link
          href={"/about"}
          className={`${active === "about" && "text-lg text-gray-600"}`}>
          About
        </Link>
        <Link
          href={"/contact"}
          className={`${active === "contact" && "text-lg text-gray-600"}`}>
          Contact
        </Link>
        <Link
          href={"/pricing"}
          className={`${active === "pricing" && "text-lg text-gray-600"}`}>
          Pricing
        </Link>
      </div>

      {!session?.user ? (
        <div className="flex items-center justify-center space-x-2">
          <Link href={"/login"}>
            <Button variant={"outline"}>Sign In</Button>
          </Link>
          <Link href={"/register"}>
            <Button>Get Started - no cc required</Button>
          </Link>
        </div>
      ) : (
        <div className="flex items-center justify-center space-x-2">
          <Link href={"/dashboard"}>
            <Button>Go to Dashboard</Button>
          </Link>
        </div>
      )}
    </nav>
  );
}
