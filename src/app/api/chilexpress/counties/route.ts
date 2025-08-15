import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const region = req.nextUrl.searchParams.get("region");

  if (!region) {
    return NextResponse.json({ error: "Parámetro región requerido" }, { status: 400 });
  }

  try {
    const res = await fetch(
      `https://testservices.wschilexpress.com/georeference/api/v1.0/coverage-areas?RegionCode=${region}&type=0`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-cache",
          "Ocp-Apim-Subscription-Key": process.env.CHILEXPRESS_API_KEY!,
        },
      }
    );

    const data = await res.json();
    return NextResponse.json(data);
  } catch (err) {
    console.error("Error al obtener comunas:", err);
    return NextResponse.json({ error: "Error en la solicitud a Chilexpress" }, { status: 500 });
  }
}
