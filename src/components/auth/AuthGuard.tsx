"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Box, CircularProgress, Typography } from '@mui/material';

interface AuthGuardProps {
  children: React.ReactNode;
}

export default function AuthGuard({ children }: AuthGuardProps) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/debug/user-info', {
          credentials: 'include',
        });
        
        if (response.ok) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
          // Redirigir al login si no está autenticado
          router.push('/login?redirect=' + encodeURIComponent(window.location.pathname));
        }
      } catch (error) {
        console.error('Error checking auth:', error);
        setIsAuthenticated(false);
        router.push('/login?redirect=' + encodeURIComponent(window.location.pathname));
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  // Mostrar loading mientras verifica autenticación
  if (isLoading) {
    return (
      <Box 
        display="flex" 
        flexDirection="column" 
        alignItems="center" 
        justifyContent="center" 
        minHeight="50vh"
        gap={2}
      >
        <CircularProgress />
        <Typography variant="body2" color="text.secondary">
          Verificando autenticación...
        </Typography>
      </Box>
    );
  }

  // Si no está autenticado, no renderizar nada (ya se redirigió)
  if (!isAuthenticated) {
    return null;
  }

  // Si está autenticado, renderizar el contenido
  return <>{children}</>;
}
