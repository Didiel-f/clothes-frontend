import { NextRequest, NextResponse } from "next/server";
import { sendMail } from "lib/mailer";
import { IVariant } from "models/Product.model";

// ——————————————————————
// Utilidades
// ——————————————————————
const CLP = (n: number | undefined | null) =>
  new Intl.NumberFormat("es-CL", { style: "currency", currency: "CLP", maximumFractionDigits: 0 }).format(Number(n ?? 0));

function line(str?: string | null) {
  return (str ?? "").toString().trim();
}

function renderAddress(order: any) {
  const parts = [
    [order?.streetName, order?.streetNumber].filter(Boolean).join(" "),
    line(order?.houseApartment),
    [order?.county, order?.region].filter(Boolean).join(", "),
  ].filter(Boolean);

  return parts.join(" · ");
}

type NormalizedItem = {
  id?: string | number;
  title: string;
  variant?: string;
  qty: number;
  unitPrice: number;
  subtotal: number;
};

// Trata de normalizar distintos posibles formatos de tus variantes/productos
function normalizeItems(variants: IVariant[] | any[]): NormalizedItem[] {
  if (!Array.isArray(variants)) return [];

  return variants.map((raw: any) => {
    // posibles ubicaciones de nombre
    const title: string =
      raw?.name ??
      raw?.product?.name ??
      raw?.title ??
      raw?.attributes?.name ??
      "Producto";

    // talla / color en distintos lugares
    const size =
      raw?.size ?? raw?.attributes?.size ?? raw?.variant?.size ?? raw?.selectedSize;
    const color =
      raw?.color ?? raw?.attributes?.color ?? raw?.variant?.color ?? raw?.selectedColor;

    const variantLabel = [size ? `Talla: ${size}` : "", color ? `Color: ${color}` : ""]
      .filter(Boolean)
      .join(" · ");

    // cantidad / precio en distintos lugares
    const qty = Number(raw?.qty ?? raw?.quantity ?? raw?.count ?? 1) || 1;
    const unitPrice = Number(
      raw?.price ?? raw?.sellPrice ?? raw?.unit_price ?? raw?.unitPrice ?? 0
    );
    const subtotal = unitPrice * qty;

    return {
      id: raw?.id ?? raw?.documentId ?? raw?._id,
      title,
      variant: variantLabel || undefined,
      qty,
      unitPrice,
      subtotal,
    };
  });
}

