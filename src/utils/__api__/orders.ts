import { cache } from "react";
// CUSTOM DATA MODEL
import Order from "models/Order.model";
import { IdParams } from "models/Common";
import { createFullUrl } from "utils/createFullUrl";

const getOrders = cache(async (page = 0) => {
  const PAGE_SIZE = 5;
  const PAGE_NO = page - 1;

  const response = await fetch(createFullUrl(`/api/my/orders?page=${page}&pageSize=${PAGE_SIZE}`), {
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error('Failed to fetch orders');
  }

  const data = await response.json();
  const orders = data.data || data.results || [];

  const totalPages = Math.ceil(orders.length / PAGE_SIZE);
  const currentOrders = orders.slice(PAGE_NO * PAGE_SIZE, (PAGE_NO + 1) * PAGE_SIZE);

  return { orders: currentOrders, totalOrders: orders.length, totalPages };
});

const getIds = cache(async () => {
  const response = await fetch(createFullUrl('/api/my/orders'), {
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error('Failed to fetch order IDs');
  }

  const data = await response.json();
  const orders = data.data || data.results || [];
  
  return orders.map((order: any) => ({ id: order.documentId || order.id }));
});

const getOrder = cache(async (id: string) => {
  const response = await fetch(createFullUrl(`/api/my/orders/${id}`), {
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error('Failed to fetch order');
  }

  return await response.json();
});

export default { getOrders, getOrder, getIds };
