"use client";

import { usePathname, useRouter } from "next/navigation";
// GLOBAL CUSTOM COMPONENT
import OverlayScrollbar from "components/overlay-scrollbar";
// LOCAL CUSTOM COMPONENT
import ButtonContent from "./components/button-content";
import SidebarAccordion from "./components/sidebar-accordion";
// STYLED COMPONENTS
import { NavItemButton } from "./styles";
// CUSTOM DATA MODEL
import { Category } from "models/Common";

// ==============================================================
type Props = { navigation: Category[] };
// ==============================================================

export default function SideNavbarTwo({ navigation }: Props) {
  const router = useRouter();
  const pathname = usePathname();

  const renderLevels = (data: Category[]) => {
    return data.map((item: Category) => {
      if (item.children) {
        return (
          <SidebarAccordion key={item.name} item={item}>
            {renderLevels(item.children)}
          </SidebarAccordion>
        );
      }

      return (
        <NavItemButton
          disableRipple
          disableTouchRipple
          key={item.name}
          active={pathname === item.path}
          onClick={() => router.push(item.path)}>
          <ButtonContent name={item.name} icon={item.icon} />
        </NavItemButton>
      );
    });
  };

  return (
    <OverlayScrollbar sx={{ overflowX: "hidden", height: "calc(100dvh - (120px + 87px))" }}>
      {renderLevels(navigation)}
    </OverlayScrollbar>
  );
}
