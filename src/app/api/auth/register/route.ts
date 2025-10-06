import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { name, email, password, username } = await req.json();
    
    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "Nombre, email y contraseña son requeridos" }, 
        { status: 400 }
      );
    }

    // Generar username si no se proporciona
    const finalUsername = username || email.split('@')[0];

    // 1. Registrar usuario en Strapi
    const strapiResponse = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/local/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: finalUsername,
        email: email,
        password: password,
      }),
    });

    if (!strapiResponse.ok) {
      const errorData = await strapiResponse.json();
      return NextResponse.json(
        { error: errorData.error?.message || "Error al crear la cuenta" }, 
        { status: 400 }
      );
    }

    const { jwt, user } = await strapiResponse.json();

    // 2. Crear customer asociado al usuario usando el JWT del usuario
    try {
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
        console.error('Error creando customer:', await customerResponse.text());
        // Continuar aunque falle la creación del customer
      } else {
        console.log('✅ Customer creado exitosamente');
      }
    } catch (customerError) {
      console.error('Error creando customer:', customerError);
      // Continuar aunque falle la creación del customer
    }

    // 3. Crear respuesta con cookie
    const response = NextResponse.json({ 
      success: true, 
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        name: name
      }
    });

    // Establecer cookie con el JWT
    response.cookies.set('strapi_jwt', jwt, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 30, // 30 días
    });

    return response;
  } catch (error) {
    console.error('Error en registro:', error);
    return NextResponse.json(
      { error: "Error interno del servidor" }, 
      { status: 500 }
    );
  }
}
