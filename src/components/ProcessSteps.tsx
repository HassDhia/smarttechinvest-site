"use client";
import { m } from "framer-motion";

const steps = [
  {
    number: "1",
    title: "Read the Signals",
  },
  {
    number: "2",
    title: "Build the Narrative & Deck Spine",
  },
  {
    number: "3",
    title: "Run the Outreach & Close",
  },
];

export function ProcessSteps() {
  return (
    <div className="grid gap-8 md:grid-cols-3">
      {steps.map((step, index) => (
        <m.div
          key={step.number}
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
          className="flex flex-col items-start"
        >
          <div className="text-4xl font-bold text-[hsl(var(--primary))] mb-2">
            {step.number}
          </div>
          <h3 className="text-xl font-semibold text-foreground">{step.title}</h3>
        </m.div>
      ))}
    </div>
  );
}

