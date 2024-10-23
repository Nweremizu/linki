"use client";
import { motion } from "framer-motion";
import { Button } from "../ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Features() {
  return (
    <div className="flex items-center justify-center w-full h-full px-10 lg:px-100 2xl:px-80">
      <div className="flex flex-col w-full space-y-8 overflow-x-hidden">
        <div
          className="flex flex-col items-center w-full gap-4 py-4 lg:gap-20 lg:flex-row"
          id="custom-alias">
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ margin: "200px", once: true }}
            transition={{ duration: 1, delay: 0.5, ease: "easeInOut" }}
            className="w-full">
            <Image
              src={"./assets/features1.svg"}
              height={200}
              width={200}
              alt="Feature 1"
              className="w-[90%]"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: -100 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ margin: "200px", once: true }}
            transition={{ duration: 1, delay: 0.5, ease: "easeInOut" }}
            className="flex flex-col w-full space-y-4 ">
            <h1 className="text-2xl font-bold lg:text-4xl text-text-normal text-start">
              Custom Aliases
            </h1>
            <p className="text-text-light text-sm lg:text-lg text-start 2xl:w-[80%]">
              With Linki, your short links become an extension of your brand.
              Our custom alias feature allows you to create personalized,
              memorable URLs that align perfectly with your branding strategy.
              Whether it&apos;s for a marketing campaign, a product launch, or a
              corporate event, your links will stand out and make an impact.
            </p>
          </motion.div>
        </div>
        {/* feat 2 */}
        <div
          className="flex flex-col-reverse items-center w-full gap-4 py-4 lg:gap-20 lg:flex-row"
          id="link-management">
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ margin: "200px", once: true }}
            transition={{ duration: 1, delay: 0.5, ease: "easeInOut" }}
            className="flex flex-col w-full space-y-4 ">
            <h1 className="text-2xl font-bold lg:text-4xl text-text-normal text-start">
              Advanced Analytics Dashboard
            </h1>
            <p className="text-text-light text-sm lg:text-lg text-start 2xl:w-[80%]">
              Dive deep into your link performance with our comprehensive
              analytics dashboard. Linki provides real-time data visualization,
              advanced metrics, and user engagement insights that go far beyond
              basic click tracking. From heat maps to user demographics, browser
              statistics to peak traffic times, you&apos;ll have all the data
              you need to make informed decisions. Gain valuable insights,
              optimize your campaigns, and maximize your ROI.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ margin: "200px", once: true }}
            transition={{ duration: 1, delay: 0.5, ease: "easeInOut" }}
            className="w-full">
            <Image
              src={"./assets/features2.svg"}
              height={200}
              width={200}
              alt="Feature 1"
              className="w-[90%]"
            />
          </motion.div>
        </div>
        {/* feat 3 */}
        <div
          className="flex flex-col items-center w-full gap-4 py-4 lg:gap-20 lg:flex-row"
          id="flexible-link-expiration">
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ margin: "200px", once: true }}
            transition={{ duration: 1, delay: 0.5, ease: "easeInOut" }}
            className="w-full">
            <Image
              src={"./assets/features3.svg"}
              height={200}
              width={200}
              alt="Feature 3"
              className="w-[90%]"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: -100 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ margin: "200px", once: true }}
            transition={{ duration: 1, delay: 0.5, ease: "easeInOut" }}
            className="flex flex-col w-full space-y-4">
            <h1 className="text-2xl font-bold lg:text-4xl text-text-normal text-start ">
              Flexible Link Expiration
            </h1>
            <p className="text-text-light text-sm lg:text-lg text-start 2xl:w-[80%]">
              Take control of your links with Linki&apos;s flexible expiration
              feature. Set an expiration date for your short URLs to ensure that
              they are only active for as long as you need them. Whether
              it&apos;s a limited-time offer, a temporary promotion, or an
              event-specific link, you can rest assured that your links will
              automatically expire when the time comes. No more broken links, no
              more outdated content, just seamless link management.
            </p>
          </motion.div>
        </div>
        {/* feat 4 */}
        <div
          className="flex flex-col-reverse items-center w-full gap-4 py-4 lg:gap-20 lg:flex-row"
          id="link-management">
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ margin: "200px", once: true }}
            transition={{ duration: 1, delay: 0.5, ease: "easeInOut" }}
            className="flex flex-col w-full space-y-4">
            <h1 className="text-2xl font-bold lg:text-4xl text-text-normal text-start">
              Geolocation Targeting
            </h1>
            <p className="text-text-light text-sm lg:text-lg text-start 2xl:w-[80%]">
              Tailor your links to specific audiences with Linki&apos;s
              geolocation targeting feature. Create custom URLs that redirect
              users based on their location, language, or IP address. Whether
              you&apos;re running a global campaign, a regional promotion, or a
              local event, you can deliver personalized content to your target
              audience with ease. Enhance user experience, increase engagement,
              and drive conversions with geolocation targeting.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ margin: "200px", once: true }}
            transition={{ duration: 1, delay: 0.5, ease: "easeInOut" }}
            className="w-full">
            <Image
              src={"./assets/features4.svg"}
              height={200}
              width={200}
              alt="Feature 4"
              className="w-[90%]"
            />
          </motion.div>
        </div>
        {/* feat 5 */}
        <div
          className="flex flex-col items-center w-full gap-4 py-4 lg:gap-20 lg:flex-row"
          id="flexible-link-expiration">
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ margin: "200px", once: true }}
            transition={{ duration: 1, delay: 0.5, ease: "easeInOut" }}
            className="w-full">
            <Image
              src={"./assets/features5.svg"}
              height={200}
              width={200}
              alt="Feature 5"
              className="w-[90%]"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: -100 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ margin: "200px", once: true }}
            transition={{ duration: 1, delay: 0.5, ease: "easeInOut" }}
            className="flex flex-col w-full space-y-4">
            <h1 className="text-2xl font-bold lg:text-4xl text-text-normal text-start">
              Password Protected Links
            </h1>
            <p className="text-text-light text-sm lg:text-lg text-start 2xl:w-[80%]">
              Keep your links secure with Linki&apos;s password protection
              feature. Add an extra layer of security to your short URLs by
              setting a password that users must enter before accessing the
              content. Whether it&apos;s confidential information, sensitive
              data, or premium content, you can ensure that only authorized
              users can view your links. Protect your links, safeguard your
              data, and maintain control over your content. Ensure that only
              authorized users can access your links.
            </p>
          </motion.div>
        </div>
        <div className="hidden py-10 lg:flex">
          <div className="flex bg-[#4D03FD] rounded-[19px] w-full h-fit">
            <div className="w-full h-fit bg-[#4D03FD] relative rounded-[20px]">
              <svg
                width="746"
                height="372"
                viewBox="0 0 746 372"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0_95_402)">
                  <path
                    d="M39.966 188.227C39.966 316.272 143.102 420.073 270.326 420.073C397.55 420.073 500.686 316.272 500.686 188.227C500.686 60.182 397.55 -43.619 270.326 -43.619C143.102 -43.619 39.966 60.182 39.966 188.227Z"
                    fill="url(#paint0_linear_95_402)"
                  />
                  <path
                    d="M284.574 188.227C284.574 316.272 387.71 420.073 514.934 420.073C642.158 420.073 745.294 316.272 745.294 188.227C745.294 60.182 642.158 -43.619 514.934 -43.619C387.71 -43.619 284.574 60.182 284.574 188.227Z"
                    fill="url(#paint1_linear_95_402)"
                  />
                  <path
                    d="M-179.785 188.227C-179.785 316.272 -76.6491 420.073 50.5752 420.073C177.799 420.073 280.935 316.272 280.935 188.227C280.935 60.182 177.799 -43.619 50.5752 -43.619C-76.6491 -43.619 -179.785 60.182 -179.785 188.227Z"
                    fill="url(#paint2_linear_95_402)"
                  />
                  <path
                    d="M-399.537 188.227C-399.537 316.272 -296.401 420.073 -169.177 420.073C-41.9527 420.073 61.183 316.272 61.183 188.227C61.183 60.182 -41.9527 -43.619 -169.177 -43.619C-296.401 -43.619 -399.537 60.182 -399.537 188.227Z"
                    fill="url(#paint3_linear_95_402)"
                  />
                </g>
                <defs>
                  <linearGradient
                    id="paint0_linear_95_402"
                    x1="460.148"
                    y1="190.388"
                    x2="11.378"
                    y2="211.723"
                    gradientUnits="userSpaceOnUse">
                    <stop stopColor="#4D03FD" />
                    <stop offset="1" stopColor="#DCCDFF" />
                  </linearGradient>
                  <linearGradient
                    id="paint1_linear_95_402"
                    x1="704.756"
                    y1="190.388"
                    x2="255.986"
                    y2="211.723"
                    gradientUnits="userSpaceOnUse">
                    <stop stopColor="#4D03FD" />
                    <stop offset="1" stopColor="#DCCDFF" />
                  </linearGradient>
                  <linearGradient
                    id="paint2_linear_95_402"
                    x1="240.397"
                    y1="190.388"
                    x2="-208.373"
                    y2="211.723"
                    gradientUnits="userSpaceOnUse">
                    <stop stopColor="#4D03FD" />
                    <stop offset="1" stopColor="#DCCDFF" />
                  </linearGradient>
                  <linearGradient
                    id="paint3_linear_95_402"
                    x1="20.6451"
                    y1="190.388"
                    x2="-428.125"
                    y2="211.723"
                    gradientUnits="userSpaceOnUse">
                    <stop stopColor="#4D03FD" />
                    <stop offset="1" stopColor="#DCCDFF" />
                  </linearGradient>
                  <clipPath id="clip0_95_402">
                    <rect width="746" height="372" rx="20" fill="white" />
                  </clipPath>
                </defs>
              </svg>
              <div className="flex absolute top-0 left-0 w-full h-full  rounded-[20px] px-12 lg:px-32 justify-between gap-8">
                <h1 className="flex items-center h-full text-6xl font-medium text-white font-sec ">
                  Elevate Your Brand with Linki
                </h1>
                <div className="flex flex-col justify-center h-full space-y-6">
                  <p className="text-lg font-light leading-snug text-white">
                    Ready to transform your digital dresence? Let&apos;s create
                    magic together! book our services now!
                  </p>
                  <Link href={"/register"}>
                    <Button className="px-12 py-8 text-2xl font-medium bg-btn text-text-normal w-fit hover:bg-bg-sec">
                      Get Started
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
