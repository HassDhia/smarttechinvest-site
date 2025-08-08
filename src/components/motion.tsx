"use client";
import { motion, MotionProps, useReducedMotion } from "framer-motion";
import * as React from "react";

export function FadeIn({ children, ...rest }: { children: React.ReactNode } & MotionProps) {
  const prefersReduced = useReducedMotion();
  if (prefersReduced) return <>{children}</>;
  return (
    <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true, margin: "-20%" }} transition={{ duration: 0.24, ease: [0.2, 0.8, 0.2, 1] }} {...rest}>
      {children}
    </motion.div>
  );
}

export function RiseIn({ children, ...rest }: { children: React.ReactNode } & MotionProps) {
  const prefersReduced = useReducedMotion();
  if (prefersReduced) return <>{children}</>;
  return (
    <motion.div initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-20%" }} transition={{ duration: 0.28, ease: [0.2, 0.8, 0.2, 1] }} {...rest}>
      {children}
    </motion.div>
  );
}

// Shared motion variants for overlays and panels
export const overlayVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.24, ease: [0.2, 0.8, 0.2, 1] } },
  exit: { opacity: 0, transition: { duration: 0.18 } },
};

export const panelVariants = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0, transition: { duration: 0.28, ease: [0.2, 0.8, 0.2, 1] } },
  exit: { opacity: 0, y: -4, transition: { duration: 0.2 } },
};


