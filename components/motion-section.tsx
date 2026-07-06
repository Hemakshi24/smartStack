"use client";

import { motion, type HTMLMotionProps } from "framer-motion";

export function MotionSection({ children, className = "", ...props }: HTMLMotionProps<"section">) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.55, ease: "easeOut" }}
      className={className}
      {...props}
    >
      {children}
    </motion.section>
  );
}
