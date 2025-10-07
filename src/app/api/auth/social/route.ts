import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { access_token, id_token } = await req.json();
    
    if (!access_token && !id_token) {
      return NextResponse.json({ ok: false, error: 'Token is required' }, { status: 400 });
    }

    // Usar el nuevo endpoint de Strapi que maneja OAuth correctamente
    const strapiResponse = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth-identities/google/callback`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        access_token,
        id_token
      }),
    });

    if (!strapiResponse.ok) {
      console.error('Strapi OAuth callback failed:', strapiResponse.status);
      const errorText = await strapiResponse.text();
      console.error('Strapi error:', errorText);
      return NextResponse.json({ ok: false, error: 'OAuth authentication failed' }, { status: 401 });
    }

    const strapiResult = await strapiResponse.json();
    console.log('Strapi OAuth result:', strapiResult);

    const res = NextResponse.json({ 
      ok: true, 
      user: {
        id: strapiResult.user.id,
        email: strapiResult.user.email,
        username: strapiResult.user.username,
        name: strapiResult.user.name || strapiResult.user.username,
        confirmed: strapiResult.user.confirmed,
        blocked: strapiResult.user.blocked
      }
    });
    
    // Establecer la cookie con el JWT de Strapi
    if (strapiResult.jwt) {
      res.cookies.set('strapi_jwt', strapiResult.jwt, {
        httpOnly: true, 
        secure: process.env.NODE_ENV === 'production', 
        sameSite: 'lax', 
        path: '/', 
        maxAge: 60 * 60 * 24 * 30,
      });
    }
    
    return res;
  } catch (error) {
    console.error('Error in social auth:', error);
    return NextResponse.json({ ok: false, error: 'Internal server error' }, { status: 500 });
  }
}
