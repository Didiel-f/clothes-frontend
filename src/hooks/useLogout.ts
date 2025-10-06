import { useRouter } from 'next/navigation';
import { useState } from 'react';

export function useLogout() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const logout = async () => {
    try {
      setIsLoading(true);
      
      const response = await fetch('/api/auth/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        // Redirigir al login después del logout exitoso
        router.push('/login');
        // Recargar la página para limpiar cualquier estado del cliente
        window.location.reload();
      } else {
        console.error('Error en logout:', await response.text());
        // Aún así redirigir al login
        router.push('/login');
      }
    } catch (error) {
      console.error('Error en logout:', error);
      // Aún así redirigir al login
      router.push('/login');
    } finally {
      setIsLoading(false);
    }
  };

  return { logout, isLoading };
}
