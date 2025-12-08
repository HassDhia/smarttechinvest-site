import { Buffer } from "node:buffer";
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const MAX_ATTACHMENT_SIZE = 5 * 1024 * 1024; // 5MB

function getString(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

function formatHtmlMultiline(value: string) {
  return value ? value.replace(/\n/g, "<br />") : "—";
}

function formatTextMultiline(value: string) {
  return value || "—";
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const role = getString(formData, "role");
    const name = getString(formData, "name");
    const company = getString(formData, "company");
    const primaryLink = getString(formData, "primaryLink");
    const market = getString(formData, "market");
    const category = getString(formData, "category");
    const outcome = getString(formData, "outcome");
    const distributionSnapshot = getString(formData, "distributionSnapshot");
    const brandWork = getString(formData, "brandWork");
    const constraints = getString(formData, "constraints");
    const budgetReality = getString(formData, "budgetReality");
    const notes = getString(formData, "notes");

    const sendBriefs = formData.get("sendBriefs") === "on";
    const collaborationIntent = formData.get("collaborationIntent") === "on";

    if (!role || !name || !company || !primaryLink || !market || !category || !outcome || !distributionSnapshot || !budgetReality) {
      return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
    }

    const distributionFile = formData.get("distributionFile");
    let attachments: Array<{ filename: string; content: string; contentType?: string }> = [];
    let attachmentLabel = "None";

    if (distributionFile instanceof File && distributionFile.size > 0) {
      if (distributionFile.size > MAX_ATTACHMENT_SIZE) {
        return NextResponse.json({ error: "Attachment exceeds 5MB limit." }, { status: 400 });
      }
      const buffer = Buffer.from(await distributionFile.arrayBuffer());
      attachments.push({
        filename: distributionFile.name,
        content: buffer.toString("base64"),
        contentType: distributionFile.type || undefined,
      });
      const sizeInKb = Math.round(distributionFile.size / 1024);
      attachmentLabel = `${distributionFile.name} (${sizeInKb} KB)`;
    }

    const leadTo = process.env.LEAD_NOTIFY_EMAIL || "has.dhia@gmail.com";
    const from = process.env.LEADS_FROM_EMAIL || "onboarding@resend.dev";
    const apiKey = process.env.RESEND_API_KEY;

    if (!apiKey) {
      console.error("Missing RESEND_API_KEY environment variable");
      return NextResponse.json({ error: "Email service not configured" }, { status: 500 });
    }

    const resend = new Resend(apiKey);

    const subject = `New Consideration Request — ${name} (${company})`;

    const html = `
      <h2>New request for consideration</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Role:</strong> ${role}</p>
      <p><strong>Company / Handle:</strong> ${company}</p>
      <p><strong>Primary Link:</strong> <a href="${primaryLink}">${primaryLink}</a></p>
      <p><strong>Market:</strong> ${market}</p>
      <p><strong>Category:</strong> ${category}</p>
      <p><strong>Outcome Target:</strong> ${outcome}</p>
      <p><strong>Budget Reality:</strong> ${budgetReality}</p>
      <p><strong>Distribution Snapshot:</strong><br />${formatHtmlMultiline(distributionSnapshot)}</p>
      <p><strong>Past Brand Work:</strong> ${brandWork || "—"}</p>
      <p><strong>Constraints / Exclusions:</strong> ${constraints || "—"}</p>
      <p><strong>Notes:</strong><br />${formatHtmlMultiline(notes)}</p>
      <p><strong>Send briefs?</strong> ${sendBriefs ? "Yes" : "No"}</p>
      <p><strong>Collaboration intent?</strong> ${collaborationIntent ? "Yes" : "No"}</p>
      <p><strong>Distribution attachment:</strong> ${attachmentLabel}</p>
    `;

    const text = `New request for consideration\n\n` +
      `Name: ${name}\n` +
      `Role: ${role}\n` +
      `Company / Handle: ${company}\n` +
      `Primary Link: ${primaryLink}\n` +
      `Market: ${market}\n` +
      `Category: ${category}\n` +
      `Outcome Target: ${outcome}\n` +
      `Budget Reality: ${budgetReality}\n` +
      `Distribution Snapshot: ${formatTextMultiline(distributionSnapshot)}\n` +
      `Past Brand Work: ${brandWork || "—"}\n` +
      `Constraints / Exclusions: ${constraints || "—"}\n` +
      `Notes: ${formatTextMultiline(notes)}\n` +
      `Send briefs?: ${sendBriefs ? "Yes" : "No"}\n` +
      `Collaboration intent?: ${collaborationIntent ? "Yes" : "No"}\n` +
      `Distribution attachment: ${attachmentLabel}\n`;

    await resend.emails.send({
      from,
      to: [leadTo],
      subject,
      html,
      text,
      attachments: attachments.length > 0 ? attachments : undefined,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
