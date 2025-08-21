// Configuración de MercadoPago
export const MERCADO_PAGO_CONFIG = {
  // Clave pública de MercadoPago (frontend)
  PUBLIC_KEY: process.env.NEXT_PUBLIC_MP_PUBLIC_KEY || '',
  
  // Token de acceso de MercadoPago (backend)
  ACCESS_TOKEN: process.env.MP_ACCESS_TOKEN || '',
  
  // URL base de la aplicación
  BASE_URL: process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000',
  
  // Configuración regional
  LOCALE: 'es-CL' as const,
  
  // URLs de retorno
  SUCCESS_URL: '/order-confirmation',
  FAILURE_URL: '/checkout-alternative',
  PENDING_URL: '/checkout-alternative',
  
  // URL del webhook
  WEBHOOK_URL: '/api/mercado-pago/webhook',
};

// Validar configuración
export const validateMercadoPagoConfig = () => {
  if (!MERCADO_PAGO_CONFIG.PUBLIC_KEY) {
    console.error('NEXT_PUBLIC_MP_PUBLIC_KEY no está configurada');
    return false;
  }
  
  if (!MERCADO_PAGO_CONFIG.ACCESS_TOKEN) {
    console.error('MP_ACCESS_TOKEN no está configurada');
    return false;
  }
  
  return true;
};
