// utils/ns.ts
export const makeKey = (userId?: string | null) => (k: string) =>
    userId ? `user:${userId}:${k}` : `guest:${k}`;
  