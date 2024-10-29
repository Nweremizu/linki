// import Spline from "@splinetool/react-spline";
import { Logo } from "@/components/ui/icons/logo";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import ShimmerButton from "../ui/shimmer-button";

export const STAGGER_CHILD_VARIANTS = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, type: "spring" } },
};

export default function ComingSoon() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  // const onLoad = () => {
  //   setLoading(false);
  // };

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  // workaround to avoid the blinking effect when Spline loads
  const [opacity] = useDebounce(loading ? 0 : 1, 200);

  const [showText] = useDebounce(loading ? false : true, 800);

  return (
    <motion.div
      className="z-10"
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3, type: "spring" }}
    >
      <div
        className={`${
          loading ? "scale-[25%] blur-md" : "scale-100 blur-0"
        } mt-[10vh] h-[30vh] w-screen object-cover transition-all duration-1000 `}
      >
        {/* <Spline
          onLoad={onLoad}
          style={{ opacity: opacity }}
          scene="https://assets.dub.co/misc/scene.splinecode"
        /> */}
        <Logo className="size-56 mx-auto" style={{ opacity: opacity }} />
      </div>
      {showText && (
        <motion.div
          variants={{
            show: {
              transition: {
                staggerChildren: 0.2,
              },
            },
          }}
          initial="hidden"
          animate="show"
          className="mx-5 flex flex-col items-center space-y-10 text-center sm:mx-auto"
        >
          <motion.h1
            className="font-display text-4xl font-bold text-gray-800 transition-colors sm:text-5xl"
            variants={STAGGER_CHILD_VARIANTS}
          >
            Coming Soon
          </motion.h1>
          <motion.p
            className="max-w-md text-gray-600 transition-colors sm:text-lg"
            variants={STAGGER_CHILD_VARIANTS}
          >
            We are working hard to bring you the best experience. Stay tuned!
          </motion.p>
          <motion.div variants={STAGGER_CHILD_VARIANTS}>
            <ShimmerButton
              //
              className="rounded-full bg-gray-800 px-10 py-2 font-medium text-white transition-colors hover:bg-black"
              onClick={() => router.push(`/app`)}
            >
              Go Back
            </ShimmerButton>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
}
