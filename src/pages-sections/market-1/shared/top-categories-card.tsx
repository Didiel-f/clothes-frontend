"use client";

import Card from "@mui/material/Card";
import Chip from "@mui/material/Chip";
import { styled } from "@mui/material/styles";
// GLOBAL CUSTOM COMPONENTS
import HoverBox from "components/HoverBox";
import LazyImage from "components/LazyImage";

// STYLED COMPONENT
const StyledChip = styled(Chip)({
  zIndex: 2,
  top: "0.875rem",
  borderRadius: 8,
  fontSize: "10px",
  padding: "0 8px",
  fontWeight: "600",
  position: "absolute"
});

// ========================================================
interface Props {
  title: string;
  imgUrl: string;
  subtitle: string;
}
// ========================================================

export default function TopCategoriesCard({ title, subtitle, imgUrl }: Props) {
  return (
    <Card elevation={0} sx={{ position: "relative" }}>
      <StyledChip
        size="small"
        label={title}
        color="secondary"
        sx={{ backgroundColor: "secondary.main", left: 12, color: "white" }}
      />

      <StyledChip
        size="small"
        color="default"
        label={subtitle}
        sx={{ right: 12, backgroundColor: "grey.100" }}
      />

      <HoverBox borderRadius={3}>
        <LazyImage priority src={imgUrl} width={1035} height={348} alt={title} />
      </HoverBox>
    </Card>
  );
}
