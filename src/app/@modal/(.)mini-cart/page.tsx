"use client";

import { usePathname, useRouter } from "next/navigation";
// MUI
import Drawer from "@mui/material/Drawer";
// GLOBAL CUSTOM COMPONENTS
import { MiniCart } from "pages-sections/mini-cart";

export default function MiniCartDrawer() {
  const router = useRouter();
  const pathname = usePathname();

  if (pathname !== "/mini-cart") return null;

  return (
    <Drawer
      open
      anchor="right"
      onClose={router.back}
      sx={{ zIndex: 9999 }}
      slotProps={{
        paper: {
          sx: {
            borderTopLeftRadius: 12,
            borderBottomLeftRadius: 12
          }
        }
      }}>
      <MiniCart />
    </Drawer>
  );
}
