// app/auth/google/callback/page.tsx
'use client';
import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function GoogleAuthCallback() {
  const sp = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const token = sp.get('access_token') || sp.get('jwt');
    const idToken = sp.get('id_token');
    const error = sp.get('error');

    console.log('Google callback params:', {
      token,
      idToken,
      error,
      allParams: Object.fromEntries(sp.entries())
    });

    if (error) {
      console.error('Google auth error:', error);
      router.replace('/login?error=' + encodeURIComponent(error));
      return;
    }

    const processToken = async (tokenToUse: string) => {
      try {
        const response = await fetch('/api/auth/social', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ token: tokenToUse }),
        });

        const result = await response.json();

        if (response.ok && result.ok) {
          console.log('Auth successful, redirecting to orders');
          router.replace('/orders');
        } else {
          console.error('Error setting auth cookie:', result.error);
          router.replace('/login?error=auth_failed');
        }
      } catch (error) {
        console.error('Error in auth callback:', error);
        router.replace('/login?error=network_error');
      }
    };

    if (token) {
      // Procesar el token de acceso
      processToken(token);
    } else if (idToken) {
      // Si solo tenemos id_token, intentar usarlo como token
      processToken(idToken);
    } else {
      console.error('No token found in callback');
      router.replace('/login?error=no_token');
    }
  }, [sp, router]);

  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '100vh',
      flexDirection: 'column',
      gap: '1rem'
    }}>
      <div>Procesando autenticación con Google...</div>
      <div style={{ fontSize: '0.9rem', color: '#666' }}>
        Por favor espera mientras completamos tu inicio de sesión.
      </div>
    </div>
  );
}
