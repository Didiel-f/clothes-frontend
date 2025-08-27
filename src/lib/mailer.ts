import { Resend } from "resend";

let _resend: Resend | null = null;
function getResend() {
  const key = process.env.RESEND_API_KEY;
  if (!key) {
    throw new Error("RESEND_API_KEY missing at runtime");
  }
  if (!_resend) _resend = new Resend(key);
  return _resend;
}

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
  const resend = getResend();

  const from =
    process.env.SMTP_FROM ||
    process.env.MAIL_FROM ||
    "Tienda <no-reply@zag.cl>";

  const to = Array.isArray(input.to) ? input.to : [input.to];
  const cc = input.cc ? (Array.isArray(input.cc) ? input.cc : [input.cc]) : undefined;
  const bcc = input.bcc ? (Array.isArray(input.bcc) ? input.bcc : [input.bcc]) : undefined;
  const attachments =
    input.attachments?.map(a => ({ filename: a.filename, content: a.content as any })) || undefined;

  const resp = await resend.emails.send({
    from,
    to,
    cc,
    bcc,
    subject: input.subject,
    html: input.html || input.text || "",
    text: input.text || input.html?.replace(/<[^>]+>/g, " ") || "",
    attachments,
    replyTo: from,
  });

  console.log("✅ Resend ok", resp);
  return resp;
}
