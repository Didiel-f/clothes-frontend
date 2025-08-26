// lib/mailer.ts
import nodemailer from "nodemailer";
import dns from "dns";

// Evita problemas cuando el host tiene AAAA pero la red no enruta IPv6:
dns.setDefaultResultOrder("ipv4first");

const baseHost = process.env.SMTP_HOST;          // p.ej. smtp.hostinger.com
const baseUser = process.env.SMTP_USER;          // p.ej. ventas@tudominio.cl
const basePass = process.env.SMTP_PASS;

const baseOpts = {
  host: baseHost,
  auth: { user: baseUser, pass: basePass },
  connectionTimeout: 15_000,
  greetingTimeout: 10_000,
  socketTimeout: 20_000,
  tls: { minVersion: "TLSv1.2", servername: baseHost }, // SNI correcto
};

// Transport SSL 465
const tx465 = nodemailer.createTransport({
  ...baseOpts,
  port: 465,
  secure: true, // SSL puro
} as any);

// Transport STARTTLS 587 (fallback)
const tx587 = nodemailer.createTransport({
  ...baseOpts,
  port: 587,
  secure: false,  // empieza sin SSL
  requireTLS: true, // obliga upgrade a TLS
} as any);

type MailInput = {
  to: string | string[];
  subject: string;
  html?: string;
  text?: string;
  cc?: string | string[];
  bcc?: string | string[];
  attachments?: any[];
};

export async function sendMail(input: MailInput) {
  const message = {
    from: process.env.SMTP_FROM || baseUser,   // usa el mismo dominio que tu SMTP
    replyTo: process.env.REPLY_TO || baseUser,
    ...input,
  };

  // 1) intenta 465
  try {
    await tx465.verify();
    const info = await tx465.sendMail(message);
    console.log("✅ sendMail ok (465)", {
      id: info.messageId,
      accepted: info.accepted,
      rejected: info.rejected,
      response: info.response,
    });
    return info;
  } catch (e: any) {
    const msg = String(e?.message || e);
    console.warn("⚠️ 465 falló, probando 587 STARTTLS…", msg);
  }

  // 2) fallback a 587
  await tx587.verify();
  const info = await tx587.sendMail(message);
  console.log("✅ sendMail ok (587)", {
    id: info.messageId,
    accepted: info.accepted,
    rejected: info.rejected,
    response: info.response,
  });
  return info;
}
