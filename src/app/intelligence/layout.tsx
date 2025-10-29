import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Intelligence | Smart Technology Investments",
  description: "Daily signals and weekly briefs on technology investments, market trends, and strategic insights for operators and decision-makers.",
  openGraph: {
    title: "STI Intelligence",
    description: "Daily signals and weekly briefs on technology investments, market trends, and strategic insights.",
    type: "website",
    images: ["/intelligence/og/default.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "STI Intelligence",
    description: "Daily signals and weekly briefs on technology investments, market trends, and strategic insights.",
  },
};

export default function IntelligenceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
