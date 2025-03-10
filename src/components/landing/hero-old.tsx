"use client";

import Image from "next/image";
// import GridBackground from "../ui/grid-bg";
import { Button } from "../ui/button";
import { motion } from "framer-motion";
import Link from "next/link";
import GridBackground from "../ui/grid-bg";

export default function Hero() {
  return (
    <GridBackground>
      <div className="flex items-center justify-center w-full h-full px-10 lg:justify-between lg:px-100 2xl:px-64">
        <motion.div
          initial={{ opacity: 0, y: -70 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5, ease: "easeInOut" }}
          className="flex flex-col w-full space-y-8 lg:w-1/2">
          <div className="flex self-center px-6 py-3 lg:self-start rounded-3xl bg-primary-foreground w-fit">
            <p>
              Revolutionize your links with{" "}
              <span className="font-semibold">Linki</span> 👈
            </p>
          </div>
          <h1 className="text-5xl font-bold leading-snug text-center text-text-normal lg:text-start">
            Enhancing Digital Connections with Secure, Custom Links
          </h1>
          <p className="text-center text-text-light lg:text-start">
            Revolutionize Your Link Management: Instantly create smart,
            personalized, and protected short URLs. Elevate your online presence
            with our cutting-edge link shortening service, turning lengthy web
            addresses into powerful, tailored gateways to your digital content.
          </p>
          <div className="flex justify-center w-full space-x-4 lg:justify-start">
            <Link href={"/login"}>
              <Button size={"lg"}>Get Started</Button>
            </Link>
            <Link href={"/"}>
              <Button size={"lg"} variant={"outline"}>
                Learn More
              </Button>
            </Link>
          </div>
        </motion.div>
        <motion.div
          className="hidden lg:block"
          initial={{ opacity: 0, x: 80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.5, ease: "easeInOut" }}>
          <Image
            src={"./assets/hero.svg"}
            height={400}
            width={500}
            priority={true}
            alt="Hero Image"
            className="w-full h-full"
          />
        </motion.div>
      </div>
    </GridBackground>
  );
}
