// app/api/strapi-order-webhook/route.ts
import { NextRequest, NextResponse } from "next/server";
import { sendMail } from "lib/mailer";

// Opcional en Next.js 14+: asegura entorno Node (no edge) para Nodemailer
export const runtime = "nodejs";
export const dynamic = "force-dynamic"; // evita caching en prod

/* ============================
 * Tipos alineados a tus schemas
 * ============================ */
type PaymentStatus = "pending" | "approved" | "rejected";
type OrderStatus = "Confirmado" | "Revisión" | "Preparación" | "Entregado a courier";

type Variant = {
  id: number | string;
  title?: string;
  isShoe: boolean;
  shoesSize?: string | null;
  clotheSize?: string | null;
  stock: number;
  product?: {
    name?: string;
    price?: number | string;
  };
  // Por si guardas cantidad con otro nombre:
  quantity?: number | string;
  qty?: number | string;
  orderItem?: { quantity?: number | string };
};

type Order = {
  id: number | string;
  client_email?: string;
  email?: string;
  payment_status?: PaymentStatus;
  mp_payment_id?: number | string | null;
  totalPrice?: number | string | null;
  shippingPrice?: number | string | null;
  order_status?: OrderStatus;
  firstName?: string;
  lastName?: string;
  rut?: string;
  phone?: string;
  streetName?: string;
  streetNumber?: string;
  region?: string;
  county?: string;
  houseApartment?: string;
  variants?: Variant[];
  createdAt?: string;
};

/* =============
 * Utilidades
 * ============= */
const CLP = (n: number | string | null | undefined) =>
  new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "CLP",
    maximumFractionDigits: 0,
  }).format(Number(n ?? 0));

const nonEmpty = (s?: string | null) => (s ?? "").trim();

const renderAddress = (o: Order) =>
  [
    [o.streetName, o.streetNumber].filter(Boolean).join(" "),
    nonEmpty(o.houseApartment),
    [o.county, o.region].filter(Boolean).join(", "),
  ]
    .filter(Boolean)
    .join(" · ");

/* ============================
 * Ítems: mapeo específico Variant
 * ============================ */
function mapVariants(items: Variant[] = []) {
  return items.map((v) => {
    // Nombre: prioriza el del producto, luego title de la variante
    const title = v.product?.name || v.title || "Producto";

    // Talla desde la variante
    const size = v.isShoe ? v.shoesSize : v.clotheSize;
    const variantLabel = size ? `Talla: ${size}` : undefined;

    // Cantidad: intenta varios campos, fallback 1
    const qty = Number(v.quantity ?? v.qty ?? v.orderItem?.quantity ?? 1) || 1;

    // Precio unitario: viene del producto
    const unitPrice = Number(v.product?.price ?? 0);

    const subtotal = unitPrice * qty;

    return { title, variantLabel, qty, unitPrice, subtotal };
  });
}

function itemsAsHTML(items: ReturnType<typeof mapVariants>) {
  if (!items.length) return `<p><em>Sin ítems asociados.</em></p>`;

  const rows = items
    .map(
      (it) => `
    <tr>
      <td style="padding:8px 12px;border-bottom:1px solid #eee;">
        <div style="font-weight:600;">${it.title}</div>
        ${it.variantLabel ? `<div style="font-size:12px;color:#555;">${it.variantLabel}</div>` : ""}
      </td>
      <td style="padding:8px 12px;border-bottom:1px solid #eee;text-align:center;">${it.qty}</td>
      <td style="padding:8px 12px;border-bottom:1px solid #eee;text-align:right;">${CLP(it.unitPrice)}</td>
      <td style="padding:8px 12px;border-bottom:1px solid #eee;text-align:right;font-weight:600;">${CLP(it.subtotal)}</td>
    </tr>`
    )
    .join("");

  return `
  <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;border:1px solid #eee;border-radius:8px;overflow:hidden;">
    <thead>
      <tr style="background:#fafafa;">
        <th align="left" style="padding:10px 12px;border-bottom:1px solid #eee;">Producto</th>
        <th style="padding:10px 12px;border-bottom:1px solid #eee;">Cant.</th>
        <th align="right" style="padding:10px 12px;border-bottom:1px solid #eee;">Precio</th>
        <th align="right" style="padding:10px 12px;border-bottom:1px solid #eee;">Subtotal</th>
      </tr>
    </thead>
    <tbody>${rows}</tbody>
  </table>`;
}

function itemsAsText(items: ReturnType<typeof mapVariants>) {
  if (!items.length) return "Sin ítems asociados.";
  return items
    .map(
      (it) =>
        `• ${it.title}${it.variantLabel ? ` (${it.variantLabel})` : ""}  x${it.qty}  ${CLP(
          it.unitPrice
        )}  ==> ${CLP(it.subtotal)}`
    )
    .join("\n");
}

/* ============================
 * Handler Webhook
 * ============================ */
