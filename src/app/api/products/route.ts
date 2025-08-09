import { NextResponse } from "next/server";

export async function GET() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/products?populate=*`, {
      headers: {
        Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
      },
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error("❌ Strapi error:", res.status, errorText);
      return NextResponse.json({ error: "Error al obtener productos" }, { status: res.status });
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (err) {
    console.error("💥 Internal API error:", err);
    return NextResponse.json({ error: "Error del servidor" }, { status: 500 });
  }
}
