"use client";
import { motion, MotionProps, useReducedMotion } from "framer-motion";
import * as React from "react";
import { durations, easings, distances } from "../lib/motion";

export function FadeIn({ children, ...rest }: { children: React.ReactNode } & MotionProps) {
  const prefersReduced = useReducedMotion();
  if (prefersReduced) return <>{children}</>;
  return (
    <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true, margin: "-20%" }} transition={{ duration: durations.md, ease: easings.standard }} {...rest}>
      {children}
    </motion.div>
  );
}

export function RiseIn({ children, ...rest }: { children: React.ReactNode } & MotionProps) {
  const prefersReduced = useReducedMotion();
  if (prefersReduced) return <>{children}</>;
  return (
    <motion.div initial={{ opacity: 0, y: distances.md }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-20%" }} transition={{ duration: durations.lg, ease: easings.standard }} {...rest}>
      {children}
    </motion.div>
  );
}

// overlayVariants and panelVariants centralized in ../lib/motion


