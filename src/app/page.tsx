"use client";

// import Features from "@/components/landing/features";
import Footer from "@/components/landing/footer";
// import Hero from "@/components/landing/hero";
// import Stats from "@/components/landing/landing-stats";
import NavBar from "@/components/landing/nav-bar";
import Teams from "@/components/landing/team";
import { ButtonLink } from "@/components/ui/button-link";
import { Logo } from "@/components/ui/icons/logo";
import { BrowserGraphic } from "@/components/ui/landing/browser-graphic";
import { BubbleIcon } from "@/components/ui/landing/bubble-icon";
import { FeaturesSection } from "@/components/ui/landing/features-section";
import { Hero } from "@/components/ui/landing/hero";
import { NavMobile } from "@/components/ui/landing/nav-mobile";
import { TestimonialSection } from "@/components/ui/landing/testimonials-section";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <NavMobile />
      <NavBar />
      <div className="flex flex-col w-full h-full gap-10">
        {/* <Hero /> */}
        <Hero>
          <div className="relative mx-auto flex w-full max-w-xl flex-col items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                type: "spring",
                stiffness: 200, // Higher value = faster spring
                damping: 5, // Lower value = more bounce
                mass: 1, // Lower mass = faster movement
                duration: 1,
              }}
            >
              <BubbleIcon>
                <Logo className="size-10" />
              </BubbleIcon>
            </motion.div>
            <div className="mt-16 w-full">
              <BrowserGraphic domain="https://linki.com" />
            </div>
            <h1
              className={cn(
                "font-display mt-2 text-center text-4xl font-medium text-neutral-900 sm:text-5xl sm:leading-[1.15]",
                "animate-slide-up-fade motion-reduce:animate-fade-in [--offset:20px] [animation-duration:1s] [animation-fill-mode:both]"
              )}
            >
              Welcome to Linki
            </h1>
            <p
              className={cn(
                "mt-5 text-balance text-base text-neutral-700 sm:text-xl",
                "animate-slide-up-fade motion-reduce:animate-fade-in [--offset:10px] [animation-delay:200ms] [animation-duration:1s] [animation-fill-mode:both]"
              )}
            >
              This custom domain is powered by Linki &ndash; the link management
              platform designed for businesses and creatives.
            </p>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }} // Start off slightly below and invisible
            animate={{ opacity: 1, y: 0 }} // Fade in while moving up
            transition={{
              type: "spring",
              stiffness: 150, // Makes the movement snappy
              damping: 12, // Controls bounciness
              mass: 0.7, // Adjusts weight of motion
            }}
            className={cn(
              "xs:flex-row relative mx-auto mt-8 flex max-w-fit flex-row items-center gap-4"
            )}
          >
            <ButtonLink variant={"primary"} href="/register">
              Get Started
            </ButtonLink>
            <ButtonLink variant={"secondary"} href="/features">
              Learn More
            </ButtonLink>
          </motion.div>
        </Hero>
        {/* <Stats /> */}
        <FeaturesSection />
        <Teams />
        {/* <Testimonials /> */}
        <TestimonialSection />
        <Footer />
      </div>
    </div>
  );
}
