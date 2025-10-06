import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { access_token, id_token } = await req.json();
    
    if (!access_token && !id_token) {
      return NextResponse.json({ ok: false, error: 'Token is required' }, { status: 400 });
    }

    // Usar el token de acceso de Google para obtener información del usuario
    const tokenToUse = access_token || id_token;
    
    // Obtener información del usuario de Google
    const googleUserResponse = await fetch(`https://www.googleapis.com/oauth2/v2/userinfo?access_token=${tokenToUse}`);
    
    if (!googleUserResponse.ok) {
      console.error('Failed to get Google user info:', googleUserResponse.status);
      return NextResponse.json({ ok: false, error: 'Invalid Google token' }, { status: 401 });
    }

    const googleUser = await googleUserResponse.json();
    console.log('Google user info:', googleUser);

    // Buscar si el usuario ya existe en Strapi
    const existingUserResponse = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users?filters[email][$eq]=${googleUser.email}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    let user;
    let jwt;

    if (existingUserResponse.ok) {
      const existingUsers = await existingUserResponse.json();
      if (existingUsers.data && existingUsers.data.length > 0) {
        // Usuario existe, crear un JWT para él
        user = existingUsers.data[0];
        console.log('Existing user found:', user);
        
        // Crear un JWT para el usuario existente
        const loginResponse = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/local`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            identifier: googleUser.email,
            password: 'google_oauth_user', // Esto no se usará realmente
          }),
        });

        if (loginResponse.ok) {
          const loginResult = await loginResponse.json();
          jwt = loginResult.jwt;
        }
      }
    }

    // Si no encontramos usuario o no pudimos crear JWT, crear uno nuevo
    if (!user || !jwt) {
      // Crear nuevo usuario en Strapi
      const createUserResponse = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/local/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: googleUser.name || googleUser.email,
          email: googleUser.email,
          password: 'google_oauth_' + Date.now(), // Password temporal
          name: googleUser.name,
        }),
      });

      if (createUserResponse.ok) {
        const createResult = await createUserResponse.json();
        user = createResult.user;
        jwt = createResult.jwt;
        console.log('New user created:', user);
      } else {
        console.error('Failed to create user:', createUserResponse.status);
        return NextResponse.json({ ok: false, error: 'Failed to create user' }, { status: 500 });
      }
    }

    const res = NextResponse.json({ 
      ok: true, 
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        name: user.name || user.username
      }
    });
    
    // Establecer la cookie con el JWT
    if (jwt) {
      res.cookies.set('strapi_jwt', jwt, {
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
