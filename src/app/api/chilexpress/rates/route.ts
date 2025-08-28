import { NextRequest, NextResponse } from "next/server";

const url = "https://testservices.wschilexpress.com/rating/api/v1.0/rates/courier";

export async function POST(req: NextRequest) {
  try {
    const { originCountyCode, destinationCountyCode, declaredWorth = 0, package: pkg } = await req.json();
    if (!originCountyCode || !destinationCountyCode || !pkg) {
      return NextResponse.json({ error: "Faltan parámetros" }, { status: 400 });
    }
    const apiKey = process.env.CHILEXPRESS_RATES_API_KEY;
    if (!apiKey) return NextResponse.json({ error: "CHILEXPRESS_API_KEY no configurada" }, { status: 500 });

    // El body exacto puede variar según la versión de la API; adapta campos si tu cuenta requiere más
    const body = {
      originCountyCode,
      destinationCountyCode,
      productType: 3,
      package: {
        weight: Number(pkg.weight), // kg
        height: Number(pkg.height), // cm
        width:  Number(pkg.width),  // cm
        length: Number(pkg.length), // cm
      },
      declaredWorth: Number(declaredWorth), // CLP
    };

    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Ocp-Apim-Subscription-Key": apiKey, // header típico en Chilexpress WS
      },
      body: JSON.stringify(body),
      cache: "no-store",
    });

    const text = await res.text();
    let data: any = text;
    try { data = JSON.parse(text); } catch { /* texto plano */ }

    if (!res.ok) {
      return NextResponse.json({ error: "Chilexpress Rate falló", detail: data }, { status: res.status });
    }

    return NextResponse.json(data, { status: 200 });
  } catch (err: any) {
    return NextResponse.json({ error: "Exception", detail: String(err?.message ?? err) }, { status: 500 });
  }
}
