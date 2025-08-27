// lib/mailer.ts
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY!);

type MailInput = {
  to: string | string[];
  subject: string;
  html?: string;
  text?: string;
  cc?: string | string[];
  bcc?: string | string[];
  attachments?: { filename: string; content: string | Buffer }[];
};

export async function sendMail(input: MailInput) {
  const from =
    process.env.SMTP_FROM ||
    process.env.MAIL_FROM ||
    "Tienda <no-reply@zag.cl>"; // fallback por si olvidas el FROM

  const to = Array.isArray(input.to) ? input.to : [input.to];
  const cc = input.cc ? (Array.isArray(input.cc) ? input.cc : [input.cc]) : undefined;
  const bcc = input.bcc ? (Array.isArray(input.bcc) ? input.bcc : [input.bcc]) : undefined;

  const attachments =
    input.attachments?.map((a) => ({
      filename: a.filename,
      content: a.content as any, // Buffer o base64 string
    })) || undefined;

  try {
    const resp = await resend.emails.send({
      from,
      to,
      cc,
      bcc,
      subject: input.subject,
      html: input.html || input.text || "", // fallback a text o string vacío
      text: input.text || input.html?.replace(/<[^>]+>/g, " ") || "", // fallback a html sin tags o string vacío
      attachments,
      replyTo: from,
    });

    console.log("✅ Resend ok", resp);
    return resp;
  } catch (e: any) {
    console.error("✖️ Resend error:", e?.message || e);
    throw e;
  }
}
