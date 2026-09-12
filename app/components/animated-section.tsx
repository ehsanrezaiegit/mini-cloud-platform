"use client";

import { motion } from "framer-motion";
import type { PropsWithChildren } from "react";

export function AnimatedSection({ children }: PropsWithChildren) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.45, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
