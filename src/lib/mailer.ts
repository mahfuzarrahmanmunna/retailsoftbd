import "server-only";

import nodemailer, { type Transporter } from "nodemailer";
import { site } from "@/lib/content";

let transporter: Transporter | null = null;

export const mailConfigured = () => Boolean(process.env.SMTP_USER && process.env.SMTP_PASS);

function getTransporter() {
  if (!transporter) {
    const port = Number(process.env.SMTP_PORT || 465);
    transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.gmail.com",
      port,
      secure: port === 465,
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
    });
  }
  return transporter;
}

const esc = (v: unknown) =>
  String(v ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

/** Strip CR/LF so visitor input can never inject extra mail headers. */
const oneLine = (v: unknown) => String(v ?? "").replace(/[\r\n]+/g, " ").trim();

type Row = [label: string, value: unknown];

/**
 * Email a new lead to the sales inbox. Throws on failure so the caller can decide what to do.
 * Reply-To is the visitor's email (when given), so "Reply" in Gmail answers them directly.
 */
export async function sendLeadEmail(opts: { subject: string; heading: string; rows: Row[]; replyTo?: string; phone?: string }) {
  const user = process.env.SMTP_USER!;
  const to = process.env.LEADS_EMAIL_TO || user;
  const rows = opts.rows.filter(([, v]) => v !== undefined && v !== null && String(v).trim() !== "");
  const digits = String(opts.phone ?? "").replace(/\D/g, "");
  const wa = digits ? `https://wa.me/${digits.startsWith("0") ? "88" + digits : digits}` : "";

  const html = `<!doctype html><html><body style="margin:0;background:#f3f6fa;font-family:Arial,Helvetica,sans-serif;color:#080f1a">
  <div style="max-width:600px;margin:0 auto;padding:24px">
    <div style="background:#14233c;color:#fff;border-radius:12px 12px 0 0;padding:20px 24px">
      <div style="font-size:13px;color:#00d4c7;font-weight:bold">${esc(site.name)} website</div>
      <div style="font-size:20px;font-weight:bold;margin-top:4px">${esc(opts.heading)}</div>
    </div>
    <table style="width:100%;border-collapse:collapse;background:#fff;border-radius:0 0 12px 12px">
      ${rows
        .map(
          ([k, v]) => `<tr><td style="padding:10px 24px;border-top:1px solid #e2e8f0;color:#4a5a72;font-size:14px;width:38%;vertical-align:top">${esc(k)}</td>
          <td style="padding:10px 24px;border-top:1px solid #e2e8f0;font-size:15px;white-space:pre-wrap">${esc(v)}</td></tr>`,
        )
        .join("")}
    </table>
    ${
      digits
        ? `<p style="margin:20px 0 0">
        <a href="tel:${esc(opts.phone)}" style="display:inline-block;background:#14233c;color:#fff;text-decoration:none;padding:10px 18px;border-radius:8px;font-weight:bold">Call ${esc(opts.phone)}</a>
        <a href="${esc(wa)}" style="display:inline-block;background:#1fa855;color:#fff;text-decoration:none;padding:10px 18px;border-radius:8px;font-weight:bold;margin-left:8px">WhatsApp</a></p>`
        : ""
    }
  </div></body></html>`;

  const text = `${opts.heading}\n\n${rows.map(([k, v]) => `${k}: ${v}`).join("\n")}`;

  await getTransporter().sendMail({
    from: { name: `${site.name} Website`, address: user },
    to,
    replyTo: opts.replyTo ? oneLine(opts.replyTo) : undefined,
    subject: oneLine(opts.subject).slice(0, 200),
    text,
    html,
  });
}
