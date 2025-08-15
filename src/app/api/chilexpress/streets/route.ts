// app/api/chilexpress/streets/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const payload = await req.json();
  if (!payload.countyName || !payload.streetName) {
    return NextResponse.json(
      { error: "Faltan campos obligatorios: countyName o streetName" },
      { status: 400 }
    );
  }

  try {
    const res = await fetch(
      "https://testservices.wschilexpress.com/georeference/api/v1.0/streets/search",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-cache",
          "Ocp-Apim-Subscription-Key": process.env.CHILEXPRESS_STREETS_API_KEY!,
        },
        body: JSON.stringify(payload),
      }
    );

    if (!res.ok) {
      const errorData = await res.json();
      return NextResponse.json({ error: "Chilexpress API error", detail: errorData }, { status: res.status });
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error al consultar Chilexpress:", error);
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}
