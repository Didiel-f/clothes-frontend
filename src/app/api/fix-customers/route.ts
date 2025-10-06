import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const jwt = req.cookies.get("strapi_jwt")?.value;
    if (!jwt) {
      return NextResponse.json({ error: "No JWT token found" }, { status: 401 });
    }

    // Obtener información del usuario actual
    const userResponse = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/me`, {
      headers: {
        'Authorization': `Bearer ${jwt}`,
      },
    });

    if (!userResponse.ok) {
      return NextResponse.json({ error: "Failed to get user info" }, { status: 401 });
    }

    const user = await userResponse.json();

    // Verificar si ya tiene customer
    const existingCustomerResponse = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/customers?filters[users_permissions_user][$eq]=${user.id}`,
      {
        headers: {
          'Authorization': `Bearer ${jwt}`,
        },
      }
    );

    if (existingCustomerResponse.ok) {
      const existingCustomerData = await existingCustomerResponse.json();
      
      if (existingCustomerData.data && existingCustomerData.data.length > 0) {
        return NextResponse.json({ 
          success: true, 
          message: "Customer ya existe",
          customer: existingCustomerData.data[0]
        });
      }
    }

    // Crear customer si no existe
    const customerResponse = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/customers`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwt}`,
      },
      body: JSON.stringify({
        data: {
          users_permissions_user: user.id,
          publishedAt: new Date().toISOString(),
        },
      }),
    });

    if (!customerResponse.ok) {
      const errorText = await customerResponse.text();
      return NextResponse.json(
        { error: `Error creando customer: ${errorText}` }, 
        { status: 400 }
      );
    }

    const customerData = await customerResponse.json();

    return NextResponse.json({
      success: true,
      message: "Customer creado exitosamente",
      customer: customerData.data
    });

  } catch (error) {
    console.error('Error en fix-customers:', error);
    return NextResponse.json(
      { error: "Error interno del servidor" }, 
      { status: 500 }
    );
  }
}
