import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

function mapScore(value: string): number {
  return value === "High" ? 3 : value === "Medium" ? 2 : 1;
}

function recommendFor(score: number): { tier: string; rec: string } {
  const tier = score >= 9 ? "High Leverage" : score >= 6 ? "Good Foundation" : "Quick Wins";
  const rec =
    tier === "High Leverage"
      ? "Focus on pricing power, channel scale, and ops scale. Consider Fractional Strategy."
      : tier === "Good Foundation"
      ? "Clarify ICP and offers; deploy a weekly operating cadence; test 1–2 new channels."
      : "Start with a Clarity Sprint: messaging, one dashboard, and outbound hygiene.";
  return { tier, rec };
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { icp, pricing, pipeline, ops, email, url, referrer, userAgent } = body ?? {};

    if (![icp, pricing, pipeline, ops].every((v) => typeof v === "string")) {
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
    }

    const score = mapScore(icp) + mapScore(pricing) + mapScore(pipeline) + mapScore(ops);
    const { tier, rec } = recommendFor(score);

    const leadTo = process.env.LEAD_NOTIFY_EMAIL || "has.dhia@gmail.com";
    const from = process.env.LEADS_FROM_EMAIL || "onboarding@resend.dev";

    const subject = `New Growth Diagnostic Lead — ${tier} (${score}/12)`;
    const html = `
      <h2>New Growth Diagnostic Lead</h2>
      <p><strong>Score:</strong> ${score}/12 — ${tier}</p>
      <p><strong>Recommendation:</strong> ${rec}</p>
      <hr />
      <p><strong>Inputs</strong></p>
      <ul>
        <li>ICP: ${icp}</li>
        <li>Pricing: ${pricing}</li>
        <li>Pipeline: ${pipeline}</li>
        <li>Ops: ${ops}</li>
      </ul>
      <p><strong>User Email (optional):</strong> ${email || "—"}</p>
      <hr />
      <p><strong>Context</strong></p>
      <ul>
        <li>URL: ${url || "—"}</li>
        <li>Referrer: ${referrer || "—"}</li>
        <li>User-Agent: ${userAgent || "—"}</li>
      </ul>
    `;
    const text = `New Growth Diagnostic Lead\n\nScore: ${score}/12 — ${tier}\nRecommendation: ${rec}\n\nInputs:\n- ICP: ${icp}\n- Pricing: ${pricing}\n- Pipeline: ${pipeline}\n- Ops: ${ops}\n\nUser Email (optional): ${email || "—"}\n\nContext:\n- URL: ${url || "—"}\n- Referrer: ${referrer || "—"}\n- User-Agent: ${userAgent || "—"}\n`;

    await resend.emails.send({ from, to: [leadTo], subject, html, text });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}


