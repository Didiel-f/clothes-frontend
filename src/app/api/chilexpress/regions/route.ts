// app/api/chilexpress/regions/route.ts
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const res = await fetch("https://testservices.wschilexpress.com/georeference/api/v1.0/regions", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-cache",
        "Ocp-Apim-Subscription-Key": process.env.CHILEXPRESS_COVERAGE_API_KEY!,
      },
    });
    const data = await res.json();

    return NextResponse.json(data);
  } catch (err) {
    console.error("Error al obtener regiones:", err);
    return NextResponse.json({ error: "Error al obtener regiones" }, { status: 500 });
  }
}
