import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const jwt = req.cookies.get("strapi_jwt")?.value;
    if (!jwt) {
      return NextResponse.json({ error: "No JWT token found" }, { status: 401 });
    }

    // Obtener información del usuario desde Strapi
    const userResponse = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/me`, {
      headers: {
        'Authorization': `Bearer ${jwt}`,
      },
    });

    if (!userResponse.ok) {
      return NextResponse.json({ error: "Failed to get user info" }, { status: 401 });
    }

    const user = await userResponse.json();

    // Buscar customer asociado
    const customerResponse = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/customers?filters[users_permissions_user][$eq]=${user.id}&populate=*`,
      {
        headers: {
          'Authorization': `Bearer ${process.env.STRAPI_API_TOKEN}`,
        },
      }
    );

    let customer = null;
    if (customerResponse.ok) {
      const customerData = await customerResponse.json();
      customer = customerData.data?.[0] || null;
    }

    return NextResponse.json({
      user,
      customer,
      debug: {
        userId: user.id,
        customerFound: !!customer,
        customerId: customer?.id || null,
      }
    });

  } catch (error) {
    console.error('Debug error:', error);
    return NextResponse.json(
      { error: "Error interno del servidor" }, 
      { status: 500 }
    );
  }
}
