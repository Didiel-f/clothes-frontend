import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { token } = await req.json();
    if (!token) {
      return NextResponse.json({ ok: false, error: 'Token is required' }, { status: 400 });
    }

    // Verificar si el token es válido haciendo una petición a Strapi
    const strapiResponse = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/me`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!strapiResponse.ok) {
      console.error('Token validation failed:', strapiResponse.status);
      return NextResponse.json({ ok: false, error: 'Invalid token' }, { status: 401 });
    }

    const user = await strapiResponse.json();

    const res = NextResponse.json({ 
      ok: true, 
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        name: user.name || user.username
      }
    });
    
    res.cookies.set('strapi_jwt', token, {
      httpOnly: true, 
      secure: process.env.NODE_ENV === 'production', 
      sameSite: 'lax', 
      path: '/', 
      maxAge: 60 * 60 * 24 * 30,
    });
    
    return res;
  } catch (error) {
    console.error('Error in social auth:', error);
    return NextResponse.json({ ok: false, error: 'Internal server error' }, { status: 500 });
  }
}
