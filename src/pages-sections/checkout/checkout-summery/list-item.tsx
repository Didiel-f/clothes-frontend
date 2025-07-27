import Typography from "@mui/material/Typography";
// GLOBAL CUSTOM COMPONENTS
import FlexBetween from "components/flex-box/flex-between";
// CUSTOM UTILS LIBRARY FUNCTION
import { currency } from "lib";

// ==============================================================
interface Props {
  title: string;
  value?: number;
  mb?: number;
  color?: string;
}
// ==============================================================

export default function ListItem({ title, value, mb = 0.5, color = "grey.600" }: Props) {
  return (
    <FlexBetween mb={mb}>
      <Typography variant="body1" sx={{ color }}>
        {title}:
      </Typography>
      <Typography variant="h6">{value ? currency(value) : "-"}</Typography>
    </FlexBetween>
  );
}
