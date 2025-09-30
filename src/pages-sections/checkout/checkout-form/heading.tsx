import Avatar from "@mui/material/Avatar";
import { BoxProps } from "@mui/material/Box";
import Typography from "@mui/material/Typography";
// GLOBAL CUSTOM COMPONENTS
import FlexBox from "components/flex-box/flex-box";

// ==============================================================
interface Props extends BoxProps {
  title: string;
  number: number;
}
// ==============================================================

export default function Heading({ number, title, ...props }: Props) {
  // AVATAR STYLES
  const STYLES = {
    width: 32,
    height: 32,
    color: "white",
    backgroundColor: "primary.main"
  };

  return (
    <FlexBox gap={1.5} alignItems="center" mb={3.5} {...props}>
      <Avatar alt={title} sx={STYLES}>
        {number}
      </Avatar>

      <Typography variant="h4">{title}</Typography>
    </FlexBox>
  );
}
