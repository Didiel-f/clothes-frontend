"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { Fragment, PropsWithChildren, useEffect, useRef, useState } from "react";
// MUI
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
// MUI ICON COMPONENT
import Clear from "@mui/icons-material/Clear";
import Search from "@mui/icons-material/Search";
// GLOBAL CUSTOM COMPONENTS
import FlexBetween from "components/flex-box/flex-between";

export default function HeaderSearch({ children }: PropsWithChildren) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentUrl = useRef(`${pathname}?${searchParams}`);
  const [open, setOpen] = useState(false);

  const handleClose = () => setOpen(false);

  useEffect(() => {
    const newUrl = `${pathname}?${searchParams}`;

    if (currentUrl.current !== newUrl) {
      handleClose();
      currentUrl.current = newUrl;
    }
  }, [pathname, searchParams]);

  return (
    <Fragment>
      <IconButton onClick={() => setOpen(true)}>
        <Search sx={{ color: "grey.600" }} />
      </IconButton>

      <Drawer open={open} anchor="top" onClose={handleClose} sx={{ zIndex: 9999 }}>
        <Box width="auto" padding={2} height="100vh">
          <FlexBetween mb={1}>
            <p>Search to Bazaar</p>

            <IconButton onClick={handleClose}>
              <Clear />
            </IconButton>
          </FlexBetween>

          {/* CATEGORY BASED SEARCH FORM */}
          {children}
        </Box>
      </Drawer>
    </Fragment>
  );
}
