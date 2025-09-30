import React, { useEffect, useState } from 'react'
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react';
import { useCartStore, useCartSubtotal, useCartTotals } from '../../../../contexts/CartContext';
import Button from '@mui/material/Button';
import { MERCADO_PAGO_CONFIG, validateMercadoPagoConfig } from '../../../../config/mercado-pago';

type MercadoPagoButtonProps = { 
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

export const MercadoPagoButton = ({ formValues }: MercadoPagoButtonProps) => {
    const { cart, shippingPrice } = useCartStore();
    const subtotal = useCartSubtotal();
    const total = useCartTotals();

    useEffect(() => {
        // Validar configuración antes de inicializar
        if (validateMercadoPagoConfig()) {
            initMercadoPago(MERCADO_PAGO_CONFIG.PUBLIC_KEY, {
                locale: MERCADO_PAGO_CONFIG.LOCALE,
            });
        } else {
            console.error('Configuración de MercadoPago incompleta');
        }
    }, []);

    // Verificar si el formulario está completo
    const isFormComplete = () => {
        return (
            formValues.regionName &&
            formValues.countyName &&
            formValues.streetName &&
            formValues.streetNumber &&
            formValues.houseApartment &&
            formValues.firstName &&
            formValues.lastName &&
            formValues.phone &&
            formValues.email &&
            formValues.rut
        );
    };

    // Crear items para MercadoPago basado en tu estructura de carrito
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

    const [preferenceId, setPreferenceId] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const crearPreferencia = async () => {
        if (!isFormComplete()) return;
        
        setIsLoading(true);
        try {
            const res = await fetch("/api/mercado-pago", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    payer: { email: formValues.email },
                    items: itemsForMP,
                    metadata: {
                        regionName: formValues.regionName,
                        countyName: formValues.countyName,
                        streetName: formValues.streetName,
                        streetNumber: formValues.streetNumber,
                        houseApartment: formValues.houseApartment,
                        firstName: formValues.firstName,
                        lastName: formValues.lastName,
                        phone: formValues.phone,
                        email: formValues.email,
                        rut: formValues.rut,
                        shippingPrice: shippingPrice.toString(),
                        subtotal: subtotal.toString(),
                        total: total.toString(),
                    }
                })
            });

            const data = await res.json();
            if (data.id) {
                setPreferenceId(data.id);
            } else {
                console.error("Error al crear preferencia", data.error);
            }
        } catch (error) {
            console.error("Error al crear preferencia:", error);
        } finally {
            setIsLoading(false);
        }
    };

    // Crear preferencia cuando el formulario esté completo y no haya preferencia
    useEffect(() => {
        if (isFormComplete() && !preferenceId && !isLoading) {
            crearPreferencia();
        }
    }, [formValues, cart, shippingPrice]);

    // Si el formulario no está completo, mostrar botón deshabilitado
    if (!isFormComplete()) {
        return (
            <Button className='w-full' variant="outlined" disabled={true}>
                Complete el formulario para habilitar el pago
            </Button>
        );
    }

    // Si está cargando, mostrar botón de carga
    if (isLoading) {
        return (
            <Button className='w-full' variant="outlined" disabled={true}>
                Configurando pago...
            </Button>
        );
    }

    // Si hay preferencia, mostrar el wallet de MercadoPago
    if (preferenceId) {
        return (
            <div className="mt-4">
                <Wallet
                    initialization={{ preferenceId }}
                />
            </div>
        );
    }

    // Fallback: botón para crear preferencia
    return (
        <Button 
            className='w-full' 
            onClick={crearPreferencia}
            disabled={isLoading}
        >
            {isLoading ? 'Configurando...' : 'Configurar Pago'}
        </Button>
    );
}
