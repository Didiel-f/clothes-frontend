import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    
    // Log de la notificación para debugging
    console.log("Webhook MercadoPago recibido:", data);
    
    // Aquí puedes procesar la notificación según el tipo
    // Por ejemplo, actualizar el estado del pedido en tu base de datos
    
    if (data.type === "payment") {
      const paymentId = data.data.id;
      console.log("Pago procesado:", paymentId);
      
      // Aquí puedes hacer la lógica para actualizar tu base de datos
      // Por ejemplo, marcar el pedido como pagado
    }
    const secret = process.env.MP_WEBHOOK_SECRET;
    if (!secret) {
      console.error("⚠️ MP_WEBHOOK_SECRET no configurado");
      return NextResponse.json({ error: "Server misconfigured" }, { status: 500 });
    }
    
    return NextResponse.json({ status: "ok" });
  } catch (error) {
    console.error("Error en webhook:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" }, 
      { status: 500 }
    );
  }
}
