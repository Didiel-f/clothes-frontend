import { formatDistanceStrict } from "date-fns/formatDistanceStrict";
import { IProduct } from "models/Product.model";

/**
 * GET THE DIFFERENCE DATE FORMAT
 * @param  DATE | NUMBER | STRING
 * @returns FORMATTED DATE STRING
 */

export function getDateDifference(date: string | number | Date) {
  const distance = formatDistanceStrict(new Date(), new Date(date));
  return distance + " ago";
}

/**
 * RENDER THE PRODUCT PAGINATION INFO
 * @param page - CURRENT PAGE NUMBER
 * @param perPageProduct - PER PAGE PRODUCT LIST
 * @param totalProduct - TOTAL PRODUCT NUMBER
 * @returns
 */

export function renderProductCount(page: number, perPageProduct: number, totalProduct: number) {
  let startNumber = (page - 1) * perPageProduct;
  let endNumber = page * perPageProduct;

  if (endNumber > totalProduct) {
    endNumber = totalProduct;
  }

  return `Showing ${startNumber + 1}-${endNumber} of ${totalProduct} products`;
}

/**
 * CALCULATE PRICE WITH PRODUCT DISCOUNT THEN RETURN NEW PRODUCT PRICES
 * @param  price - PRODUCT PRICE
 * @param  discount - DISCOUNT PERCENT
 * @returns - RETURN NEW PRICE
 */

export function calculateDiscount(price: number, discount: number) {
  const afterDiscount = Number((price - price * (discount / 100)).toFixed(2));
  return currency(afterDiscount);
}

/**
 * CHANGE THE CURRENCY FORMAT
 * @param  price - PRODUCT PRICE
 * @param  fraction - HOW MANY FRACTION WANT TO SHOW
 * @returns - RETURN PRICE WITH CURRENCY
 */

export function currency(price: number, fraction: number = 0) {
  return Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "CLP",
    maximumFractionDigits: fraction
  }).format(price);
}

// Valida y convierte a entero no negativo
const toNonNegativeInt = (v: unknown): number | undefined => {
  const n = Number(v);
  return Number.isInteger(n) && n >= 0 ? n : undefined;
};

/**
 * Devuelve el mayor descuento válido entre product.discount
 * y product.category.discount. Si ninguno existe, retorna 0.
 * Limita el valor entre 0 y 100.
 */
export function getEffectiveDiscount(p: IProduct): number {
  const pd = toNonNegativeInt(p.discount);
  const cd = toNonNegativeInt(p.category?.discount);
  const d = Math.max(pd ?? -1, cd ?? -1);
  return d >= 0 ? Math.min(d, 100) : 0;
}