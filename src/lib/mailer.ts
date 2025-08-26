
import nodemailer, { Transporter } from "nodemailer";

let cached: Transporter | null = null;

function must(name: string) {
  const v = process.env[name];
  if (!v) throw new Error(`Falta variable de entorno: ${name}`);
  return v;
}

export function getTransporter() {
  if (cached) return cached;

  const port = Number(process.env.SMTP_PORT ?? 465);
  const secure = port === 465;

  cached = nodemailer.createTransport({
    host: must("SMTP_HOST"),
    port,
    secure,
    auth: { user: must("SMTP_USER"), pass: must("SMTP_PASS") },
    pool: true,            // opcional: mejor rendimiento si envías varios
    maxConnections: 3,
    maxMessages: 50,
    requireTLS: !secure,   // exige STARTTLS en 587
  });

  return cached;
}

export async function sendMail(opts: {
  to: string | string[];
  subject: string;
  html: string;
  text?: string;
  replyTo?: string;
}) {
  const t = getTransporter();
  const text = opts.text ?? opts.html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();

  const info = await t.sendMail({
    from: must("SMTP_FROM"),
    to: opts.to,
    subject: opts.subject,
    html: opts.html,
    text,
    replyTo: opts.replyTo,
  });

  return { messageId: info.messageId, accepted: info.accepted, rejected: info.rejected };
}
