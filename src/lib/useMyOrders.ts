import useSWR from "swr";
const fetcher = (u: string) => fetch(u, {
  credentials: 'include', // Incluir cookies
  headers: {
    'Content-Type': 'application/json',
  }
}).then(r => r.json());

export function useMyOrders(page = 1, pageSize = 10) {
  const { data, isLoading } = useSWR(`/api/my/orders?page=${page}&pageSize=${pageSize}`, fetcher);
  return {
    orders: data?.results ?? data?.data ?? [],
    pagination: data?.pagination ?? data?.meta?.pagination,
    isLoading,
  };
}
