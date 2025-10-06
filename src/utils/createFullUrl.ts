/**
 * Función para crear URLs completas desde rutas relativas
 * Maneja tanto el lado del cliente como del servidor
 */
export const createFullUrl = (url: string): string => {
  // Si ya es una URL completa, devolverla tal como está
  if (url.startsWith('http')) return url;
  
  // En el cliente (browser)
  if (typeof window !== 'undefined') {
    return `${window.location.origin}${url}`;
  }
  
  // En el servidor (SSR)
  return `${process.env.NEXT_PUBLIC_FRONTEND_URL || 'http://localhost:3000'}${url}`;
};
