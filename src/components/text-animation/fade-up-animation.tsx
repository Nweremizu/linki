import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export function FadeUpStagger({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const FADE_UP_ANIMATION_VARIANTS = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0, transition: { type: "spring" } },
  };
  return (
    <motion.div
      initial="hidden"
      animate="show"
      viewport={{ once: true }}
      variants={{
        hidden: {},
        show: {
          transition: {
            staggerChildren: 0.15,
          },
        },
      }}
    >
      <motion.h1
        className={cn(
          "text-center font-display font-bold drop-shadow-sm",

          className,
          "tracking-[-0.02em]"
        )}
        variants={FADE_UP_ANIMATION_VARIANTS}
      >
        {children}
      </motion.h1>
    </motion.div>
  );
}
