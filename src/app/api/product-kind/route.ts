// app/api/product-kind/route.ts
import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const documentId = req.nextUrl.searchParams.get("documentId");
    if (!documentId) {
      return NextResponse.json({ error: "documentId es requerido" }, { status: 400 });
    }

    const base = process.env.NEXT_PUBLIC_BACKEND_URL;
    const token = process.env.STRAPI_API_TOKEN;

    if (!base || !token) {
      return NextResponse.json(
        { error: "Faltan variables de entorno (NEXT_PUBLIC_BACKEND_URL o STRAPI_API_TOKEN)" },
        { status: 500 }
      );
    }

    // populate=dimension para asegurar que vengan largo/ancho/alto
    const url = `${base}/api/product-kinds/${encodeURIComponent(documentId)}?populate=dimension`;

    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    });

    const text = await res.text();
    let data: any = text;
    try { data = JSON.parse(text); } catch { /* Strapi a veces entrega texto en errores */ }

    if (!res.ok) {
      return NextResponse.json({ error: "Strapi respondió con error", detail: data }, { status: res.status });
    }

    // Devolvemos tal cual (data/meta) para no romper tu parsing actual
    return NextResponse.json(data, { status: 200 });
  } catch (err: any) {
    return NextResponse.json({ error: "Exception", detail: String(err?.message ?? err) }, { status: 500 });
  }
}
