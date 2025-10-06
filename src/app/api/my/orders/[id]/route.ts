import { NextRequest, NextResponse } from "next/server";
const STRAPI = process.env.NEXT_PUBLIC_BACKEND_URL!;

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const jwt = req.cookies.get("strapi_jwt")?.value;
  if (!jwt) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;

  try {
    // Buscar la orden por ID (puede ser id o documentId)
    const response = await fetch(`${STRAPI}/api/orders/me`, {
      headers: { Authorization: `Bearer ${jwt}` },
      cache: "no-store",
    });

    if (!response.ok) {
      return NextResponse.json({ error: "Failed to fetch orders" }, { status: response.status });
    }

    const data = await response.json();
    const orders = data.data || data.results || [];

    // Buscar la orden por id o documentId
    const order = orders.find((o: any) => 
      o.id === id || 
      o.documentId === id || 
      String(o.id) === id || 
      String(o.documentId) === id
    );

    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    return NextResponse.json(order);
  } catch (error) {
    console.error('Error fetching order:', error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
