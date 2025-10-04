// app/auth/callback/page.tsx
'use client';
import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function AuthCallback() {
  const sp = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const token = sp.get('access_token') || sp.get('jwt');
    const error = sp.get('error');

    if (error) {
      router.replace('/login?error=' + encodeURIComponent(error));
      return;
    }
    if (token) {
      fetch('/api/auth/social', {
        method: 'POST',
        body: JSON.stringify({ token }),
      }).then(() => router.replace('/mi-cuenta'));
    }
  }, [sp, router]);

  return null;
}
