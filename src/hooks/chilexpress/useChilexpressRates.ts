// /lib/useChilexpressRates.ts
import type { IProduct, IVariant, IProductKind, IDimension } from "models/Product.model";

export type CartItem = { product: IProduct; variant: IVariant; qty: number };

type ChilexpressRateParams = {
  originCountyCode: string;       // código comuna origen Chilexpress
  destinationCountyCode: string;  // código comuna destino Chilexpress
  cart: CartItem[];
  declaredWorth?: number;         // CLP (opcional)
  paddingCm?: number;             // margen por embalaje, default 2cm
};

type PackageInput = {
  length: number; // cm
  width: number;  // cm
  height: number; // cm
  weight: number; // kg (peso físico total)
};

type ChilexpressRateResponse = any;

// cache simple por request
const pkCache = new Map<string, IProductKind>();

async function fetchProductKind(documentId: string): Promise<IProductKind> {
  if (pkCache.has(documentId)) return pkCache.get(documentId)!;

  const res = await fetch(`/api/product-kind?documentId=${encodeURIComponent(documentId)}`, { cache: "no-store" });
  if (!res.ok) throw new Error(`No se pudo obtener productKind ${documentId}`);

  const { data } = await res.json();
  if (!data) throw new Error(`Respuesta inválida productKind ${documentId}`);

  const pk: IProductKind = {
    documentId: data.documentId ?? documentId,
    name: data.name,
    weight: Number(data.weight),
    dimension: {
      id: data.dimension?.id,
      length: Number(data.dimension?.length),
      width: Number(data.dimension?.width),
      height: Number(data.dimension?.height),
    },
    note: data.note ?? null,
  };

  pkCache.set(documentId, pk);
  return pk;
}

function normBox(d: IDimension) {
  // ordena dimensiones desc para mayor estabilidad de heurísticas
  const arr = [d.length, d.width, d.height].map(Number).sort((a, b) => b - a);
  return { L: arr[0], W: arr[1], H: arr[2] };
}

function volume(L: number, W: number, H: number) {
  return L * W * H; // cm³
}

/**
 * Heurística de empaquetado a UNA caja:
 * - Estrategia A (apilar alto): L = max(Li), W = max(Wi), H = sum(Hi)
 * - Estrategia B (en fila):     L = sum(Li), W = max(Wi), H = max(Hi)
 * Elige la de MENOR VOLUMEN. Aplica padding de seguridad.
 */
function packItemsToSingleBox(inputs: Array<{ dim: IDimension; qty: number }>, paddingCm = 2): Omit<PackageInput, "weight"> & { debug?: any } {
  // expandir unidades
  const units: Array<{ L: number; W: number; H: number }> = [];
  for (const it of inputs) {
    const n = Math.max(1, Number(it.qty || 1));
    for (let i = 0; i < n; i++) {
      const { L, W, H } = normBox(it.dim);
      units.push({ L, W, H });
    }
  }
  if (units.length === 0) return { length: 1, width: 1, height: 1 };

  // A: apilo alto
  const L_A = Math.max(...units.map(u => u.L));
  const W_A = Math.max(...units.map(u => u.W));
  const H_A = units.reduce((s, u) => s + u.H, 0);
  const V_A = volume(L_A, W_A, H_A);

  // B: en fila
  const L_B = units.reduce((s, u) => s + u.L, 0);
  const W_B = Math.max(...units.map(u => u.W));
  const H_B = Math.max(...units.map(u => u.H));
  const V_B = volume(L_B, W_B, H_B);

  let L = L_A, W = W_A, H = H_A, chosen = "A";
  if (V_B < V_A) { L = L_B; W = W_B; H = H_B; chosen = "B"; }

  // padding por paredes/embalaje
  L += paddingCm;
  W += paddingCm;
  H += paddingCm;

  // redondeo sensato
  const length = Math.ceil(L);
  const width  = Math.ceil(W);
  const height = Math.ceil(H);

  return { length, width, height, debug: { chosen, V_A, V_B, L_A, W_A, H_A, L_B, W_B, H_B } };
}

/** Peso volumétrico (kg) = (L*W*H)/factor. Factor configurable por env. */
function computeChargeableWeight(pkg: PackageInput) {
  const factor = Number(process.env.NEXT_PUBLIC_CHILEXPRESS_VOL_FACTOR || process.env.CHILEXPRESS_VOL_FACTOR || 4000);
  const volumetricKg = (pkg.length * pkg.width * pkg.height) / factor;
  const physicalKg = pkg.weight;
  return {
    volumetricKg,
    physicalKg,
    chargeableKg: Math.max(volumetricKg, physicalKg),
  };
}

/**
 * Prepara 1 paquete y consulta tarifa a tu API route (proxy a Chilexpress).
 */
export async function getChilexpressRate(params: ChilexpressRateParams): Promise<{
  requestPackage: { length: number; width: number; height: number; weight: number };
  chargeableKg: number;
  detail: { physicalKg: number; volumetricKg: number; heuristic?: any };
  raw: ChilexpressRateResponse;
}> {
  const { originCountyCode, destinationCountyCode, cart, declaredWorth = 0, paddingCm = 2 } = params;

  if (!cart || !cart.length) throw new Error("Carrito vacío");

  // 1) Recolectar dimensiones/peso por unidad
  const inputs: Array<{ dim: IDimension; qty: number; weight: number }> = [];
  let physicalKgTotal = 0;

  for (const item of cart) {
    const pkDocId = (item.product?.productKind as any)?.documentId
      || (item.product?.productKind && "documentId" in item.product.productKind ? (item.product.productKind as any).documentId : undefined);

    if (!pkDocId) {
      throw new Error(`El producto ${item.product?.name ?? "(sin nombre)"} no tiene productKind.documentId`);
    }

    const pk = await fetchProductKind(pkDocId);

    const qty = Number(item.qty || 1);
    inputs.push({ dim: pk.dimension, qty, weight: pk.weight });
    physicalKgTotal += pk.weight * qty;
  }

  // 2) Empaquetar en una caja
  const box = packItemsToSingleBox(inputs.map(i => ({ dim: i.dim, qty: i.qty })), paddingCm);

  // 3) Calcular peso “cobrable”
  const pkg: PackageInput = { ...box, weight: Number(physicalKgTotal.toFixed(3)) };
  const weights = computeChargeableWeight(pkg);
  const chargeableKgRounded = Number(weights.chargeableKg.toFixed(3));

  const res = await fetch("/api/chilexpress/rates", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    cache: "no-store",
    body: JSON.stringify({
      originCountyCode,
      destinationCountyCode,
      package: {
        length: pkg.length,
        width: pkg.width,
        height: pkg.height,
        weight: chargeableKgRounded,
      },
      declaredWorth,
    }),
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Chilexpress Rate error: ${errText}`);
  }

  const raw = await res.json();
  return {
    requestPackage: { length: pkg.length, width: pkg.width, height: pkg.height, weight: chargeableKgRounded },
    chargeableKg: chargeableKgRounded,
    detail: { physicalKg: weights.physicalKg, volumetricKg: weights.volumetricKg, heuristic: box.debug },
    raw,
  };
}