function itemsAsHTML(items: NormalizedItem[]) {
  if (!items.length) {
    return `<p><em>Sin ítems asociados.</em></p>`;
  }

  const rows = items
    .map(
      (it) => `
      <tr>
        <td style="padding:8px 12px;border-bottom:1px solid #eee;">
          <div style="font-weight:600;">${it.title}</div>
          ${it.variant ? `<div style="font-size:12px;color:#555;">${it.variant}</div>` : ""}
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
    </table>
  `;
}

function itemsAsText(items: NormalizedItem[]) {
  if (!items.length) return "Sin ítems asociados.";
  return items
    .map((it) => {
      const v = it.variant ? ` (${it.variant})` : "";
      return `• ${it.title}${v}  x${it.qty}  ${CLP(it.unitPrice)}  ==> ${CLP(it.subtotal)}`;
    })
    .join("\n");
}

// ——————————————————————
// Handler principal
// ——————————————————————
export async function POST(req: NextRequest) {
  // 1) Validar secreto
  const token = req.headers.get("clave");
  if (token !== process.env.STRAPI_WEBHOOK_SECRET) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  // 2) Validar payload/trigger
  const body = await req.json();
  if (body.event !== "entry.create" || body.uid !== "api::order.order") {
    return NextResponse.json({ ok: true, ignored: true });
  }

  try {
    const order = body.entry ?? {};
    const storeName = process.env.STORE_NAME || "Tu Tienda";
    const adminEmail = process.env.ADMIN_EMAIL || process.env.SMTP_USER; // fallback
    const orderId = order?.id ?? order?.documentId ?? body?.entry?.id;
    const customerEmail = line(order?.client_email);
    const firstName = line(order?.firstName);
    const lastName = line(order?.lastName);
    const rut = line(order?.rut);
    const phone = line(order?.phone);

    const shippingPrice = Number(order?.shippingPrice ?? 0);
    const total = Number(order?.totalPrice ?? 0);
    const orderStatus = line(order?.order_status) || "Confirmado";
    const paymentStatus = line(order?.payment_status) || "pending";
    const mpPaymentId = order?.mp_payment_id ?? order?.mp_paymentId ?? order?.mp_paymentID;

    const addressStr = renderAddress(order);
    const items = normalizeItems(order?.variants ?? order?.items ?? []);

    // Totales calculados (por si quieres validar)
    const itemsTotal = items.reduce((acc, it) => acc + it.subtotal, 0);
    const grandTotal = total || (itemsTotal + shippingPrice);

    // 3) Armar correos (HTML + texto plano)
    const headerHTML = `
      <div style="font-family:ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto,Ubuntu,Arial;">
        <h2 style="margin:0 0 8px 0;">${storeName}</h2>
        <p style="margin:0;color:#666;">Orden #${orderId}</p>
      </div>
      <hr style="border:none;border-top:1px solid #eee;margin:16px 0;" />
    `;

    const customerHTML = `
      ${headerHTML}
      <p>¡Hola${firstName ? ` ${firstName}` : ""}!</p>
      <p>Gracias por tu compra. Hemos recibido tu pedido <strong>#${orderId}</strong>.</p>
      <p><strong>Estado de pago:</strong> ${paymentStatus.toUpperCase()} ${mpPaymentId ? `(MP ${mpPaymentId})` : ""}<br/>
      <strong>Estado de orden:</strong> ${orderStatus}</p>

      <h3 style="margin:20px 0 8px 0;">Resumen</h3>
      ${itemsAsHTML(items)}

      <div style="margin-top:14px;">
        <p style="margin:4px 0;"><strong>Envío:</strong> ${CLP(shippingPrice)}</p>
        <p style="margin:4px 0;font-size:18px;"><strong>Total:</strong> ${CLP(grandTotal)}</p>
      </div>

      ${addressStr
        ? `<h3 style="margin:20px 0 8px 0;">Dirección de entrega</h3><p style="margin:0;">${addressStr}</p>`
        : ""
      }

      <h3 style="margin:20px 0 8px 0;">Datos del cliente</h3>
      <p style="margin:0;">
        ${[firstName, lastName].filter(Boolean).join(" ")}<br/>
        ${customerEmail || ""}${customerEmail ? "<br/>" : ""}${phone ? `Tel: ${phone}` : ""}${rut ? `<br/>RUT: ${rut}` : ""}
      </p>

      <p style="margin-top:24px;">Si tienes alguna duda, responde a este correo. ¡Gracias por elegirnos!</p>
    `;

    const customerText = `
${storeName} – Orden #${orderId}

Estado de pago: ${paymentStatus.toUpperCase()} ${mpPaymentId ? `(MP ${mpPaymentId})` : ""}
Estado de orden: ${orderStatus}

Resumen:
${itemsAsText(items)}

Envío: ${CLP(shippingPrice)}
Total: ${CLP(grandTotal)}

${addressStr ? `Dirección: ${addressStr}\n` : ""}

Datos del cliente:
${[firstName, lastName].filter(Boolean).join(" ")}
${customerEmail || ""}${phone ? `\nTel: ${phone}` : ""}${rut ? `\nRUT: ${rut}` : ""}

Gracias por tu compra.
`.trim();

    const adminHTML = `
      ${headerHTML}
      <p><strong>Nueva orden creada.</strong></p>

      <p><strong>Pago:</strong> ${paymentStatus.toUpperCase()} ${mpPaymentId ? `(MP ${mpPaymentId})` : ""}<br/>
      <strong>Orden:</strong> #${orderId} — ${orderStatus}</p>

      <h3 style="margin:20px 0 8px 0;">Ítems</h3>
      ${itemsAsHTML(items)}

      <div style="margin-top:14px;">
        <p style="margin:4px 0;"><strong>Items:</strong> ${CLP(itemsTotal)}</p>
        <p style="margin:4px 0;"><strong>Envío:</strong> ${CLP(shippingPrice)}</p>
        <p style="margin:4px 0;font-size:18px;"><strong>Total:</strong> ${CLP(grandTotal)}</p>
      </div>

      ${addressStr
        ? `<h3 style="margin:20px 0 8px 0;">Dirección</h3><p style="margin:0;">${addressStr}</p>`
        : ""
      }

      <h3 style="margin:20px 0 8px 0;">Cliente</h3>
      <p style="margin:0;">
        ${[firstName, lastName].filter(Boolean).join(" ")}<br/>
        ${customerEmail || ""}${customerEmail ? "<br/>" : ""}${phone ? `Tel: ${phone}` : ""}${rut ? `<br/>RUT: ${rut}` : ""}
      </p>
    `;

    const adminText = `
${storeName} – Nueva orden #${orderId}

Pago: ${paymentStatus.toUpperCase()} ${mpPaymentId ? `(MP ${mpPaymentId})` : ""}
Orden: #${orderId} — ${orderStatus}

Ítems:
${itemsAsText(items)}

Items: ${CLP(itemsTotal)}
Envío: ${CLP(shippingPrice)}
Total: ${CLP(grandTotal)}

${addressStr ? `Dirección: ${addressStr}\n` : ""}

Cliente:
${[firstName, lastName].filter(Boolean).join(" ")}
${customerEmail || ""}${phone ? `\nTel: ${phone}` : ""}${rut ? `\nRUT: ${rut}` : ""}
`.trim();

    // 4) Envíos (condicional: solo se envía a cliente si existe su correo)
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

    const sent = {
      customer: results[0]?.status === "fulfilled" && Boolean(customerEmail),
      admin:
        results[results.length - 1]?.status === "fulfilled" && Boolean(adminEmail),
    };

    return NextResponse.json({ ok: true, sent, orderId });
  } catch (error) {
    console.error("❌ Error enviando correos:", error);
    return NextResponse.json({ error: "Error enviando correos" }, { status: 500 });
  }
}
