import { NextResponse } from "next/server";
import {
  BUDGET_OPTIONS,
  CONTACT_ENV,
  CONTACT_LIMITS,
  DEFAULT_CONTACT_TO,
  MIN_DESCRIPTION,
  MIN_FILL_MS,
  PROJECT_TYPES,
} from "@/config/contact";

/**
 * Server-side handler for project inquiries.
 *
 * Delivery uses Resend's HTTPS API (https://resend.com) so no extra npm
 * dependency is required. Credentials are read from server environment
 * variables only — never sent to, or bundled with, the browser.
 *
 * Required configuration:
 *   RESEND_API_KEY       Resend API key (starts with "re_")
 *   CONTACT_FROM_EMAIL   A verified sender, e.g. "GROWW TECH <hello@groww.tech>"
 * Optional:
 *   CONTACT_TO_EMAIL     Recipient (defaults to growwurself@gmail.com)
 */
export const runtime = "nodejs";

const RESEND_ENDPOINT = "https://api.resend.com/emails";
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX = 5;

/** Simple in-memory sliding-window limiter. Best-effort per instance. */
const requestLog = new Map<string, number[]>();

function getClientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]!.trim();
  return request.headers.get("x-real-ip")?.trim() || "unknown";
}

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (requestLog.get(ip) ?? []).filter(
    (time) => now - time < RATE_LIMIT_WINDOW_MS,
  );
  recent.push(now);
  requestLog.set(ip, recent);

  if (requestLog.size > 5000) {
    for (const [key, times] of requestLog) {
      if (times.every((time) => now - time >= RATE_LIMIT_WINDOW_MS)) {
        requestLog.delete(key);
      }
    }
  }

  return recent.length > RATE_LIMIT_MAX;
}

