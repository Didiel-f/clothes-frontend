import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const brandSlug = searchParams.get("brand");

    if (!brandSlug) {
      return NextResponse.json(
        { error: "El parámetro 'brand' es requerido" }, 
        { status: 400 }
      );
    }

    // Construir la query para filtrar por marca con populate profundo
    const filters = `filters[brand][slug][$eq]=${brandSlug}`;
    const populate = `populate[rows][populate]=measurements&populate=howToMeasure&populate=brand`;
    const fields = `fields[0]=title&fields[1]=productType&fields[2]=target&fields[3]=fitNotes`;
    const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/size-guides?${filters}&${populate}&${fields}&sort=target:asc`;

    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
      },
      cache: "no-store", // Evitar caché para obtener siempre datos actualizados
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error("❌ Strapi error:", res.status, errorText);
      
      if (res.status === 404) {
        return NextResponse.json(
          { error: "No se encontró guía de tallas para esta marca" }, 
          { status: 404 }
        );
      }
      
      return NextResponse.json(
        { error: "Error al obtener guía de tallas" }, 
        { status: res.status }
      );
    }

    const data = await res.json();
    
    // Si no hay datos, retornar 404
    if (!data.data || data.data.length === 0) {
      return NextResponse.json(
        { error: "No se encontró guía de tallas para esta marca" }, 
        { status: 404 }
      );
    }

    return NextResponse.json(data.data);
  } catch (err) {
    console.error("💥 Internal API error:", err);
    return NextResponse.json(
      { error: "Error del servidor" }, 
      { status: 500 }
    );
  }
}