export async function POST(req: NextRequest) {
  // ——— Autenticación: soporta 'clave' o 'Authorization: Bearer <token>' ———
  const auth = req.headers.get("authorization") || "";
  const bearer = auth.toLowerCase().startsWith("bearer ")
    ? auth.slice(7).trim()
    : "";
  const token = req.headers.get("clave") || bearer;

  if (token !== process.env.STRAPI_WEBHOOK_SECRET) {
    console.log("⛔ token inválido");
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  // ——— Payload ———
  const body = await req.json();

  // Acepta entry.create (y si quieres también publish)
  const isEntryEvent = body.event === "entry.create" || body.event === "entry.publish";
  const model = body.model || body.uid;
  const isOrderModel = model === "order" || model === "api::order.order";

  if (!isEntryEvent || !isOrderModel) {
    console.log("ℹ️ Ignorado por evento/model:", { event: body?.event, model });
    return NextResponse.json({ ok: true, ignored: true });
  }

  try {
    const order: Order = body.entry ?? {};
    console.log("🔥 ORDEN (entrada limpia)", {
      id: order.id,
      client_email: order.client_email,
      totalPrice: order.totalPrice,
      variantsLen: order.variants?.length ?? 0,
    });

    const storeName = process.env.STORE_NAME || "Tu Tienda";
    const adminEmail =
      process.env.ADMIN_EMAIL || process.env.SMTP_FROM || process.env.SMTP_USER || "";

    // Datos base
    const orderId = order.id;
    const customerEmail = nonEmpty(order.client_email || order.email);
    const paymentStatus = order.payment_status || "pending";
    const orderStatus = order.order_status || "Confirmado";
    const mpId = order.mp_payment_id ?? undefined;

    const shippingPrice = Number(order.shippingPrice ?? 0);
    const reportedTotal = Number(order.totalPrice ?? 0);

    // Ítems
    const items = mapVariants(order.variants);
    console.log("🔥 ÍTEMS mapeados", items);
    const itemsTotal = items.reduce((acc, it) => acc + it.subtotal, 0);

    // Total final
    const grandTotal = reportedTotal || itemsTotal + shippingPrice;

    // Dirección
    const address = renderAddress(order);

    // ——— Emails (mismos que ya tienes) ———
    const customerHTML = /* ... deja tu HTML ... */ `
      <h2>${storeName}</h2>
      <p>¡Hola ${nonEmpty(order.firstName)}!</p>
      <!-- resto igual -->
    `;
    const customerText = /* ... deja tu texto ... */ `
${storeName} – Orden #${orderId}
...`.trim();

    const adminHTML = /* ... deja tu HTML ... */ `
      <h2>${storeName}</h2>
      <p><strong>Nueva orden #${orderId}</strong></p>
      <!-- resto igual -->
    `;
    const adminText = /* ... deja tu texto ... */ `
${storeName} – Nueva orden #${orderId}
...`.trim();


console.log("ENV check", {
  HAS_SMTP_HOST: !!process.env.SMTP_HOST,
  SMTP_PORT: process.env.SMTP_PORT,
  SMTP_SECURE: process.env.SMTP_SECURE,
  HAS_SMTP_USER: !!process.env.SMTP_USER,
  HAS_SMTP_PASS: !!process.env.SMTP_PASS,
  ADMIN_EMAIL: process.env.ADMIN_EMAIL,
});


    // ——— Envía correos con logs detallados ———
    const tasks: Promise<any>[] = [];
    if (customerEmail) {
      tasks.push(
        sendMail({
          to: customerEmail,
          subject: `¡Gracias por tu compra! Pedido #${orderId} – ${storeName}`,
          html: customerHTML,
          text: customerText,
        })
      );
    } else {
      console.log("⚠️ Sin email de cliente, no se envía correo al cliente");
    }

    if (adminEmail) {
      tasks.push(
        sendMail({
          to: adminEmail,
          subject: `Nueva orden #${orderId} – ${storeName}`,
          html: adminHTML,
          text: adminText,
        })
      );
    } else {
      console.log("⚠️ Sin email de admin (ADMIN_EMAIL/SMTP_FROM/SMTP_USER), no se envía correo admin");
    }

    const results = await Promise.allSettled(tasks);

    // —— LOG de resultados de Nodemailer —— 
    console.log(
      "📧 Resultados envío",
      JSON.stringify(
        results.map((r) =>
          r.status === "fulfilled"
            ? { status: "ok", accepted: r.value?.accepted, rejected: r.value?.rejected, response: r.value?.response }
            : { status: "error", reason: String((r as any).reason?.message || (r as any).reason) }
        ),
        null,
        2
      )
    );

    return NextResponse.json({ ok: true, results, orderId });
  } catch (error: any) {
    console.error("❌ Error enviando correos:", error?.message || error);
    return NextResponse.json({ error: "Error enviando correos" }, { status: 500 });
  }
}
