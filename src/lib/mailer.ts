// lib/mailer.ts
import nodemailer from "nodemailer";

const port = Number(process.env.SMTP_PORT || 465);
const secure = String(process.env.SMTP_SECURE ?? "true") !== "false";

export const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,            // p.ej. smtp.hostinger.com
  port,                                   // 465 (SSL) o 587 (STARTTLS)
  secure,                                 // true si 465, false si 587
  auth: {
    user: process.env.SMTP_USER,          // email completo (ventas@tudominio.cl)
    pass: process.env.SMTP_PASS,          // contraseña del buzón
  },
  connectionTimeout: 10_000,
  greetingTimeout: 10_000,
  socketTimeout: 20_000,
  // Si te aparece error de certificados en dev, descomenta:
  // tls: { rejectUnauthorized: false },
});

// Verificación de conexión (se loguea 1 vez por boot del proceso)
transporter.verify((err, success) => {
  if (err) {
    console.error("✖️ SMTP verify error:", err.message || err);
  } else {
    console.log("✅ SMTP listo para enviar (verify):", success);
  }
});

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
  try {
    const info = await transporter.sendMail({
      from: process.env.SMTP_FROM || process.env.SMTP_USER, // mismo dominio que SMTP
      replyTo: process.env.REPLY_TO || process.env.SMTP_USER,
      ...input,
    });

    console.log("✅ sendMail ok", {
      messageId: info.messageId,
      accepted: info.accepted,
      rejected: info.rejected,
      response: info.response,
    });

    return info;
  } catch (e: any) {
    console.error("✖️ sendMail error:", e?.message || e);
    throw e;
  }
}
