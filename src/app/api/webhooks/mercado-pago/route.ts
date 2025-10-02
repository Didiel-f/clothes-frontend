// app/api/strapi-order-webhook/route.ts
import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

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
  signatureHeader.split(",").forEach((part) => {
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
    } catch {
      /* ignore */
    }
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
  const eventType =
    url.searchParams.get("type") ||
    (() => {
      try {
        return JSON.parse(rawBody).type;
      } catch {
        return "";
      }
    })();

  if (!["payment", "payment.created", "payment.updated"].includes(eventType)) {
    return NextResponse.json({ received: true });
  }

  // 6) Consultar detalle en Mercado Pago
  let payment: any = null;
  try {
    console.log("🔍 Consultando pago en Mercado Pago, ID:", resourceId);
    const mpRes = await fetch(`https://api.mercadopago.com/v1/payments/${resourceId}`, {
      headers: { Authorization: `Bearer ${process.env.MP_ACCESS_TOKEN}` },
      cache: "no-store",
    });
    if (!mpRes.ok) {
      const t = await mpRes.text();
      console.error("❌ Error consultando MP:", mpRes.status, t);
      return NextResponse.json({ error: "MP fetch failed" }, { status: 502 });
    }
    payment = await mpRes.json();
    console.log("✅ Pago obtenido de MP. Status:", payment?.status);
    console.log("📦 Metadata del pago:", JSON.stringify(payment?.metadata, null, 2));
    console.log("📦 Additional info items:", JSON.stringify(payment?.additional_info?.items, null, 2));
  } catch (e) {
    console.error("❌ Excepción consultando MP:", e);
    return NextResponse.json({ error: "MP fetch exception" }, { status: 502 });
  }

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
    mpStatus === "approved" ? "approved" : mpStatus === "rejected" ? "rejected" : "pending";

  // order_status según estado de pago
  const order_status = payment_status === "approved" ? "Confirmado" : "Revisión";

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

  // Filtra los items de venta (excluye "shipping")
  const saleItems = (items || []).filter(
    (it: any) => String(it?.id || "").toLowerCase() !== "shipping"
  );

  console.log("🛒 Items recibidos del pago (total):", items?.length || 0);
  console.log("🛒 Items de venta (sin shipping):", saleItems.length);
  console.log("🛒 Datos de items de venta:", JSON.stringify(saleItems, null, 2));

  // Dedup + cantidades por documentId (el id del item en MP = documentId de variant)
  type QtyInfo = { qty: number; unitPrice?: number };
  const qtyMap = new Map<string, QtyInfo>();
  for (const it of saleItems) {
    const id = String(it?.id || "").trim();
    if (!id) continue;

    const qty =
      toNumber(it.quantity) ||
      toNumber(it?.orderItem?.quantity) ||
      toNumber(it?.qty) ||
      1;

    const unitPrice = toNumber(it.unit_price) || toNumber(it.price) || undefined;

    const prev = qtyMap.get(id) || { qty: 0, unitPrice };
    qtyMap.set(id, { qty: prev.qty + qty, unitPrice: prev.unitPrice ?? unitPrice });
  }

  const productDocIds = Array.from(qtyMap.keys());

  console.log("🔑 Product documentIds extraídos:", productDocIds);
  console.log("🔑 QtyMap completo:", JSON.stringify(Array.from(qtyMap.entries()), null, 2));

  // ⬇️ Construye payload de order_items.create (anidado)
  const order_items_create = Array.from(qtyMap, ([variantDocumentId, info]) => ({
    quantity: info.qty,
    ...(info.unitPrice != null ? { unitPrice: info.unitPrice } : {}),
    // Conectar la variant por documentId dentro del create anidado
    variant: { connect: [variantDocumentId] },
  }));

  // Datos base de la orden
  const orderDataBase = {
    mp_payment_id,
    client_email,
    payment_status, // 'approved' | 'pending' | 'rejected'
    order_status, // 'Confirmado' | 'Revisión' ...
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
    houseApartment: (meta.house_apartment as string) || "",
  } as const;

  const connectVariants =
    productDocIds.length > 0 ? { variants: { connect: productDocIds } } : {};

  // 3) Idempotencia por mp_payment_id
  let existingId: number | string | undefined;
  try {
    const existRes = await fetch(
      `${STRAPI_URL}/api/orders?filters[mp_payment_id][$eq]=${mp_payment_id}&pagination[pageSize]=1`,
      { headers: { Authorization: `Bearer ${STRAPI_TOKEN}` }, cache: "no-store" }
    );
    if (!existRes.ok) {
      const t = await existRes.text();
      console.error("❌ Error consultando orden existente:", existRes.status, t);
      return NextResponse.json({ error: "Strapi lookup failed" }, { status: 502 });
    }
    const existing = await existRes.json();
    existingId = existing?.data?.[0]?.id;
  } catch (e) {
    console.error("❌ Excepción consultando orden existente:", e);
    return NextResponse.json({ error: "Strapi lookup exception" }, { status: 502 });
  }

  if (existingId) {
    // === UPDATE: Solo actualizamos estado/valores; NO tocamos order_items ===
    try {
      const updateRes = await fetch(`${STRAPI_URL}/api/orders/${existingId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${STRAPI_TOKEN}`,
        },
        body: JSON.stringify({
          data: {
            ...orderDataBase,
            ...connectVariants, // opcional reconectar variants
            // no tocar order_items aquí para evitar duplicados
          },
        }),
      });

      if (!updateRes.ok) {
        const errTxt = await updateRes.text();
        console.error("❌ Error actualizando order en Strapi:", errTxt);
        return NextResponse.json({ error: "Strapi update failed" }, { status: 500 });
      }

      const updated = await updateRes.json();
      return NextResponse.json({ received: true, updated: updated?.data?.id ?? existingId });
    } catch (e) {
      console.error("❌ Excepción actualizando order en Strapi:", e);
      return NextResponse.json({ error: "Strapi update exception" }, { status: 500 });
    }
  } else {
    // === CREATE: Orden + order_items anidados en un solo POST ===
    const orderData = {
      ...orderDataBase,
      ...connectVariants,
      stock_adjusted: false, // para idempotencia del lifecycle
      ...(order_items_create.length ? { order_items: { create: order_items_create } } : {}),
    };

    try {
      const createRes = await fetch(`${STRAPI_URL}/api/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${STRAPI_TOKEN}`,
        },
        body: JSON.stringify({ data: orderData }),
      });

      if (!createRes.ok) {
        const err = await createRes.text();
        console.error("❌ Error creando order en Strapi:", err);
        return NextResponse.json({ error: "Strapi create failed" }, { status: 500 });
      }

      const created = await createRes.json();
      const createdOrderId = created?.data?.documentId || created?.data?.id;

      if (!createdOrderId) {
        console.error("❌ No se obtuvo id/documentId de la orden creada");
        return NextResponse.json({ error: "No order ID returned" }, { status: 500 });
      }

      console.log(`✅ Orden creada con ID: ${createdOrderId}`);
      return NextResponse.json({ received: true, created: createdOrderId });
    } catch (e) {
      console.error("❌ Excepción creando order en Strapi:", e);
      return NextResponse.json({ error: "Strapi create exception" }, { status: 500 });
    }
  }
}
