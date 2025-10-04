import Image from "next/image";
import Typography from "@mui/material/Typography";
// CUSTOM COMPONENTS
import FlexRowCenter from "components/flex-box/flex-row-center";
// IMPORT IMAGES
import logo from "../../../../public/assets/images/z-logo.png";

export default function LogoWithTitle() {
  return (
    <FlexRowCenter flexDirection="column" gap={1.5} mb={4}>
      <Image src={logo} alt="bazaar" width={80} height={80} />
      <Typography variant="h5">Bienvenido a Zag</Typography>
    </FlexRowCenter>
  );
}
