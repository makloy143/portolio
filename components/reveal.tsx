"use client";

import { motion, useReducedMotion, type HTMLMotionProps } from "framer-motion";

type RevealProps = HTMLMotionProps<"div"> & {
  delay?: number;
  /** Render as a list item when used directly inside <ul>/<ol>. */
  as?: "div" | "li";
};

/** Fades content up into view once. Respects `prefers-reduced-motion`. */
export function Reveal({ delay = 0, as = "div", children, ...props }: RevealProps) {
  const reduce = useReducedMotion();
  const Component = (as === "li" ? motion.li : motion.div) as typeof motion.div;

  return (
    <Component
      initial={reduce ? false : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay }}
      {...props}
    >
      {children}
    </Component>
  );
}
