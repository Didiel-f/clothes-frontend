import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();
    
    if (!email || !password) {
      return NextResponse.json(
        { error: "Email y contraseña son requeridos" }, 
        { status: 400 }
      );
    }

    // Hacer login en Strapi
    const strapiResponse = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/local`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        identifier: email,
        password: password,
      }),
    });

    if (!strapiResponse.ok) {
      const errorData = await strapiResponse.json();
      return NextResponse.json(
        { error: errorData.error?.message || "Credenciales inválidas" }, 
        { status: 401 }
      );
    }

    const { jwt, user } = await strapiResponse.json();

    // Crear respuesta con cookie
    const response = NextResponse.json({ 
      success: true, 
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        name: user.name || user.username
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
    console.error('Error en login:', error);
    return NextResponse.json(
      { error: "Error interno del servidor" }, 
      { status: 500 }
    );
  }
}
