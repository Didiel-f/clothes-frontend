import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(req: NextRequest) {
  const title = req.nextUrl.searchParams.get("title");
  if (!title) return NextResponse.json({ error: "missing_title" }, { status: 400 });

  const token = (await cookies()).get("meli_access_token")?.value;
  if (!token) return NextResponse.json({ error: "not_authenticated" }, { status: 401 });

  const url = new URL("https://api.mercadolibre.com/sites/MLC/category_predictor/predict");
  url.searchParams.set("title", title);

  const resp = await fetch(url.toString(), {
    headers: { Authorization: `Bearer ${token}` },
  });

  // Si expiró, intenta refrescar y reintentar una vez
  if (resp.status === 401) {
    const refreshResp = await fetch(new URL("/api/meli/refresh", req.url).toString(), { method: "POST" });
    if (refreshResp.ok) {
      const newToken = (await cookies()).get("meli_access_token")?.value;
      const retry = await fetch(url.toString(), { headers: { Authorization: `Bearer ${newToken}` } });
      const data = await retry.json();
      return NextResponse.json(data, { status: retry.status });
    }
  }

  const data = await resp.json();
  return NextResponse.json(data, { status: resp.status });
}
