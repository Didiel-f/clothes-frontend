// /pages/api/chilexpress/street-numbers.ts
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const streetNameId = req.nextUrl.searchParams.get("streetNameId");
  const streetNumber = req.nextUrl.searchParams.get("streetNumber");

  if (!streetNameId) {
    return NextResponse.json({ error: "Parámetro región streetNameId" }, { status: 400 });
  }
  if (!streetNumber) {
    return NextResponse.json({ error: "Parámetro región streetNumber" }, { status: 400 });
  }
  const apiKey = process.env.CHILEXPRESS_API_KEY;

  const url = `https://testservices.wschilexpress.com/georeference/api/v1.0/streets/${streetNameId}/numbers?streetNumber=${streetNumber}`;

  try {
    const res = await fetch(url, {
      headers: {
        "Cache-Control": "no-cache",
        "Ocp-Apim-Subscription-Key": apiKey || "",
      },
    });

    const data = await res.json();
    return NextResponse.json(data);
  } catch (err) {
    console.error("Error al obtener numero de calle:", err);
    return NextResponse.json({ error: "Error en la solicitud a Chilexpress" }, { status: 500 });
  }
}
