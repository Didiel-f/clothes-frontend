import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { destinationCountyCode } = await req.json();

  if (!destinationCountyCode) {
    return NextResponse.json({ error: "Parámetro destinationCountyCode requerido" }, { status: 400 });
  }

  const apiKey = process.env.CHILEXPRESS_RATES_API_KEY;
  const url = "https://testservices.wschilexpress.com/rating/api/v1.0/rates/courier";

  const body = {
    originCountyCode: "STGO",
    destinationCountyCode,
    package: { weight: "4", height: "22", width: "8", length: "105" },
    productType: 3,
    contentType: 1,
    declaredWorth: "99900",
    deliveryTime: 0,
  };

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-cache",
        "Ocp-Apim-Subscription-Key": apiKey || "",
      },
      body: JSON.stringify(body),
    });

    const data = await res.json();
    return NextResponse.json(data);
  } catch (err) {
    console.error("Error al obtener cotización:", err);
    return NextResponse.json({ error: "Error consultando Chilexpress" }, { status: 500 });
  }
}
