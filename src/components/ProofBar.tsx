import React from "react";
import { Badge } from "./ui/Badge";

type ProofBarProps = {
  trustedByText?: string;
  outcomes?: string[];
  className?: string;
};

export function ProofBar({
  trustedByText = "Trusted by SMB leaders",
  outcomes = ["+$1.2M ARR", "+8% margin", "−34% cycle"],
  className,
}: ProofBarProps) {
  return (
    <div
      className={
        "mt-6 flex flex-col items-center justify-center gap-2 text-xs text-[var(--muted)] sm:flex-row sm:gap-3 " +
        (className ?? "")
      }
    >
      <span className="whitespace-nowrap">{trustedByText}</span>
      <span className="hidden sm:inline" aria-hidden>
        •
      </span>
      <div className="flex flex-wrap items-center justify-center gap-1.5">
        <span className="font-medium">Outcomes:</span>
        {outcomes.map((value) => (
          <Badge
            key={value}
            className="bg-white/60 text-[var(--brand)] dark:bg-white/10"
          >
            {value}
          </Badge>
        ))}
      </div>
    </div>
  );
}


