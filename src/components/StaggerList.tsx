"use client";
import { m } from "framer-motion";
import { durations } from "../lib/motion";
import * as React from "react";

export function StaggerList<T>({
  items,
  render,
}: {
  items: T[];
  render: (item: T, i: number) => React.ReactNode;
}) {
  return (
    <ul>
      {items.map((it, i) => (
        <m.li
          key={i}
          initial={{ opacity: 0, y: 6 }}
          whileInView={{ opacity: 1, y: 0, transition: { delay: i * 0.04, duration: durations.sm } }}
          viewport={{ once: true, margin: "-10% 0% -10% 0%" }}
        >
          {render(it, i)}
        </m.li>
      ))}
    </ul>
  );
}


