"use client";
import { motion, MotionProps } from "framer-motion";
import * as React from "react";

export function FadeIn({ children, ...rest }: { children: React.ReactNode } & MotionProps) {
  return (
    <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true, margin: "-20%" }} transition={{ duration: 0.4 }} {...rest}>
      {children}
    </motion.div>
  );
}

export function RiseIn({ children, ...rest }: { children: React.ReactNode } & MotionProps) {
  return (
    <motion.div initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-20%" }} transition={{ duration: 0.4 }} {...rest}>
      {children}
    </motion.div>
  );
}


