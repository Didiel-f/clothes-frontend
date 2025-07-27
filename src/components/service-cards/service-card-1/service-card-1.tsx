import Typography from "@mui/material/Typography";
import IconComponent from "components/IconComponent";
import { FlexBox, FlexRowCenter } from "components/flex-box";

// ==============================================================
interface Props {
  icon: string;
  title: string;
  description: string;
}
// ==============================================================

export default function ServiceCard1({ icon, title, description }: Props) {
  return (
    <FlexBox gap={2}>
      <FlexRowCenter width={50} height={50} bgcolor="grey.100" borderRadius={3}>
        {icon ? <IconComponent icon={icon} fontSize="small" /> : null}
      </FlexRowCenter>

      <div>
        <Typography variant="h4">{title}</Typography>
        <Typography variant="body1" color="grey.600">
          {description}
        </Typography>
      </div>
    </FlexBox>
  );
}
