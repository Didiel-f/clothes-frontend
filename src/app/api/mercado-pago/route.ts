import { NextRequest, NextResponse } from "next/server";
import { MercadoPagoConfig, Preference } from "mercadopago";
import { MERCADO_PAGO_CONFIG } from "config/mercado-pago";

const client = new MercadoPagoConfig({
  accessToken: MERCADO_PAGO_CONFIG.ACCESS_TOKEN,
});

const preference = new Preference(client);

export async function POST(req: NextRequest) {
  try {
    const { payer, items, metadata } = await req.json();
    
    if (!payer?.email || !items || items.length === 0) {
      return NextResponse.json(
        { error: "Datos incompletos para crear preferencia" }, 
        { status: 400 }
      );
    }

    const result = await preference.create({
      body: {
        items,
        payer,
        metadata,
        back_urls: {
          success: `${MERCADO_PAGO_CONFIG.BASE_URL}${MERCADO_PAGO_CONFIG.SUCCESS_URL}`,
          failure: `${MERCADO_PAGO_CONFIG.BASE_URL}${MERCADO_PAGO_CONFIG.FAILURE_URL}`,
          pending: `${MERCADO_PAGO_CONFIG.BASE_URL}${MERCADO_PAGO_CONFIG.PENDING_URL}`,
        },
        auto_return: "approved",
      },
    });

    return NextResponse.json({ id: result.id });
  } catch (err) {
    console.error("Error al crear preferencia:", err);
    return NextResponse.json(
      { error: "Error interno del servidor" }, 
      { status: 500 }
    );
  }
}
