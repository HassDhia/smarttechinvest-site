"use client";
import * as React from "react";
import type { LucideIcon } from "lucide-react";
import { cn } from "../../lib/cn";

export interface IconProps extends React.SVGAttributes<SVGElement> {
  icon: LucideIcon;
  size?: number | string;
  strokeWidth?: number;
  className?: string;
  "aria-hidden"?: boolean | "true" | "false";
}

export function Icon({ icon: IconCmp, size, strokeWidth, className, children, ...rest }: IconProps) {
  return (
    <IconCmp
      className={cn("lucide", className)}
      // Let CSS tokens control by default; allow explicit override
      {...(size !== undefined ? { size } : {})}
      {...(strokeWidth !== undefined ? { strokeWidth } : {})}
      aria-hidden={rest["aria-hidden"] ?? true}
      {...rest}
    >
      {children}
    </IconCmp>
  );
}



