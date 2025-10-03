import { NextRequest, NextResponse } from "next/server";
import { sendMail } from "lib/mailer";

const STRAPI_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:1337";
const STRAPI_TOKEN = process.env.STRAPI_API_TOKEN;

/**
 * API para suscribirse al newsletter
 * Guarda el email en Strapi y envía un correo de bienvenida
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = body;

    // Validar email
    if (!email || !isValidEmail(email)) {
      return NextResponse.json(
        { error: "Email inválido" },
        { status: 400 }
      );
    }

    // 1. Guardar suscripción en Strapi
    if (STRAPI_TOKEN) {
      try {
        // Verificar si el email ya está suscrito
        const existingRes = await fetch(
          `${STRAPI_URL}/api/newsletter-subscriptions?filters[email][$eq]=${encodeURIComponent(email)}`,
          {
            headers: {
              Authorization: `Bearer ${STRAPI_TOKEN}`,
            },
          }
        );

        if (existingRes.ok) {
          const existing = await existingRes.json();
          
          if (existing?.data?.length > 0) {
            // Ya está suscrito
            return NextResponse.json(
              { 
                success: true, 
                message: "Ya estás suscrito a nuestro newsletter",
                alreadySubscribed: true 
              },
              { status: 200 }
            );
          }
        }

        // Crear nueva suscripción
        const subscriptionRes = await fetch(
          `${STRAPI_URL}/api/newsletter-subscriptions`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${STRAPI_TOKEN}`,
            },
            body: JSON.stringify({
              data: {
                email,
                subscribed_at: new Date().toISOString(),
                active: true,
              },
            }),
          }
        );

        if (!subscriptionRes.ok) {
          console.error("Error guardando suscripción en Strapi");
        }
      } catch (strapiError) {
        console.error("Error con Strapi:", strapiError);
        // Continuar aunque falle Strapi
      }
    }

    // 2. Enviar email de bienvenida
    try {
      await sendMail({
        to: email,
        subject: "¡Bienvenido a ZAG! 🎉",
        html: getWelcomeEmailTemplate(email),
      });

      console.log(`✅ Email de bienvenida enviado a: ${email}`);
    } catch (emailError) {
      console.error("Error enviando email:", emailError);
      // Aunque falle el email, la suscripción se guardó
      return NextResponse.json(
        { 
          success: true, 
          message: "Suscripción registrada, pero hubo un problema enviando el email",
          emailSent: false 
        },
        { status: 200 }
      );
    }

    return NextResponse.json(
      { 
        success: true, 
        message: "¡Gracias por suscribirte! Revisa tu correo.",
        emailSent: true 
      },
      { status: 200 }
    );

  } catch (error) {
    console.error("Error en suscripción al newsletter:", error);
    return NextResponse.json(
      { error: "Error al procesar la suscripción" },
      { status: 500 }
    );
  }
}

/**
 * Validar formato de email
 */
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Template del email de bienvenida
 */
function getWelcomeEmailTemplate(email: string): string {
  return `
    <!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Bienvenido a ZAG</title>
      <style>
        body {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          line-height: 1.6;
          color: #333;
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
          background-color: #f4f4f4;
        }
        .container {
          background-color: #ffffff;
          border-radius: 10px;
          padding: 40px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        .header {
          text-align: center;
          margin-bottom: 30px;
        }
        .logo {
          font-size: 32px;
          font-weight: bold;
          color: #D23F57;
          margin-bottom: 10px;
        }
        h1 {
          color: #D23F57;
          font-size: 28px;
          margin-bottom: 20px;
        }
        .content {
          font-size: 16px;
          color: #555;
          margin-bottom: 30px;
        }
        .benefits {
          background-color: #f9f9f9;
          border-left: 4px solid #D23F57;
          padding: 20px;
          margin: 20px 0;
        }
        .benefits h3 {
          color: #D23F57;
          margin-top: 0;
        }
        .benefits ul {
          margin: 10px 0;
          padding-left: 20px;
        }
        .benefits li {
          margin: 10px 0;
        }
        .cta {
          text-align: center;
          margin: 30px 0;
        }
        .button {
          display: inline-block;
          padding: 15px 40px;
          background-color: #D23F57;
          color: #ffffff;
          text-decoration: none;
          border-radius: 5px;
          font-weight: bold;
          transition: background-color 0.3s;
        }
        .button:hover {
          background-color: #b8334a;
        }
        .footer {
          text-align: center;
          margin-top: 40px;
          padding-top: 20px;
          border-top: 1px solid #eee;
          font-size: 14px;
          color: #999;
        }
        .social-icons {
          margin: 20px 0;
        }
        .social-icons a {
          display: inline-block;
          margin: 0 10px;
          color: #D23F57;
          text-decoration: none;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <div class="logo">ZAG</div>
          <h1>¡Bienvenido a nuestra comunidad! 🎉</h1>
        </div>

        <div class="content">
          <p>Hola,</p>
          <p>¡Gracias por suscribirte a ZAG! Estamos emocionados de tenerte con nosotros.</p>
        </div>

        <div class="benefits">
          <h3>Como suscriptor, disfrutarás de:</h3>
          <ul>
            <li>✨ <strong>Descuentos exclusivos</strong> antes que nadie</li>
            <li>🎁 <strong>Ofertas especiales</strong> solo para suscriptores</li>
            <li>👟 <strong>Novedades</strong> de productos antes de su lanzamiento</li>
            <li>📦 <strong>Envío gratis</strong> en promociones especiales</li>
            <li>🎂 <strong>Descuento de cumpleaños</strong> especial para ti</li>
          </ul>
        </div>

        <div class="content">
          <p>Mantente atento a tu bandeja de entrada para recibir nuestras mejores ofertas y novedades.</p>
        </div>

        <div class="cta">
          <a href="${process.env.NEXT_PUBLIC_BASE_URL || 'https://www.zag.cl/'}" class="button">
            Explorar ZAG
          </a>
        </div>

        <div class="footer">
          <div class="social-icons">
            <a href="#">Facebook</a> | 
            <a href="https://www.instagram.com/zag.cl?igsh=MWdscGNlaDZ3OGYxYg==">Instagram</a> | 
            <a href="#">Twitter</a>
          </div>
          <p>
            Recibiste este email porque te suscribiste a nuestro newsletter en <strong>ZAG</strong>
          </p>
          <p style="font-size: 12px; color: #aaa;">
            Si no deseas recibir más emails, puedes 
            <a href="${process.env.NEXT_PUBLIC_BASE_URL || 'https://www.zag.cl/'}/unsubscribe?email=${encodeURIComponent(email)}" style="color: #D23F57;">darte de baja aquí</a>
          </p>
        </div>
      </div>
    </body>
    </html>
  `;
}

