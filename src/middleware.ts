import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Canonicalize domain: redirect www -> apex (308) and preserve path/search
export function middleware(request: NextRequest) {
  const host = request.headers.get("host");
  if (!host) return NextResponse.next();

  // Skip local dev and preview deployments
  const isLocalhost = host.startsWith("localhost") || host.startsWith("127.0.0.1");
  const isVercelPreview = host.endsWith(".vercel.app") || host.endsWith(".vercel.dev") || host.endsWith(".vercel.live");
  if (isLocalhost || isVercelPreview) return NextResponse.next();

  // If www.smarttechinvest.com is used, redirect to apex smarttechinvest.com
  if (host === "www.smarttechinvest.com") {
    const url = new URL(request.url);
    url.host = "smarttechinvest.com";
    // protocol is preserved by the platform (Vercel forces HTTPS in prod)
    return NextResponse.redirect(url, 308);
  }

  return NextResponse.next();
}

// Exclude static assets and APIs
export const config = {
  matcher: [
    "/((?!_next/|api/|.*\\..*).*)",
  ],
};


