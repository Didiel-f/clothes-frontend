import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Verificar si la ruta está dentro del customer-dashboard
  if (pathname.startsWith('/orders') || 
      pathname.startsWith('/profile') || 
      pathname.startsWith('/address') || 
      pathname.startsWith('/payment-methods') || 
      pathname.startsWith('/support-tickets') || 
      pathname.startsWith('/wish-list')) {
    
    // Verificar si hay cookie de autenticación
    const jwt = request.cookies.get('strapi_jwt');
    
    if (!jwt) {
      // Si no hay JWT, redirigir al login con la URL de redirección
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/orders/:path*',
    '/profile/:path*',
    '/address/:path*',
    '/payment-methods/:path*',
    '/support-tickets/:path*',
    '/wish-list/:path*'
  ]
};
