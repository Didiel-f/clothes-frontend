import { NextRequest, NextResponse } from "next/server";
const STRAPI = process.env.NEXT_PUBLIC_BACKEND_URL!;

export async function GET(req: NextRequest) {
  const jwt = req.cookies.get("strapi_jwt")?.value;
  if (!jwt) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const qs = new URL(req.url).searchParams.toString();
  const r = await fetch(`${STRAPI}/api/orders/me?${qs}`, {
    headers: { Authorization: `Bearer ${jwt}` },
    cache: "no-store",
  });
  const data = await r.json();
  return NextResponse.json(data, { status: r.status });
}
