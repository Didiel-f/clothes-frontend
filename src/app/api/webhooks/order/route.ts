// app/api/strapi-order-webhook/route.ts
import { NextRequest, NextResponse } from "next/server";
import { sendMail } from "lib/mailer";

// Opcional en Next.js 14+: asegura entorno Node (no edge) para Nodemailer
export const runtime = "nodejs";

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
  // 1) Seguridad: secreto en header "clave"

  const token = req.headers.get("clave");
  if (token !== process.env.STRAPI_WEBHOOK_SECRET) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  // 2) Validación de evento
  const body = await req.json();
  if (body.event !== "entry.create" || body.uid !== "api::order.order") {
    return NextResponse.json({ ok: true, ignored: true });
  }

  try {
    const order: Order = body.entry ?? {};
    const storeName = process.env.STORE_NAME || "Tu Tienda";
    const adminEmail = process.env.ADMIN_EMAIL || process.env.SMTP_FROM || process.env.SMTP_USER;
console.log('🔥🔥ESTA ES LA ORDEN🔥🔥', order);
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
    console.log('🔥🔥ESTA ES items🔥🔥', items);
    const itemsTotal = items.reduce((acc, it) => acc + it.subtotal, 0);

    // Total final: respeta el que guardas; si viene vacío, lo calcula
    const grandTotal = reportedTotal || itemsTotal + shippingPrice;

    // Dirección
    const address = renderAddress(order);

    // ======= Email Cliente =======
    const customerHTML = `
      <h2>${storeName}</h2>
      <p>¡Hola ${nonEmpty(order.firstName)}!</p>
      <p>Hemos recibido tu pedido <strong>#${orderId}</strong>.</p>

      <p><strong>Estado de pago:</strong> ${paymentStatus.toUpperCase()} ${
      mpId ? `(MP ${mpId})` : ""
    }<br/>
      <strong>Estado de orden:</strong> ${orderStatus}</p>

      <h3 style="margin:20px 0 8px 0;">Resumen</h3>
      ${itemsAsHTML(items)}

      <div style="margin-top:14px;">
        <p style="margin:4px 0;"><strong>Envío:</strong> ${CLP(shippingPrice)}</p>
        <p style="margin:4px 0;font-size:18px;"><strong>Total:</strong> ${CLP(grandTotal)}</p>
      </div>

      ${address ? `<h3 style="margin:20px 0 8px 0;">Dirección de entrega</h3><p>${address}</p>` : ""}

      <h3 style="margin:20px 0 8px 0;">Datos del cliente</h3>
      <p style="margin:0;">
        ${[nonEmpty(order.firstName), nonEmpty(order.lastName)].filter(Boolean).join(" ")}<br/>
        ${customerEmail || ""}${
      customerEmail ? "<br/>" : ""
    }${order.phone ? `Tel: ${order.phone}` : ""}${order.rut ? `<br/>RUT: ${order.rut}` : ""}
      </p>
    `;

    const customerText = `
${storeName} – Orden #${orderId}

Estado de pago: ${paymentStatus.toUpperCase()} ${mpId ? `(MP ${mpId})` : ""}
Estado de orden: ${orderStatus}

Ítems:
${itemsAsText(items)}

Envío: ${CLP(shippingPrice)}
Total: ${CLP(grandTotal)}

${address ? `Dirección: ${address}` : ""}

Datos del cliente:
${[nonEmpty(order.firstName), nonEmpty(order.lastName)].filter(Boolean).join(" ")}
${customerEmail || ""}${order.phone ? `\nTel: ${order.phone}` : ""}${order.rut ? `\nRUT: ${order.rut}` : ""}
    `.trim();

    // ======= Email Admin =======
    const adminHTML = `
      <h2>${storeName}</h2>
      <p><strong>Nueva orden #${orderId}</strong></p>

      <p><strong>Pago:</strong> ${paymentStatus.toUpperCase()} ${mpId ? `(MP ${mpId})` : ""}<br/>
      <strong>Estado:</strong> ${orderStatus}</p>

      <h3 style="margin:20px 0 8px 0;">Ítems</h3>
      ${itemsAsHTML(items)}

      <div style="margin-top:14px;">
        <p style="margin:4px 0;"><strong>Items:</strong> ${CLP(itemsTotal)}</p>
        <p style="margin:4px 0;"><strong>Envío:</strong> ${CLP(shippingPrice)}</p>
        <p style="margin:4px 0;font-size:18px;"><strong>Total:</strong> ${CLP(grandTotal)}</p>
      </div>

      ${address ? `<h3 style="margin:20px 0 8px 0;">Dirección</h3><p>${address}</p>` : ""}

      <h3 style="margin:20px 0 8px 0;">Cliente</h3>
      <p style="margin:0;">
        ${[nonEmpty(order.firstName), nonEmpty(order.lastName)].filter(Boolean).join(" ")}<br/>
        ${customerEmail || ""}${
      customerEmail ? "<br/>" : ""
    }${order.phone ? `Tel: ${order.phone}` : ""}${order.rut ? `<br/>RUT: ${order.rut}` : ""}
      </p>
      <p style="margin-top: 25px;">Fecha: ${
        order.createdAt ? new Date(order.createdAt).toLocaleString("es-CL") : ""
      }</p>
    `;

    const adminText = `
${storeName} – Nueva orden #${orderId}

Pago: ${paymentStatus.toUpperCase()} ${mpId ? `(MP ${mpId})` : ""}
Estado: ${orderStatus}

Ítems:
${itemsAsText(items)}

Items: ${CLP(itemsTotal)}
Envío: ${CLP(shippingPrice)}
Total: ${CLP(grandTotal)}

${address ? `Dirección: ${address}` : ""}

Cliente:
${[nonEmpty(order.firstName), nonEmpty(order.lastName)].filter(Boolean).join(" ")}
${customerEmail || ""}${order.phone ? `\nTel: ${order.phone}` : ""}${order.rut ? `\nRUT: ${order.rut}` : ""}
    `.trim();

    // 3) Envía correos
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
    }

    const results = await Promise.allSettled(tasks);
    return NextResponse.json({ ok: true, results, orderId });
  } catch (error) {
    console.error("❌ Error enviando correos:", error);
    return NextResponse.json({ error: "Error enviando correos" }, { status: 500 });
  }
}
