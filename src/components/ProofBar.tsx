import React from "react";
import { Badge } from "./ui/Badge";

type ProofBarProps = {
  trustedByText?: string;
  outcomes?: string[];
  className?: string;
};

export function ProofBar({
  trustedByText = "Trusted by operators & SMB leaders",
  outcomes = ["+$1.2M ARR unlocked", "+8% margin on partnership revenue", "−34% cycle time from pitch to close"],
  className,
}: ProofBarProps) {
  return (
    <div
      className={
        "mt-6 flex flex-col items-center justify-center gap-2 text-xs text-[hsl(var(--muted-foreground))] sm:flex-row sm:gap-3 " +
        (className ?? "")
      }
    >
      <span className="whitespace-nowrap">{trustedByText}</span>
      <span className="hidden sm:inline" aria-hidden>
        •
      </span>
      <div className="flex flex-wrap items-center justify-center gap-1.5">
        {outcomes.map((value) => (
          <Badge key={value}>{value}</Badge>
        ))}
      </div>
    </div>
  );
}