/** Trim, collapse whitespace and strip control characters. */
function sanitize(value: unknown, max: number, multiline = false): string {
  if (typeof value !== "string") return "";

  const normalized = multiline
    ? value
        .replace(/\r\n?/g, "\n")
        .replace(/[^\S\n]+/g, " ")
        .replace(/\n{3,}/g, "\n\n")
    : value.replace(/\s+/g, " ");

  const cleaned = normalized.replace(
    /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g,
    "",
  );

  return cleaned.trim().slice(0, max);
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function isEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value);
}

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json(
      { ok: false, error: "We couldn't read your submission. Please try again." },
      { status: 400 },
    );
  }

  // Honeypot — real visitors never fill this off-screen field.
  if (sanitize(body.website, 200).length > 0) {
    return NextResponse.json(
      { ok: false, error: "Your submission could not be processed." },
      { status: 400 },
    );
  }

  // Timing trap — bots submit near-instantly.
  const elapsed = Number(body.elapsedMs);
  if (Number.isFinite(elapsed) && elapsed >= 0 && elapsed < MIN_FILL_MS) {
    return NextResponse.json(
      { ok: false, error: "Your submission could not be processed." },
      { status: 400 },
    );
  }

  const ip = getClientIp(request);
  if (isRateLimited(ip)) {
    return NextResponse.json(
      {
        ok: false,
        error: "Too many inquiries from this connection. Please try again a little later.",
      },
      { status: 429 },
    );
  }

  const fullName = sanitize(body.fullName, CONTACT_LIMITS.fullName);
  const email = sanitize(body.email, CONTACT_LIMITS.email).toLowerCase();
  const projectType = sanitize(body.projectType, 40);
  const description = sanitize(body.description, CONTACT_LIMITS.description, true);
  let budget = sanitize(body.budget, CONTACT_LIMITS.budget);

  const fieldErrors: Record<string, string> = {};
  if (fullName.length < 2) fieldErrors.fullName = "Please enter your full name.";
  if (!isEmail(email)) fieldErrors.email = "Please enter a valid email address.";
  if (!(PROJECT_TYPES as readonly string[]).includes(projectType)) {
    fieldErrors.projectType = "Please choose a project type.";
  }
  if (description.length < MIN_DESCRIPTION) {
    fieldErrors.description = `Please describe your project in at least ${MIN_DESCRIPTION} characters.`;
  }
  if (budget && !(BUDGET_OPTIONS as readonly string[]).includes(budget)) {
    budget = "";
  }

  if (Object.keys(fieldErrors).length > 0) {
    return NextResponse.json(
      { ok: false, error: "Please review the highlighted fields.", fieldErrors },
      { status: 422 },
    );
  }

  const apiKey = process.env[CONTACT_ENV.apiKey];
  const from = process.env[CONTACT_ENV.from];
  const to = process.env[CONTACT_ENV.to] || DEFAULT_CONTACT_TO;

  if (!apiKey || !from) {
    const missing = [
      !apiKey ? CONTACT_ENV.apiKey : null,
      !from ? CONTACT_ENV.from : null,
    ].filter(Boolean);
    console.error(
      `[contact] Email delivery is not configured. Missing: ${missing.join(", ")}.`,
    );
    return NextResponse.json(
      {
        ok: false,
        code: "CONFIG_MISSING",
        error:
          "Email delivery is not configured yet. Please set the server environment variables RESEND_API_KEY and CONTACT_FROM_EMAIL.",
        missing,
      },
      { status: 503 },
    );
  }

  const budgetLabel = budget || "Not specified";
  const safeName = escapeHtml(fullName);
  const safeEmail = escapeHtml(email);
  const safeType = escapeHtml(projectType);
  const safeBudget = escapeHtml(budgetLabel);
  const safeDescription = escapeHtml(description).replace(/\n/g, "<br />");

  const subject = `New project inquiry — ${fullName} (${projectType})`;

  const html = `<!doctype html>
<html>
  <body style="margin:0;background:#f8f7f3;padding:24px;font-family:Arial,Helvetica,sans-serif;color:#16140f;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;margin:0 auto;background:#ffffff;border:1px solid #e6e2d9;border-radius:16px;overflow:hidden;">
      <tr>
        <td style="padding:24px 28px;background:#022c20;color:#ffffff;">
          <div style="font-size:12px;letter-spacing:0.18em;text-transform:uppercase;color:#71e2b9;">GROWW TECH</div>
          <div style="font-size:20px;font-weight:600;margin-top:6px;">New project inquiry</div>
        </td>
      </tr>
      <tr>
        <td style="padding:24px 28px;">
          <p style="margin:0 0 16px;font-size:15px;line-height:1.6;">You received a new inquiry from the website contact form.</p>
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="font-size:14px;line-height:1.6;">
            <tr><td style="padding:6px 0;color:#837c6f;width:150px;">Full name</td><td style="padding:6px 0;"><strong>${safeName}</strong></td></tr>
            <tr><td style="padding:6px 0;color:#837c6f;">Email</td><td style="padding:6px 0;"><a href="mailto:${safeEmail}" style="color:#007f5b;">${safeEmail}</a></td></tr>
            <tr><td style="padding:6px 0;color:#837c6f;">Project type</td><td style="padding:6px 0;">${safeType}</td></tr>
            <tr><td style="padding:6px 0;color:#837c6f;">Estimated budget</td><td style="padding:6px 0;">${safeBudget}</td></tr>
          </table>
          <hr style="border:none;border-top:1px solid #e6e2d9;margin:20px 0;" />
          <div style="font-size:12px;letter-spacing:0.12em;text-transform:uppercase;color:#837c6f;margin-bottom:8px;">Project description</div>
          <div style="font-size:14px;line-height:1.7;white-space:normal;">${safeDescription}</div>
        </td>
      </tr>
    </table>
  </body>
</html>`;

  const text = [
    "New project inquiry — GROWW TECH",
    "",
    `Full name: ${fullName}`,
    `Email: ${email}`,
    `Project type: ${projectType}`,
    `Estimated budget: ${budgetLabel}`,
    "",
    "Project description:",
    description,
  ].join("\n");

  try {
    const response = await fetch(RESEND_ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: email,
        subject,
        html,
        text,
      }),
    });

    if (!response.ok) {
      const detail = await response.text().catch(() => "");
      console.error(
        `[contact] Resend rejected the request (${response.status}).`,
        detail.slice(0, 300),
      );
      return NextResponse.json(
        {
          ok: false,
          code: "DELIVERY_FAILED",
          error:
            "We couldn't send your inquiry right now. Please try again in a moment or email us directly.",
        },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[contact] Unexpected error while sending email.", error);
    return NextResponse.json(
      {
        ok: false,
        code: "DELIVERY_FAILED",
        error:
          "We couldn't send your inquiry right now. Please try again in a moment or email us directly.",
      },
      { status: 502 },
    );
  }
}
