"use client";

import React, { useState } from 'react'
import { UseFormReturn } from 'react-hook-form';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import { useCartStore, useCartSubtotal, useCartTotals } from '../../../../contexts/CartContext';

type MercadoPagoButtonProps = { 
    methods: UseFormReturn<any>;
    formValues: {
        regionName: string;
        countyName: string;
        streetName: string;
        streetNumber: string;
        houseApartment: string;
        firstName: string;
        lastName: string;
        phone: string;
        email: string;
        rut: string;
    }
}

export const MercadoPagoButton = ({ methods, formValues }: MercadoPagoButtonProps) => {
    const { cart, shippingPrice, discount, discountCode } = useCartStore();
    const subtotal = useCartSubtotal();
    const total = useCartTotals();
    
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string>("");
    const [validationErrors, setValidationErrors] = useState<string[]>([]);

    // Validar formulario completo
    const validateForm = async (): Promise<{ isValid: boolean; errors: string[] }> => {
        const errors: string[] = [];

        // 1. Validar campos del cliente con React Hook Form
        const isFormValid = await methods.trigger();
        if (!isFormValid) {
            const formErrors = methods.formState.errors;
            if (formErrors.name) errors.push("Nombre es requerido");
            if (formErrors.lastname) errors.push("Apellido es requerido");
            if (formErrors.email) errors.push("Email válido es requerido");
            if (formErrors.phone) errors.push("Teléfono chileno válido es requerido");
            if (formErrors.rut) errors.push("RUT válido es requerido");
        }

        // 2. Validar dirección seleccionada
        const hasAddress = formValues.regionName && 
                          formValues.countyName && 
                          formValues.streetName && 
                          formValues.streetNumber;
        
        if (!hasAddress) {
            errors.push("Debes seleccionar o ingresar una dirección de envío completa");
        }

        // 3. Validar carrito no vacío
        if (cart.length === 0) {
            errors.push("El carrito está vacío");
        }

        // 4. Validar que el precio de envío se haya calculado
        // Si hay dirección y hay productos en el carrito, el precio de envío debe estar calculado
        if (hasAddress && cart.length > 0 && shippingPrice === 0) {
            errors.push("Por favor espera mientras calculamos el precio de envío");
        }

        // 5. Verificar si el cupón sigue siendo aplicable (si hay descuento)
        if (discount > 0) {
            const discountValid = await validateDiscount();
            if (!discountValid) {
                errors.push("El cupón de descuento ya no es válido. Por favor, remuévelo y vuelve a intentar");
            }
        }

        return {
            isValid: errors.length === 0,
            errors
        };
    };

    // Validar cupón de descuento
    const validateDiscount = async (): Promise<boolean> => {
        // Si no hay descuento aplicado, es válido
        if (discount === 0 || !discountCode) return true;

        try {
            const email = formValues.email;
            
            // Validar el cupón con el código guardado
            const params = new URLSearchParams({
                code: discountCode,
                total: subtotal.toString(),
                ...(email && { email })
            });
            
            const response = await fetch(`/api/discounts/validate?${params}`);
            const data = await response.json();
            
            return data.valid;
        } catch (error) {
            console.error("Error validando cupón:", error);
            return false;
        }
    };

    // Crear items para MercadoPago
    const itemsForMP = cart.map((item: any) => ({
        id: item.variant.documentId,
        title: item.product.name,
        quantity: item.qty,
        unit_price: item.product.price,
    }));

    // Agregar envío si existe
    if (shippingPrice > 0) {
        itemsForMP.push({
            id: "shipping",
            title: "Envío",
            quantity: 1,
            unit_price: shippingPrice,
        });
    }

    const handleMercadoPagoPayment = async () => {
        setError("");
        setValidationErrors([]);
        
        // Validar todo antes de proceder
        const validation = await validateForm();
        
        if (!validation.isValid) {
            setValidationErrors(validation.errors);
            // Scroll to top para mostrar errores
            window.scrollTo({ top: 0, behavior: 'smooth' });
            return;
        }
        
        // Si todo está válido, crear preferencia
        await crearPreferencia();
    };

    const crearPreferencia = async () => {
        setIsLoading(true);
        setError("");
        
        try {
            const res = await fetch("/api/mercado-pago", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    payer: { email: formValues.email },
                    items: itemsForMP,
                    metadata: {
                        region_name: formValues.regionName,
                        county_name: formValues.countyName,
                        street_name: formValues.streetName,
                        street_number: formValues.streetNumber,
                        house_apartment: formValues.houseApartment,
                        first_name: formValues.firstName,
                        last_name: formValues.lastName,
                        phone: formValues.phone,
                        email: formValues.email,
                        rut: formValues.rut,
                        shipping_price: shippingPrice.toString(),
                        discount: discount.toString(),
                        discount_code: discountCode, // código del cupón
                        subtotal: subtotal.toString(),
                        total: total.toString(),
                    }
                })
            });

            const data = await res.json();
            if (data.init_point) {
                // Redirigir directamente a Mercado Pago
                window.location.href = data.init_point;
            } else {
                setError(data.error || "Error al crear preferencia de pago");
                console.error("Error al crear preferencia", data.error);
                setIsLoading(false);
            }
        } catch (error) {
            setError("Error al conectar con Mercado Pago");
            console.error("Error al crear preferencia:", error);
            setIsLoading(false);
        }
    };

    return (
        <div className="mt-4">
            {validationErrors.length > 0 && (
                <Alert severity="error" sx={{ mb: 2 }}>
                    <strong>Por favor corrige los siguientes errores:</strong>
                    <ul style={{ marginTop: 8, marginBottom: 0 }}>
                        {validationErrors.map((err, idx) => (
                            <li key={idx}>{err}</li>
                        ))}
                    </ul>
                </Alert>
            )}

            {error && (
                <Alert severity="error" sx={{ mb: 2 }}>
                    {error}
                </Alert>
            )}

            <Button
                fullWidth
                variant="contained"
                color="primary"
                size="large"
                onClick={handleMercadoPagoPayment}
                disabled={isLoading}
                sx={{ p: 1.5 }}
            >
                {isLoading ? (
                    <>
                        <CircularProgress size={20} color="inherit" sx={{ mr: 1 }} />
                        Procesando...
                    </>
                ) : (
                    "Pagar con Mercado Pago"
                )}
            </Button>
        </div>
    );
}
