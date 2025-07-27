import Image from "next/image";
import Typography from "@mui/material/Typography";
// CUSTOM COMPONENTS
import FlexRowCenter from "components/flex-box/flex-row-center";
// IMPORT IMAGES
import logo from "../../../../public/assets/images/bazaar-black-sm.svg";

export default function LogoWithTitle() {
  return (
    <FlexRowCenter flexDirection="column" gap={1.5} mb={4}>
      <Image src={logo} alt="bazaar" />
      <Typography variant="h5">Welcome To Bazaar</Typography>
    </FlexRowCenter>
  );
}
