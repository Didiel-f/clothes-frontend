import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(req: NextRequest) {

  const secret = process.env.MP_WEBHOOK_SECRET;
  if (!secret) {
    console.error("⚠️ MP_WEBHOOK_SECRET no configurado");
    return NextResponse.json({ error: "Server misconfigured" }, { status: 500 });
  }

  // 1) Cabeceras de firma
  const signatureHeader = req.headers.get("x-signature") || "";
  const requestId = req.headers.get("x-request-id") || "";
  if (!signatureHeader || !requestId) {
    console.warn("Headers faltantes");
    return NextResponse.json({ error: "Missing headers" }, { status: 401 });
  }

  // 2) Extraer ts y v1 de x-signature
  let ts: string | undefined, receivedHash: string | undefined;
  signatureHeader.split(",").forEach(part => {
    const [k, v] = part.split("=");
    if (k?.trim() === "ts") ts = v?.trim();
    if (k?.trim() === "v1") receivedHash = v?.trim();
  });
  if (!ts || !receivedHash) {
    console.warn("Formato de x-signature inválido");
    return NextResponse.json({ error: "Invalid signature format" }, { status: 401 });
  }

  // 3) Obtener resourceId (simulación pasa data.id en query)
  const url = new URL(req.url);
  let resourceId = url.searchParams.get("data.id") || "";
  // Si no viene en query, prueba body JSON
  const rawBody = await req.text();
  if (!resourceId && rawBody) {
    try {
      const parsed = JSON.parse(rawBody);
      resourceId = parsed?.data?.id?.toString() || "";
    } catch { /* ignore */ }
  }
  if (!resourceId) {
    console.warn("No se encontró resource ID");
    return NextResponse.json({ error: "Missing resource ID" }, { status: 400 });
  }

  // 4) Validar HMAC sobre el manifest
  const manifest = `id:${resourceId};request-id:${requestId};ts:${ts};`;
  const expectedHash = crypto.createHmac("sha256", secret).update(manifest).digest("hex");
  if (expectedHash !== receivedHash) {
    console.warn("❌ Firma inválida", { expectedHash, receivedHash });
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
  }

  // 5) Filtrar eventos (incluye el simulado 'payment')
  const eventType = url.searchParams.get("type") || (() => {
    try { return JSON.parse(rawBody).type; } catch { return ""; }
  })();
  if (!["payment", "payment.created", "payment.updated"].includes(eventType)) {
    return NextResponse.json({ received: true });
  }

  // 6) Consultar detalle en Mercado Pago
  const mpRes = await fetch(
    `https://api.mercadopago.com/v1/payments/${resourceId}`,
    { headers: { Authorization: `Bearer ${process.env.MP_ACCESS_TOKEN}` } }
  );
  const payment = await mpRes.json();
  console.log('payment', payment);

  return NextResponse.json({ received: true });
}
