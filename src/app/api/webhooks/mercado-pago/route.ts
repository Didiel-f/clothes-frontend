import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(req: NextRequest) {
  console.log('ME ESTOY LLAMANDO 🔥');

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

  // ===== Crear/actualizar orden en Strapi (con address) =====
  const STRAPI_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
  const STRAPI_TOKEN = process.env.STRAPI_API_TOKEN;
  if (!STRAPI_URL || !STRAPI_TOKEN) {
    console.error("Faltan STRAPI_URL o STRAPI_TOKEN");
    return NextResponse.json({ error: "Server misconfigured" }, { status: 500 });
  }

  // helper: convierte "57501" o "57.501" a number (57501)
  const toNumber = (v: unknown): number => {
    if (typeof v === "number") return v;
    if (v == null) return 0;
    const cleaned = String(v).replace(/[^\d.-]/g, "");
    const n = Number(cleaned);
    return Number.isFinite(n) ? n : 0;
  };

  // 1) Mapear estado MP -> enum de Strapi
  const mpStatus = String(payment?.status ?? "").toLowerCase();
  const payment_status: "approved" | "pending" | "rejected" =
    mpStatus === "approved" ? "approved"
      : mpStatus === "rejected" ? "rejected"
        : "pending";

  // order_status según estado de pago
  const order_status =
    payment_status === "approved" ? "Confirmado"
      : "Revisión";

  // 2) Datos desde metadata + fallbacks
  const meta = payment?.metadata ?? {};
  const items = Array.isArray(payment?.additional_info?.items) ? payment.additional_info.items : [];

  const shippingFromMeta = toNumber(meta.shipping_price);
  const shippingFromItems = toNumber((items.find((i: any) => i?.id === "shipping") || {}).unit_price);
  const shippingFromRoot = toNumber(payment?.shipping_amount);
  const shippingPrice = shippingFromMeta || shippingFromItems || shippingFromRoot;

  const totalPrice = toNumber(meta.total) || toNumber(payment?.transaction_amount);

  const client_email = (meta.email as string) || (payment?.payer?.email as string) || "";
  const firstName = (meta.first_name as string) || "";
  const lastName = (meta.last_name as string) || "";
  const rut = (meta.rut as string) || "";
  const phone = (meta.phone as string) || "";

  const mp_payment_id = Number(payment?.id);

  const orderData = {
    mp_payment_id,
    client_email,
    payment_status,
    order_status,
    totalPrice,
    shippingPrice,
    firstName,
    lastName,
    rut,
    phone,
    region: (meta.region_name as string) || "",
    county: (meta.county_name as string) || "",
    streetName: (meta.street_name as string) || "",
    streetNumber: (meta.street_number as string) || "",
    houseApartment: (meta.house_apartment as string) || ""
  };

  // 3) Idempotencia por mp_payment_id
  const existRes = await fetch(
    `${STRAPI_URL}/api/orders?filters[mp_payment_id][$eq]=${mp_payment_id}&pagination[pageSize]=1`,
    { headers: { Authorization: `Bearer ${STRAPI_TOKEN}` } }
  );
  const existing = await existRes.json();
  const existingId = existing?.data?.[0]?.id;

  if (existingId) {
    // Actualizar
    return NextResponse.json({ error: "Order update failed" }, { status: 500 });
  } else {
    // Crear
    const createRes = await fetch(`${STRAPI_URL}/api/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${STRAPI_TOKEN}`
      },
      body: JSON.stringify({ data: orderData })
    });

    if (!createRes.ok) {
      const err = await createRes.text();
      console.error("Error creando order en Strapi:", err);
      return NextResponse.json({ error: "Strapi create failed" }, { status: 500 });
    }

    const created = await createRes.json();
    console.log("🆕 Order creada en Strapi:", created?.data?.id, orderData);
  }

  return NextResponse.json({ received: true });
}