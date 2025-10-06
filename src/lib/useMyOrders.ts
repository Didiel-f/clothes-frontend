import useSWR from "swr";
import { createFullUrl } from "utils/createFullUrl";

const fetcher = (u: string) => {
  const fullUrl = createFullUrl(u);
  return fetch(fullUrl, {
    credentials: 'include', // Incluir cookies
    headers: {
      'Content-Type': 'application/json',
    }
  }).then(r => r.json());
};

export function useMyOrders(page = 1, pageSize = 10) {
  const { data, isLoading } = useSWR(`/api/my/orders?page=${page}&pageSize=${pageSize}`, fetcher);
  return {
    orders: data?.results ?? data?.data ?? [],
    pagination: data?.pagination ?? data?.meta?.pagination,
    isLoading,
  };
}

// Hook para obtener una orden específica por ID
export function useMyOrder(orderId: string) {
  const { data, isLoading, error } = useSWR(
    orderId ? `/api/my/orders/${orderId}` : null, 
    fetcher
  );
  
  return {
    order: data,
    isLoading,
    error,
  };
}
