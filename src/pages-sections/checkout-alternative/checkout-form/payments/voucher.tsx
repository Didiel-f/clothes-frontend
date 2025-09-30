import { useState } from "react";
// MUI
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Collapse from "@mui/material/Collapse";
import ButtonBase from "@mui/material/ButtonBase";
import Alert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";
// GLOBAL CUSTOM COMPONENTS
import { TextField } from "components/form-hook";
import FlexBox from "components/flex-box/flex-box";
// CONTEXT
import { useCartStore, useCartSubtotal } from "contexts/CartContext";

interface DiscountResponse {
  valid: boolean;
  type?: "percentage" | "fixed";
  value?: number;
  discountAmount?: number;
  finalPrice?: number;
  reason?: string;
  minAmount?: number;
  constraints?: {
    onePerCustomer: boolean;
    firstPurchaseOnly: boolean;
    minAmount: number | null;
    maxUsage: number | null;
  };
  remainingUses?: number | null;
}

interface VoucherProps {
  customerEmail?: string;
}

export default function Voucher({ customerEmail = "" }: VoucherProps) {
  const [hasVoucher, setHasVoucher] = useState(false);
  const [voucherCode, setVoucherCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [discountInfo, setDiscountInfo] = useState<DiscountResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  // Context del carrito
  const { discount, addDiscount, removeDiscount } = useCartStore();
  const cartSubtotal = useCartSubtotal();

  const validateDiscount = async (code: string, total: number, email?: string) => {
    try {
      const params = new URLSearchParams({
        code,
        total: total.toString(),
        ...(email && { email })
      });
      
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/discounts/validate?${params}`
      );
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error validating discount:", error);
      throw new Error("Error al validar el cupón");
    }
  };

  const handleApplyVoucher = async () => {
    if (!voucherCode.trim()) {
      setError("Por favor ingresa un código de cupón");
      return;
    }

    if (cartSubtotal <= 0) {
      setError("El carrito está vacío");
      return;
    }

    setIsLoading(true);
    setError(null);
    setDiscountInfo(null);

    try {
      const result = await validateDiscount(
        voucherCode.trim().toUpperCase(), 
        cartSubtotal, 
        customerEmail?.trim() || undefined
      );
      
      if (result.valid) {
        setDiscountInfo(result);
        setError(null);
        // Aplicar el descuento al carrito
        addDiscount(result.discountAmount || 0);
      } else {
        let errorMessage = "Cupón no válido";
        switch (result.reason) {
          case "not_found":
            errorMessage = "Cupón no encontrado";
          case "inactive":
            errorMessage = "Cupón inactivo";
          case "expired":
            errorMessage = "Cupón expirado";
          case "max_usage_reached":
            errorMessage = "Cupón agotado";
          case "below_min_amount":
            errorMessage = `Monto mínimo requerido: $${result.minAmount?.toLocaleString()}`;
          case "invalid_params":
            errorMessage = "Parámetros inválidos";
          case "customer_email_required":
            errorMessage = "Este cupón requiere un email de cliente";
          case "already_used_by_customer":
            errorMessage = "Ya has usado este cupón anteriormente";
          case "not_first_purchase":
            errorMessage = "Este cupón es solo para primera compra";
        }
        setError(errorMessage);
        setDiscountInfo(null);
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : "Error al validar el cupón");
      setDiscountInfo(null);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemoveVoucher = () => {
    setVoucherCode("");
    setDiscountInfo(null);
    setError(null);
    removeDiscount();
  };

  const getDiscountText = (discount: DiscountResponse) => {
    if (discount.type === "percentage") {
      return `${discount.value}% de descuento`;
    } else {
      return `$${discount.value?.toLocaleString()} de descuento`;
    }
  };

  return (
    <Box mb={3}>
      <ButtonBase
        disableRipple
        onClick={() => setHasVoucher((state) => !state)}
        sx={{ color: "primary.main", fontWeight: 500 }}>
        Tengo un cupón
      </ButtonBase>

      <Collapse in={hasVoucher}>
        <Box mt={2} maxWidth={400}>
          {!discountInfo ? (
            <FlexBox gap={2} mb={2}>
              <TextField 
                fullWidth 
                name="voucher" 
                placeholder="Ingresa tu código de cupón"
                value={voucherCode}
                onChange={(e) => setVoucherCode(e.target.value)}
                disabled={isLoading}
              />
              <Button 
                variant="contained" 
                color="primary" 
                type="button"
                onClick={handleApplyVoucher}
                disabled={isLoading || !voucherCode.trim()}
              >
                {isLoading ? <CircularProgress size={20} /> : "Aplicar"}
              </Button>
            </FlexBox>
          ) : (
            <FlexBox gap={2} mb={2} alignItems="center">
              <Box flex={1}>
                <Box fontWeight="bold" color="success.main">
                  Cupón: {voucherCode}
                </Box>
                <Box fontSize="0.9em" color="text.secondary">
                  {getDiscountText(discountInfo)}
                </Box>
              </Box>
              <Button 
                variant="outlined" 
                color="error" 
                size="small"
                onClick={handleRemoveVoucher}
              >
                Remover
              </Button>
            </FlexBox>
          )}

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          {discountInfo && (
            <Alert severity="success" sx={{ mb: 2 }}>
              <Box>
                <Box fontWeight="bold" mb={1}>
                  ¡Cupón aplicado exitosamente!
                </Box>
                <Box fontSize="0.9em" color="text.secondary">
                  Descuento: ${discountInfo.discountAmount?.toLocaleString()}
                </Box>
                <Box fontSize="0.9em" color="text.secondary">
                  Subtotal: ${cartSubtotal.toLocaleString()}
                </Box>
                <Box fontSize="0.9em" color="text.secondary">
                  Total final: ${discountInfo.finalPrice?.toLocaleString()}
                </Box>
                
                {discountInfo.constraints && (
                  <Box mt={1} fontSize="0.8em" color="text.secondary">
                    {discountInfo.constraints.onePerCustomer && (
                      <Box>• Un uso por cliente</Box>
                    )}
                    {discountInfo.constraints.firstPurchaseOnly && (
                      <Box>• Solo primera compra</Box>
                    )}
                    {discountInfo.constraints.minAmount && (
                      <Box>• Monto mínimo: ${discountInfo.constraints.minAmount.toLocaleString()}</Box>
                    )}
                    {discountInfo.remainingUses !== null && (
                      <Box>• Usos restantes: {discountInfo.remainingUses}</Box>
                    )}
                  </Box>
                )}
              </Box>
            </Alert>
          )}
        </Box>
      </Collapse>
    </Box>
  );
}
