import { useEffect, useState, ReactNode } from "react";
import Drawer from "@mui/material/Drawer";
// GLOBAL CUSTOM COMPONENT
import OverlayScrollbar from "components/overlay-scrollbar";

// ================================================================
interface Props {
  open?: boolean;
  width?: number;
  children: ReactNode;
  toggle?: () => void;
  position?: "left" | "right";
  handler: (event: () => void) => ReactNode;
}
// ================================================================

export default function SideNav(props: Props) {
  const { position = "left", open = false, width = 280, children, handler, toggle } = props;

  const [sideNavOpen, setSideNavOpen] = useState(open);
  const handleToggleSideNav = () => setSideNavOpen(!sideNavOpen);

  useEffect(() => setSideNavOpen(open), [open]);

  const handleClose = toggle || handleToggleSideNav;

  return (
    <div>
      <Drawer
        anchor={position}
        open={sideNavOpen}
        onClose={handleClose}
        slotProps={{
          transition: {
            style: {
              width
            }
          }
        }}
        sx={{ zIndex: 15001 }}>
        <OverlayScrollbar>{children}</OverlayScrollbar>
      </Drawer>

      {handler(handleClose)}
    </div>
  );
}
