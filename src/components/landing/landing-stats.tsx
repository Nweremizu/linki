"use client";

import { motion } from "framer-motion";

export default function Stats() {
  return (
    <>
      <div className="px-10 py-12 bg-white lg:px-100 2xl:px-64">
        <motion.div
          className="mb-2 text-4xl font-bold text-text-normal"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{
            amount: "all",
            once: true,
          }}
          transition={{ duration: 0.5 }}>
          Boost Your Business
        </motion.div>
        <motion.div
          className="border-2 border-text-normal rounded-3xl flex divide-text-normal divide-x-2 h-[144px] relative"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{
            amount: "some",
            once: true,
          }}
          transition={{ duration: 0.5 }}>
          {["1.2M Links Created", "$1.2M Saved", "300K Clicks"].map(
            (text, index) => (
              <div
                key={index}
                className="flex items-center justify-center w-full h-full">
                <motion.div
                  className="flex text-xl font-semibold text-center lg:text-3xl font-sec"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}>
                  <p>
                    <span
                      className={
                        index === 0 || index === 2 ? "text-primary" : ""
                      }>
                      {text.split(" ")[0]}{" "}
                    </span>
                    <br />
                    {text.split(" ").slice(1).join(" ")}
                  </p>
                </motion.div>
              </div>
            )
          )}
          <div className="absolute top-0 left-0 !border-l-0">
            {/* SVG 1 */}
            <svg
              width="71"
              height="97"
              viewBox="0 0 71 97"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <g clipPath="url(#clip0_84_382)">
                <path
                  d="M7.5 96.3803C42.5701 96.3803 71 67.9504 71 32.8803C71 -2.18977 42.5701 -30.6197 7.5 -30.6197C-27.5701 -30.6197 -56 -2.18977 -56 32.8803C-56 67.9504 -27.5701 96.3803 7.5 96.3803Z"
                  fill="#DCCDFF"
                />
                <path
                  d="M-0.5 84.3803C34.5701 84.3803 63 55.9504 63 20.8803C63 -14.1898 34.5701 -42.6197 -0.5 -42.6197C-35.5701 -42.6197 -64 -14.1898 -64 20.8803C-64 55.9504 -35.5701 84.3803 -0.5 84.3803Z"
                  fill="#4D03FD"
                />
                <path
                  d="M-8.5 64.3803C26.5701 64.3803 55 35.9504 55 0.88031C55 -34.1898 26.5701 -62.6197 -8.5 -62.6197C-43.5701 -62.6197 -72 -34.1898 -72 0.88031C-72 35.9504 -43.5701 64.3803 -8.5 64.3803Z"
                  fill="#E0FF22"
                />
              </g>
              <defs>
                <clipPath id="clip0_84_382">
                  <path
                    d="M0 20C0 8.95431 8.95431 0 18 0H71V97H0V20Z"
                    fill="white"
                  />
                </clipPath>
              </defs>
            </svg>
          </div>
          <div className="absolute bottom-0 right-0 !border-l-0">
            {/* SVG 2 */}
            <svg
              width="119"
              height="90"
              viewBox="0 0 119 90"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <g clipPath="url(#clip0_85_391)">
                <path
                  d="M58.4219 31.1509C26.1563 44.8928 11.1398 82.1892 24.8816 114.455C38.6234 146.721 75.9199 161.737 108.186 147.995C140.451 134.253 155.468 96.9569 141.726 64.6913C127.984 32.4256 90.6876 17.4091 58.4219 31.1509Z"
                  fill="#DCCDFF"
                />
                <path
                  d="M70.4842 39.0567C38.2185 52.7985 23.202 90.095 36.9439 122.361C50.6857 154.626 87.9821 169.643 120.248 155.901C152.513 142.159 167.53 104.863 153.788 72.597C140.046 40.3314 102.75 25.3149 70.4842 39.0567Z"
                  fill="#4D03FD"
                />
                <path
                  d="M85.6812 54.3229C53.4155 68.0648 38.399 105.361 52.1409 137.627C65.8827 169.893 103.179 184.909 135.445 171.167C167.71 157.425 182.727 120.129 168.985 87.8633C155.243 55.5976 117.947 40.5811 85.6812 54.3229Z"
                  fill="#E0FF22"
                />
              </g>
              <defs>
                <clipPath id="clip0_85_391">
                  <path
                    d="M0 0H119V70C119 81.0457 110.046 90 99 90H0V0Z"
                    fill="white"
                  />
                </clipPath>
              </defs>
            </svg>
          </div>
        </motion.div>
      </div>
      <motion.div
        className="flex flex-col gap-4 px-10 py-12 bg-white lg:px-100 2xl:px-64 md:flex-row"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{
          amount: "all",
          once: true,
        }}
        transition={{ duration: 0.5 }}>
        <div className="w-full text-3xl font-bold md:w-1/2 lg:text-4xl text-text-normal">
          Custom Links & Advanced Analytics for Performance Tracking
        </div>
        <div className="w-full text-sm md:w-1/2 text-light text-text-light">
          Our website provides a user-friendly interface, making it easy for you
          to shorten and customize your links. With our comprehensive analytics,
          you can track the performance of your links and gain valuable
          insights. Our platform is designed to help you boost your business and
          achieve your goals.
        </div>
      </motion.div>
    </>
  );
}
